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
        if(day==0 || day==6) {
            this.price = this.spaceName.includes('T') ? '20000' : '30000'
        } else {
            this.price = this.spaceName.includes('T') ? '15000' : '25000'
        }

        this.document.querySelector('#space-name').innerHTML = this.spaceName
        this.document.querySelector('#price').innerHTML = this.price + '원'
        this.document.querySelector('#date').innerHTML = this.date.myFormat()

    }

    init() {
        this.code = this.document.querySelector('input[name="code"]')
        this.name = this.document.querySelector('input[name="name"]')
        this.phone = this.document.querySelector('input[name="phone"]')
        this.codeRequestBtn = this.document.querySelector('#code-request-btn')
        this.reservationBtn = this.document.querySelector('#reservation-btn')
    }

    addEvent() {
        this.phone.addEventListener('input', (e)=> {
            if(/[^0-9]/.test(e.data) && e.data!==null) {
                this.thisWindow.alert('X')
                return
            }
        })

        this.codeRequestBtn.addEventListener('click', ()=> {
            this.isCodeRequest = true
            this.thisWindow.alert('O')
        })

        this.code.onfocus = () => {
            if(!this.isCodeRequest) {
                this.thisWindow.alert('X')
                this.code.blur()
                return
            }
        }

        this.reservationBtn.addEventListener('click', ()=> {
            const name = this.name.value
            const phone = this.phone.value
            const code = this.code.value

            if(removeNotNumber(phone).length != 11) {
                this.thisWindow.alert('X')
                return
            }

            if(!name) {
                this.thisWindow.alert('X')
                return
            }

            if(code != '1234') {
                this.thisWindow.alert('X')
                return
            }

            this.thisWindow.alert('완료')
            this.thisWindow.close()
        })

    }

}