class SlideApp {
    constructor() {
        this.init()
    }

    init() {
        const itemList = document.querySelectorAll('.visual-img')
        const btnBox = document.querySelector('.btn-box')
        const startBtn = $('.start-btn')
        const stopBtn = $('.stop-btn')

        this.slideElement = new Slide(itemList, btnBox, 0.5, 2)

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
    if(!window.location.href.includes('mypage') && !window.location.href.includes('reservation')) {
        new SlideApp()
    }
})