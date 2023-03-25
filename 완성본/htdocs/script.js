class Popup {
    constructor(url, width=700,heigth=700) {
        this.url = url
        this.width = width
        this.heigth = heigth
    }

    async open(data) {
        if(!this.thisWindow || this.thisWindow.closed) {
            this.thisWindow = window.open(this.url, '팝업', `width=${this.width}, heigth=${this.heigth}, top=160, left=200, location=no`)
            await this.waitForLoad(this.thisWindow)
            this.document = this.thisWindow.document

            this.init()
            this.addEvent()
        }
        this.thisWindow.resizeTo(this.width, this.heigth)
        this.document = this.thisWindow.document
        this.reset(data)
    }

    waitForLoad(element) {
        return new Promise((res, rej)=> {
            element.onload = () => {res()}
            element.onerror = () => {rej()}

            setTimeout(()=> {
                res()
            },300)
        })
    }

}


function removeNotNumber(number){
    try {
        return number.replace(/[^0-9]/g, '')
    } catch (error) {
        return ''
    }
}

function phoneFormat(number) {
    number = removeNotNumber(number)

    if(number.length > 7){
        number = number.replace(/(\d{0,3})(\d{0,4})(\d{0,4})/, '$1-$2-$3')
    } else if(number.length > 3) {
        number = number.replace(/(\d{0,3})(\d{0,4})/, '$1-$2')
    } else {
        number = number.replace(/(\d{0,3})/, '$1')
    }

    number = number.substr(0,13)
    return number
}

function padstart(number, num=2, str='0'){
    return number.toString().padStart(num, str)
}

// 날짜 표기
Date.prototype.myFormat = function (){
    return this.getFullYear().toString() + '.' + padstart(this.getMonth() + 1) + '.' + padstart(this.getDate())
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
            x.value = 0
        })

        this.checkbox.checked = false
        this.setOrderList()
    }

    init() {
        this.inputs = this.document.querySelectorAll('input[type="text"]')
        this.inputs.forEach(x=> {
            x.value = 0
        })

        this.addBtn = this.document.querySelectorAll('.add-btn')
        this.checkbox = this.document.querySelector('input[type="checkbox"]')
        this.orderBtn = this.document.querySelector('.order-btn')
    }

    addEvent() {
        this.inputs.forEach(x=> x.addEventListener('input', (e)=> {
            x.value = parseInt(removeNotNumber(x.value))
            if(!x.value || x.value === 'NaN') {
                x.value = 0
            }
        }))

        this.addBtn.forEach((x,i)=> x.addEventListener('click', ()=>{ 
            const count = this.inputs[i].value
            this.inputs[i].value = 0

            this.orderList[i] += parseInt(count)
            this.setOrderList()
        }))

        this.checkbox.addEventListener('change', this.setPrice.bind(this))
        this.orderBtn.addEventListener('click', ()=> {
            this.app.saveOrder(this.index, this.orderList, this.checkbox.checked)
            this.thisWindow.alert("주문 완료")
            this.close()
        })
    }

    setOrderList() {
        const rows = this.document.querySelectorAll('.order-row')
        this.rowsPrice(rows[0], 0, 12000)
        this.rowsPrice(rows[1], 1, 15000)
        this.rowsPrice(rows[2], 2, 3000)
        this.rowsPrice(rows[3], 3, 5000)
        this.rowsPrice(rows[4], 4, 4000)
        this.setPrice()
    }

    rowsPrice(row, index, price) {
        const tdList = row.querySelectorAll('td')
        row.querySelector('span').innerHTML = this.orderList[index]
        tdList[1].innerHTML = parseInt((price * this.orderList[index])).toLocaleString(undefined) + '원'
    }

    setPrice() {
        let price = 0
        price += this.orderList[0] * 12000
        price += this.orderList[1] * 15000
        price += this.orderList[2] * 3000
        price += this.orderList[3] * 5000
        price += this.orderList[4] * 4000
        price += this.checkbox.checked ? 10000 : 0

        this.document.querySelector('#price').innerHTML = price.toLocaleString(undefined) + '원'
    }

    close() {
        this.thisWindow.close()
    }


}

class MypageDetailPopup extends Popup {
    constructor() {
        super('./mypageDetailPopup.html', 1000)
        this.orderList = {}
    }

