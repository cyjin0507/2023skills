// 팝업
class Popup {
    constructor(url, width=700, heigth=700) {
        this.url = url
        this.width = width
        this.heigth =heigth
    }

    async open(data) {
        if(!this.thisWindow || this.thisWindow.closed) {
            this.thisWindow = window.open(this.url, "팝업", `width=${this.width}, heigth=${this.heigth}, top=150, left=200, location=no`)
            await this.waitForLoad(this.thisWindow)
            this.document = this.thisWindow.document

            this.init()
            this.addEvent()
        }
        this.thisWindow.resizeTo(this.width, this.heigth)
        this.document = this.thisWindow.document
        this.reset(data)
    }

    waitForLoad(ele) {
        return new Promise((res,rej)=> {
            ele.onload = () => {res()}
            ele.onerror = () => {rej()}

            setTimeout(()=> {
                res()
            }, 300)
        })
    }

}

// 유틸
function removeNotNumber(number) {
    try {
        return number.replace(/[^0-9]/g, '')
    } catch(error) {
        return ''
    }
}

function phoneFormat(number) {
    number = removeNotNumber(number)
    if(number.length > 7) {
        number = number.replace(/(\d{0,3})(\d{0,4})(\d{0,4})/, '$1-$2-$3')
    } else if(number.length > 3) {
        number = number.replace(/(\d{0,3})(\d{0,4})/, '$1-$2')
    } else {
        number = number.replace(/(\d{0,3})/, '$1')
    }

    number = number.substr(0,13)
    return number
}

function padStart(number, num=2, str='0') {
    return number.toString().padStart(num, str)
}

Date.prototype.myFormat = function() {
    return this.getFullYear().toString() + '.' + padStart(this.getMonth() + 1) + '.' + padStart(this.getDay())
}

// 슬라이드
class Slide {
    constructor(itemList, btnBox, animationTime, intervalTime) {
        this.isProcessing = false
        this.isStop = false
        this.isClear = false        
        this.animationTime = animationTime
        this.itemList = itemList
        this.intervalTime = intervalTime

        this.slideType = 0

        this.imgList = ['./resources/imgs/images/01/image_01\ \(18\).jpg', './resources/imgs/images/01/image_01\ \(4\).jpg', './resources/imgs/images/01/image_01\ \(22\).jpg']

        btnBox.innerHTML = ''
        this.index = 0

        for (let i = 0; i < itemList.length; i++) {
            const btn = document.createElement('img')
            btn.src = this.imgList[i]
            btn.addEventListener('click', () => {
                if(this.isClear) {return}
                this.isClear = true
                clearInterval(this.interval)

                this.clearAnimation(i)

                if (!this.isStop) {
                    this.interval = setInterval(this.nextSlide.bind(this), this.intervalTime * 1000)
                }
            })

            btnBox.appendChild(btn)
        }
        this.interval = setInterval(this.nextSlide.bind(this), this.intervalTime * 1000)

    }

    clearAnimation(ele) {

        for (let i = 0; i < this.itemList.length; i++) {
            this.animation(this.itemList[i], 0, 'left', '-100%')
        }

        this.slideType = 1
        this.animation(this.itemList[ele], 0, 'left', '0%')
        this.animation(this.itemList[ele], 0, 'opacity', '0')
        this.animation(this.itemList[ele], this.animationTime, 'opacity', '1', ()=> {
            this.isClear = false
        })
        this.isProcessing = false
        this.index = ele
    }

    nextSlide(
        currentSlideIndex = this.index,
        nextSlideIndex = this.index + 1 < this.itemList.length ? this.index + 1 : 0
    ) {
        if (this.isProcessing) { return }
        this.isProcessing = true

        this.current = currentSlideIndex

        this.time = new Date()

        const currentSlide = this.itemList[currentSlideIndex]
        this.animation(currentSlide, this.animationTime, 'left', '100%', () => {
            if (!this.isStop) {
                this.animation(currentSlide, 0, 'left', '-100%')
                this.isProcessing = false
            }
        })

        this.index = nextSlideIndex
        const nextSlide = this.itemList[nextSlideIndex]
        this.next = nextSlideIndex

        this.animation(nextSlide, this.animationTime, 'left', '0%')
    }

    animation(item, animationTime, style, type, callback) {
        $(item).animate({
            [style]: type
        }, animationTime * 1000)

        setTimeout(callback, animationTime * 1000)
    }

    stop() {
        this.isStop = true
        this.endTime = new Date()
        this.slideType = 0
        for (let i = 0; i < this.imgList.length; i++) {
            $(this.itemList[i]).stop(true)
        }

        clearInterval(this.interval)
    }

