class Slide {
    constructor(itemList, btnBox, animationTime, intervalTime) {
        this.isProcessing = false
        this.isStop = false
        this.itemList = itemList
        this.animationTime = animationTime
        this.intervalTime = intervalTime
        this.index = 0

        btnBox.innerHTML = ''

        for(let i=0; i<this.itemList.length; i++) {
            const btn = document.createElement('button')
            btn.innerHTML = `${i+1}번째`
            btn.addEventListener('click', ()=> {
                if(this.isStop) {return}
                if(this.index == i) {return}

                clearInterval(this.interval)
                this.nextSlide(this.index, i)
                this.interval = setInterval(this.nextSlide.bind(this), this.intervalTime*1000)

            })
            btnBox.append(btn)
        }
        this.interval = setInterval(this.nextSlide.bind(this), this.intervalTime*1000)

    }

    nextSlide(
        currentSlideIndex = this.index,
        nextSlideIndex = this.index + 1 < this.itemList.length ? this.index + 1 : 0
    ) {
        
        if(this.isProcessing) {return}
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

    animation(item, animation, style, value, callback) {
        item.style.transition = `${animation}s`
        item.style[style] = value
        setTimeout(callback, animation*1000)
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