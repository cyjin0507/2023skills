class Slide {
    constructor(itemList, btnBox, animationTime, intervalTime) {
        this.isProcessing = false
        this.isStop = false
        this.isClear = false
        this.slideType = 0

        this.itemList = itemList
        this.animationTime = animationTime
        this.intervalTime = intervalTime

        btnBox.innerHTML = ''
        this.imgList = ['./resources/imgs/images/01/image_01\ \(18\).jpg', './resources/imgs/images/01/image_01\ \(4\).jpg', './resources/imgs/images/01/image_01\ \(22\).jpg']

        this.index = 0

        for(let i=0; i<this.itemList.length; i++) {
            const btn = document.createElement('img')
            btn.src = this.imgList[i]
            btn.addEventListener('click', ()=> {
                if(this.isClear) {return}
                this.isClear = true

                clearInterval(this.interval)
                this.clearAnimation(i)
                
                if(!this.isStop) {
                    this.interval = setInterval(this.nextSlide.bind(this), this.intervalTime*1000)
                }

            })
            btnBox.appendChild(btn)
        }
        this.interval = setInterval(this.nextSlide.bind(this), this.intervalTime*1000)
    }

    clearAnimation(ele) {
        for(let i=0; i<this.itemList.length; i++) {
            this.animation(this.itemList[i], 0, 'left', '-100%')
        }

        this.animation(this.itemList[ele], 0, 'left', '0%')
        this.animation(this.itemList[ele], 0, 'opacity', '0')
        this.animation(this.itemList[ele], this.animationTime, 'opacity', '1', ()=> {
            this.isClear = false
        })

        this.isProcessing = false
        this.slideType = 1
        this.index = ele
    }

    animation(item, animationTime, style, value, callback) {
        $(item).animate({
            [style] : value
        }, animationTime*1000)
        setTimeout(callback, animationTime*1000)
    }

    nextSlide(
        currentSlideIndex = this.index,
        nextSlideIndex = this.index + 1 < this.itemList.length ? this.index + 1 : 0
    ) {
        if(this.isProcessing) {return}
        this.isProcessing = true

        this.time = new Date()

        const currentSlide = this.itemList[currentSlideIndex]
        this.current = currentSlideIndex
        this.animation(currentSlide, this.animationTime, 'left', '100%', ()=> {
            if(!this.isStop) {
                this.animation(currentSlide, 0, 'left', '-100%')
                this.isProcessing = false
            }
        })

        this.index = nextSlideIndex
        this.next = nextSlideIndex
        const nextSlide = this.itemList[nextSlideIndex]
        this.animation(nextSlide, this.animationTime, 'left', '0%')

    }

    stop() {
        this.isStop = true
        
        this.slideType = 0
        for(let i=0; i<this.itemList.length; i++) {
            $(this.itemList[i]).stop(true)
        }
        
        this.endTime = new Date()
        clearInterval(this.interval)
    }

    start() {
        this.isStop = false
        this.interval = setInterval(this.nextSlide.bind(this), this.intervalTime*1000)

        if(this.slideType == 0) {
            let leftTime = (1000 - (this.endTime - this.time)) / 1000
            this.time = new Date()

            for(let i=0; i<this.itemList.length; i++) {
                $(this.itemList[i]).css('left',$(this.itemList[i]).css('left'))
            }
            this.animation(this.itemList[this.current], leftTime, 'left', '100%', () => {
                if(!this.isStop) {
                    this.animation(this.itemList[this.current], 0, 'left', '-100%')
                }
                this.isProcessing = false
            })

            this.animation(this.itemList[this.next], leftTime, 'left', '0%')

        }
        this.slideType = 1
    }

}