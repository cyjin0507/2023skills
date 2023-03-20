class ReservationPopupControl {
    constructor() {
        this.popup = new ReservationPopup()
    }

    openPopup(data) {
        let {state} = data
        if(state !== 'W') {
            alert('X')
            return
        }

        if(!this.popup) {
            this.popup = new ReservationPopup(this)
        }

        this.popup.openPopup(data)
    }

}