class Slide {
    constructor(itemList, btnBox, animationTime, intervalTime) {
        this.isProcessing = false
        this.isStop = false
        this.animationTime = animationTime
        this.itemList = itemList
        this.intervalTime = intervalTime

        this.imgList = ['./resources/img/01/image_01\ \(18\).jpg','./resources/img/01/image_01\ \(4\).jpg', './resources/img/01/image_01\ \(22\).jpg']

        btnBox.innerHTML = ''
        this.index = 0

        for(let i=0; i<itemList.length; i++) {
            const btn = document.createElement('img')
            btn.src = this.imgList[i]
            btn.addEventListener('click', ()=> {
                if(this.isStop) {return}
                if(i==this.index) {return}

                clearInterval(this.interval)
                this.nextSlide(this.index, i)
                this.interval = setInterval(this.nextSlide.bind(this), this.intervalTime*1000)
            })

            btnBox.appendChild(btn)
        }
        this.interval = setInterval(this.nextSlide.bind(this), this.intervalTime*1000)

    }

    nextSlide(
        currentSlideIndex = this.index,
        nextSlideIndex = this.index + 1 < this.itemList.length ? this.index + 1 : 0
    ) {
        if(this.isProcessing){return}
        this.isProcessing = true

        const currentSlide = this.itemList[currentSlideIndex]
        this.animation(currentSlide, this.animationTime, 'left', '100%', ()=> {
            this.animation(currentSlide, 0, 'left', '-100%')
            this.isProcessing = false
        })

        this.index = nextSlideIndex
        const nextSlide = this.itemList[nextSlideIndex]
        this.animation(nextSlide, this.animationTime, 'left', '0%')
    }

    animation(item, animationTime, style, type, callback) {
        item.style.transition = `${animationTime}s`
        item.style[style] = type
        setTimeout(callback, animationTime*1000)
    }

    stop() {
        this.isStop = true
        clearInterval(this.interval)
    }

    start() {
        this.isStop = false
        this.interval = setInterval(this.nextSlide.bind(this), this.intervalTime*1000)
    }

}