    reset({index}) {
        this.index = index
        this.thisOrderList = this.orderList[index]

        if(!this.thisOrderList) {
            this.thisWindow.alert('주문이 없음')
            this.thisWindow.close()
            return
        }

        this.document.querySelector('tbody').innerHTML = ''
        let price = 0

        for(let i=this.thisOrderList.length-1; i>=0; i--) {
            console.log(i);
            const item = this.thisOrderList[i]
            this.table.innerHTML = `
                <tr>
                    <td>${item.tool ? '대여함' : '대여안함'}</td>
                    <td>${item.orderList[0]}</td>
                    <td>${item.orderList[1]}</td>
                    <td>${item.orderList[2]}</td>
                    <td>${item.orderList[3]}</td>
                    <td>${item.orderList[4]}</td>
                </tr>
            `

            price += item.orderList[0] * 12000
            price += item.orderList[1] *15000
            price += item.orderList[2] *3000
            price += item.orderList[3] *5000
            price += item.orderList[4] *4000

            break

        }

        this.document.querySelector('#price').innerHTML = price.toLocaleString(undefined) + '원'

    }

    init() {
        this.table = this.document.querySelector('tbody')
    }

    addEvent(){

    }

    saveData(index,orderList,tool,countDom) {
        if(this.orderList[`${index}`]) {
            this.orderList[`${index}`].push({orderList, tool})
        } else {
            this.orderList[`${index}`] = [{orderList, tool}]
        }
        countDom.innerHTML = this.orderList[`${index}`].length
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
                this.mypageBBQPopup.open({index:i})
            })

            reservation.orderDetailBtn.addEventListener('click', ()=> {
                this.mypageDetailPopup.open({index:i})
            })
            return reservation
        })

    }

    saveOrder(index, orderList, tool) {
        this.mypageDetailPopup.saveData(index, orderList, tool, this.reservationList[index].orderCount)
    }

}

window.addEventListener('load', ()=> {
    if(window.location.href.includes('mypage')) {
        new MypageApp()
    }
})

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
        if(day == 6 ||day==0) {
            this.price = this.spaceName.includes('T') ? 20000 : 30000
        } else {
            this.price = this.spaceName.includes('T') ? 15000 : 25000
        }

        this.document.querySelector('#price').innerHTML = this.spaceName
        this.document.querySelector('#place').innerHTML = this.price.toLocaleString(undefined)
        this.document.querySelector('#date').innerHTML = this.date.myFormat()
    }

    init() {
        this.code = this.document.querySelector('input[name="code"]')
        this.phone = this.document.querySelector('input[name="phone"]')
        this.name = this.document.querySelector('input[name="name"]')
        this.codeRequestBtn = this.document.querySelector('.code-request-btn')
        this.reservationBtn = this.document.querySelector('.reservation-btn')
    }

    addEvent() {
        this.phone.addEventListener('input', e=> {
            if(/[^0-9]/.test(e.data) && e.data !== null) {
                this.thisWindow.alert('휴대폰번호를 확인해주세요')
                return
            }
            this.phone.value = phoneFormat(this.phone.value)
        })

        this.codeRequestBtn.addEventListener('click', ()=> {
            this.isCodeRequest = true
            this.thisWindow.alert('인증번호 발송')
        })

        this.code.onfocus = () => {
            if(!this.isCodeRequest) {
                this.thisWindow.alert('먼저 인증번호를 받으세요.')
                this.code.blur()
                return
            }
        }

        this.reservationBtn.addEventListener('click', ()=> {
            const code = this.code.value
            const name = this.name.value
            const phone = this.phone.value

            if(removeNotNumber(phone).length !== 11) {
                this.thisWindow.alert('휴대폰번호를 확인해주세요')
                return
            }

            if(!name) {
                this.thisWindow.alert('이름 확인')
                return
            }

            if(code != '1234') {
                this.thisWindow.alert('코드 확인')
                return
            }

            this.thisWindow.alert('예약정보가 정상 등록되었습니다. 관리자 승인 후 예약이 최종 완료 됩니다.')
            this.thisWindow.close()
        })

    }

}

class ReservationPopupControl {
    constructor() {
        this.popup = new ReservationPopup()
    }

    openPopup(data) {
        const {state} = data
        if(state !== 'W') {
            alert('예약할 수 없습니다.')
            return
        }

        this.popup = new ReservationPopup(this)

        this.popup.open(data)

    }

}

class ReservationTableControl {
    constructor(app, jsonData) {
        this.app = app
        this.jsonData = jsonData
        
        this.reset()

        setInterval(async ()=> {
            this.jsonData = (await $.getJSON('./api/reservation.json')).reservition
            this.reset()
        },4900)
    }

