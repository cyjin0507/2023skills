class ReservationApp {
    constructor() {
        this.init()
    }

    async init() {
        // await $.ajax({
        //     url: './api/reservation.json',
        //     dataType: 'json',
        //     cache: "false", 
        //     success: function(res) {
        //         jsonData = res.reservition
        //     }
        // });
        this.reservationTableControl = new ReservationTableControl(this)
        this.reservationPopupControl = new ReservationPopupControl()
    }

    openPopup(data) {
        this.reservationPopupControl.open(data)
    }

}

window.addEventListener('load', ()=> {
    if(window.location.href.includes('reservation')) {
        new ReservationApp()
    }
})