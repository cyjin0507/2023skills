class ReservationPopupControl {
    constructor() {
        this.popup = new ReservationPopup()
    }

    openPopup(data) {
        const {state} = data
        if(state !== 'W') {
            alert('이미 예약됨')
            return
        }

        this.popup = new ReservationPopup(this)

        this.popup.open(data)

    }

}