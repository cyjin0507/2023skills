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