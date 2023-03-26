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