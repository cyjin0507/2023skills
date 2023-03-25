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
            // this.thisWindow.alert("주문 완료")
            this.modal("주문 완료")
            // this.close()
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