class SlideApp {
    constructor() {
        this.init()
    }

    init() {
        const slideItemList = document.querySelectorAll('.visual-img')
        const btnBox = document.querySelector('.btn-box')
        const startBtn = $('.start-btn')
        const stopBtn = $('.stop-btn')

        this.slideElement = new Slide(slideItemList, btnBox, 1, 2)

        startBtn.click(()=> {
            startBtn.css('display', 'none')
            stopBtn.css('display', 'block')

            this.slideElement.start()
        })

        stopBtn.click(()=> {
            stopBtn.css('display', 'none')
            startBtn.css('display', 'block')

            this.slideElement.stop()
        })

    }

}

window.addEventListener('load', ()=> {
    new SlideApp()
})