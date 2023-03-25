class ReservationApp {
    constructor() {
        this.init()
    }

    async init() {
        this.reservationTableControl = new ReservationTableControl(this)
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