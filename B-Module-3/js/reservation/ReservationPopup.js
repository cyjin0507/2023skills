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
                this.thisWindow.alert('전화번호 확인')
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
                this.thisWindow.alert('인증번호 X')
                this.code.blur()
                return
            }
        }

        this.reservationBtn.addEventListener('click', ()=> {
            const code = this.code.value
            const name = this.name.value
            const phone = this.phone.value

            if(removeNotNumber(phone).length !== 11) {
                this.thisWindow.alert('전화번호 확인')
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

            this.thisWindow.alert('예약완료')
            this.thisWindow.close()
        })

    }

}