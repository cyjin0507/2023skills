class MypageApp {
    constructor() {
        this.init()
    }

    init() {
        this.mypageBBQPopup = new MypageBBQPopup(this)
        this.mypageDetailPopup = new MypageDetailPopup(this)

        this.reservationList = document.querySelectorAll('.reservation-row')
        this.reservationList = Array.from(this.reservationList).map((x,i)=> {
            const reservation = {}
            reservation.tr = x
            reservation.id = x.dataset.id

            reservation.reservationCancelBtn = x.querySelector('.reservation-cancel-btn')
            reservation.bbqOrderBtn = x.querySelector('.bbq-order-btn')
            reservation.orderDetailBtn = x.querySelector('.order-detail-btn')
            reservation.orderCount = x.querySelector('.order-count')

            reservation.bbqOrderBtn.addEventListener('click', ()=> {
                this.mypageBBQPopup.open({index:reservation.id})
            })

            reservation.orderDetailBtn.addEventListener('click', ()=> {
                this.mypageDetailPopup.open({index:reservation.id})
            })

            reservation.reservationCancelBtn.addEventListener('click', ()=> {
                window.location.href=`./process_reservation_cancel.php?id=${reservation.id}`
            })

            reservation.orderdata = JSON.parse(x.querySelector('.orderdata').innerHTML)

            return reservation
        })

    }

    saveOrder(index, orderList, tool) {
        this.mypageDetailPopup.saveData(index, orderList, tool, this.reservationList[index].orderCount)
    }

}

window.addEventListener('load', ()=> {
    if(window.location.href.includes('mypage')) {
        new MypageApp()
    }
})