    reset() {
        this.setData()

        const today = new Date()
        document.querySelector('thead').innerHTML = `
            <tr>
                <th>자리/날짜</th>
                <th>오늘</th>
                <th>${this.setNextDate(today).myFormat()}</th>
                <th>${this.setNextDate(today).myFormat()}</th>
                <th>${this.setNextDate(today).myFormat()}</th>
                <th>${this.setNextDate(today).myFormat()}</th>
                <th>${this.setNextDate(today).myFormat()}</th>
                <th>${this.setNextDate(today).myFormat()}</th>
                <th>${this.setNextDate(today).myFormat()}</th>
                <th>${this.setNextDate(today).myFormat()}</th>
                <th>${this.setNextDate(today).myFormat()}</th>
                <th>${this.setNextDate(today).myFormat()}</th>
                <th>${this.setNextDate(today).myFormat()}</th>
                <th>${this.setNextDate(today).myFormat()}</th>
                <th>${this.setNextDate(today).myFormat()}</th>
            </tr>
        `

        this.table = document.querySelector('tbody')
        this.setList()
    }

    setData() {
        this.reservationData = {}

        for(let i=1; i<=7; i++) {
            this.reservationData[`A${padstart(i)}`] = {
                "spaceName" : `A${padstart(i)}`,
                "stateList" : []
            }
        }

        for(let i=1; i<=10; i++) {
            this.reservationData[`T${padstart(i)}`] = {
                "spaceName" : `T${padstart(i)}`,
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

    setList(){
        this.table.innerHTML = ''
        const keyList = Object.keys(this.reservationData)
        keyList.forEach(x=> {
            const tr = this.createTr(this.reservationData[x])
            this.table.appendChild(tr)
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
            td.innerHTML = `<td><span class=${state}><i class="fa-solid fa-tents"></i></span></td>`
        } else if(state == 'C') {
            td.innerHTML = `<td><span class=${state}><i class="fa-solid fa-person-shelter"></i></span></td>`
        } else {
            td.innerHTML = `<td><span class=${state}><i class="fa-solid fa-kiwi-bird"></i></span></td>`
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

class ReservationApp {
    constructor() {
        this.init()
    }

    async init() {
        const jsonData = (await $.getJSON('./api/reservation.json')).reservition
        this.reservationTableControl = new ReservationTableControl(this, jsonData)
        this.reservationPopupControl = new ReservationPopupControl()
    }

    openPopup(data) {
        this.reservationPopupControl.openPopup(data)
    }

}

window.addEventListener('load', ()=> {
    if(window.location.href.includes('reservation')) {
        new ReservationApp()
    }
})



class Slide {
    constructor(itemList, btnBox, animationTime, intervalTime) {
        this.isProcessing = false
        this.isStop = false
        this.animationTime = animationTime
        this.itemList = itemList
        this.intervalTime = intervalTime

        this.imgList = ['./resources/img/01/image_01\ \(18\).jpg','./resources/img/01/image_01\ \(4\).jpg', './resources/img/01/image_01\ \(22\).jpg']

        btnBox.innerHTML = ''
        this.index = 0

        for(let i=0; i<itemList.length; i++) {
            const btn = document.createElement('img')
            btn.src = this.imgList[i]
            btn.addEventListener('click', ()=> {
                if(this.isStop) {return}
                if(i==this.index) {return}

                clearInterval(this.interval)
                this.nextSlide(this.index, i)
                this.interval = setInterval(this.nextSlide.bind(this), this.intervalTime*1000)
            })

            btnBox.appendChild(btn)
        }
        this.interval = setInterval(this.nextSlide.bind(this), this.intervalTime*1000)

    }

    nextSlide(
        currentSlideIndex = this.index,
        nextSlideIndex = this.index + 1 < this.itemList.length ? this.index + 1 : 0
    ) {
        if(this.isProcessing){return}
        this.isProcessing = true

        const currentSlide = this.itemList[currentSlideIndex]
        this.animation(currentSlide, this.animationTime, 'left', '100%', ()=> {
            this.animation(currentSlide, 0, 'left', '-100%')
            this.isProcessing = false
        })

        this.index = nextSlideIndex
        const nextSlide = this.itemList[nextSlideIndex]
        this.animation(nextSlide, this.animationTime, 'left', '0%')
    }

    animation(item, animationTime, style, type, callback) {
        item.style.transition = `${animationTime}s`
        item.style[style] = type
        setTimeout(callback, animationTime*1000)
    }

    stop() {
        this.isStop = true
        clearInterval(this.interval)
    }

    start() {
        this.isStop = false
        this.interval = setInterval(this.nextSlide.bind(this), this.intervalTime*1000)
    }

}

class SlideApp {
    constructor() {
        this.init()
    }

    init() {
        const slideItemList = document.querySelectorAll('.visual-img')
        const btnBox = document.querySelector('.btn-box')
        const startBtn = $('.start-btn')
        const stopBtn = $('.stop-btn')

        this.slideElement = new Slide(slideItemList, btnBox, 1, 2)

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

