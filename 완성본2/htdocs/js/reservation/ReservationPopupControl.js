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