    start() {
        this.isStop = false
        this.interval = setInterval(this.nextSlide.bind(this), this.intervalTime * 1000)

        if (this.slideType == 0) {
            let leftTime = (1000 - (this.endTime - this.time)) / 1000
            this.time = new Date()

            for (let i = 0; i < this.itemList.length; i++) {
                $(this.itemList[i]).css('left', $(this.itemList[i]).css('left'))
            }

            this.animation(this.itemList[this.current], leftTime, 'left', '100%', () => {
                if(!this.isStop) {
                    this.animation(this.itemList[this.current], 0, 'left', '-100%')
                }
                this.isProcessing = false
            })

            this.animation(this.itemList[this.next], leftTime, 'left', '0%')
        }

        this.slideType = 1

    }

}

class SlideApp {
    constructor() {
        this.init()
    }

    init() {
        const itemList = document.querySelectorAll('.visual-img')
        const btnBox = document.querySelector('.btn-box')
        const startBtn = $('.start-btn')
        const stopBtn = $('.stop-btn')

        this.slideElement = new Slide(itemList, btnBox, 0.5, 2)

        startBtn.click(()=> {
            startBtn.css('display', 'none')
            stopBtn.css('display', 'block')
            this.slideElement.start()
        })

        stopBtn.click(()=> {
            stopBtn.css('display', 'none')
            startBtn.css('display', 'block')
            this.slideElement.stop()
        })

    }

}

window.addEventListener('load', ()=> {
    if(!window.location.href.includes('mypage') && !window.location.href.includes('reservation')) {
        new SlideApp()
    }
})

class ReservationTableControl {
    constructor(app, jsonData) {
        this.app = app
        this.jsonData = jsonData
        this.reset()

        setInterval(async ()=> {
            const jsonData = (await $.getJSON('./api/reservation.json')).reservition
            // await $.ajax({
            //     url : "./api/reservation.json",
            //     dataType : "json",
            //     cache : false,
            //     success : function(res) {
            //         jsonData = res.reservition
            //     }
            // })
            this.jsonData = jsonData
            this.reset()
        },4900)
    }

    reset() {
        this.setData()

        const today = new Date()
        document.querySelector('thead').innerHTML = `
            <tr>
                <td>자리/날짜</td>
                <td>오늘</td>
                <td>${this.setNextDate(today).myFormat()}</td>
                <td>${this.setNextDate(today).myFormat()}</td>
                <td>${this.setNextDate(today).myFormat()}</td>
                <td>${this.setNextDate(today).myFormat()}</td>
                <td>${this.setNextDate(today).myFormat()}</td>
                <td>${this.setNextDate(today).myFormat()}</td>
                <td>${this.setNextDate(today).myFormat()}</td>
                <td>${this.setNextDate(today).myFormat()}</td>
                <td>${this.setNextDate(today).myFormat()}</td>
                <td>${this.setNextDate(today).myFormat()}</td>
                <td>${this.setNextDate(today).myFormat()}</td>
                <td>${this.setNextDate(today).myFormat()}</td>
                <td>${this.setNextDate(today).myFormat()}</td>
            </tr>
        `

        this.tabel = document.querySelector('tbody')
        this.setList()
    }

    setData() {
        this.reservationData = {}

        for(let i=1; i<=7; i++) {
            this.reservationData[`A${padStart(i)}`] = {
                "spaceName" : `A${padStart(i)}`,
                "stateList" : []
            }
        }

        for(let i=1; i<=10; i++) {
            this.reservationData[`T${padStart(i)}`] = {
                "spaceName" : `T${padStart(i)}`,
                "stateList" : []
            }
        }

        this.jsonData.forEach((x,i)=> {
            const dayData = x[`D+${i}`]
            dayData.forEach(x=> {
                const {loc_num, status} = x
                this.reservationData[loc_num].stateList.push(status)
            })
        })

    }

    setList() {
        this.tabel.innerHTML = ''
        const keyList = Object.keys(this.reservationData)
        keyList.forEach(x=> {
            const tr = this.createTr(this.reservationData[x])
            this.tabel.appendChild(tr)
        })
    }

    createTr({spaceName, stateList}) {
        const tr = document.createElement('tr')
        tr.innerHTML = `<td>${spaceName}</td>`
        stateList.forEach((x,i)=> {
            tr.appendChild(this.createIcon(spaceName, i, x))
        })
        return tr
    }

    createIcon(spaceName, index, state) {
        const td = document.createElement('td')
        if(state == 'W') {
            td.innerHTML = `<td><span class="${state}"><i class="fa-solid fa-tents"></i></span></td>`
        } else if(state == 'C') {
            td.innerHTML = `<td><span class="${state}"><i class="fa-solid fa-person-shelter"></i></span></td>`
        } else {
            td.innerHTML = `<td><span class="${state}"><i class="fa-solid fa-kiwi-bird"></i></span></td>`
        }
        td.querySelector('span').addEventListener('click', ()=> {
            this.app.openPopup({spaceName, index, state})
        })
        return td
    }

