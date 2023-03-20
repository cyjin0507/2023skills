class MyPageApp {
    constructor() {
        this.init()
    }

    init() {
        this.myPageBBQModal = new MyPageBBQModal(this)
        this.myPageDetailModal = new MyPageDetailModal(this)

        this.reservationList = document.querySelectorAll('.reservation-row')
        this.reservationList = Array.from(this.reservationList).map((x,i)=> {
            const reservation = {}
            reservation.tr = x

            reservation.bbqOrderBtn = x.querySelector('.bbq-order-btn')
            reservation.orderDetailBtn = x.querySelector('.order-detail-btn')
            reservation.orderCount = x.querySelector('.order-count')

            reservation.bbqOrderBtn.addEventListener('click', ()=> {
                this.myPageBBQModal.open({index:i})
            })

            reservation.orderDetailBtn.addEventListener('click', ()=> {
                this.myPageDetailModal.open({index:i})
            })

            return reservation
        })
    }

    saveOrder(index, orderList, tool) {
        this.myPageDetailModal.saveData(index, orderList, tool, this.reservationList[index].orderCount)
    }

}

window.addEventListener('load', ()=> {
    if(window.location.href.includes('mypage')) {
        new MyPageApp()
    }
})