    setNextDate(date) {
        date.setDate(date.getDate() + 1)
        return date
    }

}

class ReservationPopupControl {
    constructor() {
        this.popup = new ReservationPopup()
    }

    open(data) {
        const {state} = data
        if(state !== 'W') {
            alert('예약할 수 없습니다.')
            return
        }

        this.popup = new ReservationPopup(this)

        this.popup.open(data)

    }

}

class ReservationPopup extends Popup {
    constructor(app) {
        super('./reservationPopup.html')
        this.app = app
    }

    reset({spaceName, index, state}) {
        this.isCodeRequest = false
        this.spaceName = spaceName
        this.state = state

        this.date = new Date()
        this.date.setDate(this.date.getDate() + index)

        const day = this.date.getDay()
        if(day == 6|| day==0) {
            this.price = this.spaceName.includes('T') ?'20000' : '30000'
        } else {
            this.price = this.spaceName.includes('T') ?'15000' : '25000'
        }

        this.document.querySelector('#spaceName').innerHTML = "예약자리 : " + this.spaceName
        this.document.querySelector('#price').innerHTML = "요금 : " + parseInt(this.price).toLocaleString(undefined) + "원"
        this.document.querySelector('#date').innerHTML = "날짜 : " + this.date.myFormat()
    }

    init() {
        this.code = this.document.querySelector('input[name="code"]')
        this.name = this.document.querySelector('input[name="name"]')
        this.phone = this.document.querySelector('input[name="phone"]')
        this.codeRequestBtn = this.document.querySelector('.code-request-btn')
        this.reservationBtn = this.document.querySelector('.reservation-btn')
    }

    addEvent() {
        this.phone.addEventListener('input', (e)=> {
            if(e.date !== null && /[^0-9]/.test(e.data)) {
                this.thisWindow.alert('휴대폰번호를 확인해주세요')
            }
            this.phone.value = phoneFormat(this.phone.value)
        })

        this.codeRequestBtn.addEventListener('click', ()=> {
            this.isCodeRequest = true
            this.code.disabled = false
            this.thisWindow.alert('인증번호가 발송되었습니다.')
        })

        this.code.addEventListener('click', ()=> {
            if(!this.isCodeRequest) {
                this.thisWindow.alert('먼저 인증번호를 받으세요')
                return
            }
        })

        this.code.addEventListener('input', (e)=> {
            this.code.value = removeNotNumber(this.code.value)
            if((this.code.value).length > 4) {
                this.code.value = (this.code.value).substr(0,4)
            }
        })

        this.reservationBtn.addEventListener('click', ()=> {
            const code = this.code.value
            const name = this.name.value
            const phone = this.phone.value

            if(code !== '1234') {
                this.thisWindow.alert('인증번호가 옳지 않습니다.')
                return
            }

            if(!name) {
                this.thisWindow.alert('이름을 입력해주세요')
                return
            }

            if(removeNotNumber(phone).length !== 11) {
                this.thisWindow.alert('휴대폰번호를 확인해주세요2')
                return
            }


            this.document.querySelector('.show-txt').style['display'] = 'block'
            
            setTimeout(()=> {
                this.thisWindow.close()
            },1500)

            // window.alert('예약정보가 정상 등록되었습니다. 관리자 승인 후 예약이 최종 완료됩니다.')
        })

    }

}

class ReservationApp {
    constructor() {
        this.init()
    }

    async init() {
        const jsonData = (await $.getJSON('./api/reservation.json')).reservition
        // await $.ajax({
        //     url: './api/reservation.json',
        //     dataType: 'json',
        //     cache: "false", 
        //     success: function(res) {
        //         jsonData = res.reservition
        //     }
        // });
        this.reservationTableControl = new ReservationTableControl(this, jsonData)
        this.reservationPopupControl = new ReservationPopupControl()
    }

    openPopup(data) {
        this.reservationPopupControl.open(data)
    }

}

window.addEventListener('load', ()=> {
    if(window.location.href.includes('reservation')) {
        new ReservationApp()
    }
})


class MypageDetailPopup extends Popup {
    constructor(app) {
        super('./mypageDetailPopup.html',1000)
        this.orderList = {}
    }

    reset({index}) {
        this.index = index
        this.thisOrderList = this.orderList[index]

        if(!this.thisOrderList) {
            this.thisWindow.alert('주문내역이 없습니다.')
            this.thisWindow.close()
            return
        }

        this.document.querySelector('tbody').innerHTML = ''
        let price = 0

        for(let i=this.thisOrderList.length-1; i>=0; i--) {
            const item = this.thisOrderList[i]
            this.table.innerHTML = `
                <tr>
                    <th>${item.tool ? '대여함' : '대여안함'}</th>
                    <th>${item.orderList[0]}</th>
                    <th>${item.orderList[1]}</th>
                    <th>${item.orderList[2]}</th>
                    <th>${item.orderList[3]}</th>
                    <th>${item.orderList[4]}</th>
                </tr>
            `
            price += item.orderList[0] * 12000
            price += item.orderList[1] * 15000
            price += item.orderList[2] * 3000
            price += item.orderList[3] * 5000
            price += item.orderList[4] * 4000

            break
        }
        this.document.querySelector('#price').innerHTML = price.toLocaleString(undefined)
    }

    init() {
        this.table = this.document.querySelector('tbody')
    }

    addEvent() {

    }

    saveData(index, orderList, tool, countDom) {
        if(this.orderList[`${index}`]) {
            this.orderList[`${index}`].push({orderList,tool})
        } else {
            this.orderList[`${index}`] = [{orderList, tool}]
        }
        countDom.innerHTML = this.orderList[`${index}`].length + '건'
    }

}

class MypageBBQPopup extends Popup {
    constructor(app) {
        super('./mypageBBQPopup.html')
        this.app = app
    }

    reset({index}) {
        this.index = index
        this.orderList = []
        for(let i=0; i<5; i++) {
            this.orderList.push(0)
        }

        this.inputs.forEach(x=> {
            x.value =0
        })
        this.checkbox.checked = false
        this.setOrderList()
    }

    init() {
        this.inputs = this.document.querySelectorAll('input[type="number"]')
        this.inputs.forEach(x=> {
            x.value =0
        })
        this.addBtn = this.document.querySelectorAll('.add-btn')
        this.checkbox = this.document.querySelector('input[type="checkbox"]')
        this.orderBtn = this.document.querySelector('.order-btn')
    }

    addEvent() {
        this.inputs.forEach(x=> x.addEventListener('input', ()=> {
            x.value = parseInt(removeNotNumber(x.value))
            if(!x.value || x.value === 'NaN') {
                x.value = 0
            }
        }))

        this.addBtn.forEach((x,i)=> x.addEventListener('click', ()=> {
            const count =this.inputs[i].value
            this.inputs[i].value = 0

            this.orderList[i]+=parseInt(count)
            this.setOrderList()
        }))

        this.checkbox.addEventListener('change', this.setPrice.bind(this))
        this.orderBtn.addEventListener('click', ()=> {
            this.app.saveOrder(this.index, this.orderList, this.checkbox.checked)
            this.close()
        })
    }

    setOrderList() {
        const rows = this.document.querySelectorAll('.order-row')
        this.rowPrice(rows[0], 0, 12000)
        this.rowPrice(rows[1], 1, 15000)
        this.rowPrice(rows[2], 2, 3000)
        this.rowPrice(rows[3], 3, 5000)
        this.rowPrice(rows[4], 4, 4000)
        this.setPrice()
    }

    rowPrice(row, index, price) {
        const tdList = row.querySelectorAll('td')
        row.querySelector('span').innerHTML = this.orderList[index]
        tdList[1].innerHTML = (price * this.orderList[index]).toLocaleString(undefined)
    }

    setPrice() {
        let price = 0
        price += this.orderList[0] * 12000
        price += this.orderList[1] * 15000
        price += this.orderList[2] * 3000
        price += this.orderList[3] * 5000
        price += this.orderList[4] * 4000
        price += this.checkbox.checked ? 10000 : 0

        this.document.querySelector('#price').innerHTML = price.toLocaleString(undefined)
    }

    close() {
        this.thisWindow.close()
    }

}

class MypageApp {
    constructor() {
        this.init()
    }

    init() {
        this.mypageBBQPopup = new MypageBBQPopup(this)
        this.mypageDetailPopup = new MypageDetailPopup(this)
        this.reservationList = document.querySelectorAll('.reservation-row')
        this.reservationList = Array.from(this.reservationList).map((x,i)=> {
            const reservation = {}
            reservation.tr = x
            reservation.bbqOrderBtn = x.querySelector('.bbq-order-btn')
            reservation.orderDetailBtn = x.querySelector('.order-detail-btn')
            reservation.orderCount = x.querySelector('.order-count')

            reservation.bbqOrderBtn.addEventListener('click', ()=> {
                this.mypageBBQPopup.open({index: i})
            })
            reservation.orderDetailBtn.addEventListener('click', ()=> {
                this.mypageDetailPopup.open({index: i})
            })
            return reservation
        })
    }

    saveOrder(index, orderList, tool) {
        this.mypageDetailPopup.saveData(index, orderList, tool, this.reservationList[index].orderCount)
    }

}

// 시작

window.addEventListener('load', ()=> {
    if(window.location.href.includes('mypage')) {
        new MypageApp()
    }
})