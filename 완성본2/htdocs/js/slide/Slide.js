class Slide {
    constructor(itemList, btnBox, animationTime, intervalTime) {
        this.isProcessing = false
        this.isStop = false
        this.isClear = false        
        this.animationTime = animationTime
        this.itemList = itemList
        this.intervalTime = intervalTime

        this.slideType = 0

        this.imgList = ['./resources/imgs/images/01/image_01\ \(18\).jpg', './resources/imgs/images/01/image_01\ \(4\).jpg', './resources/imgs/images/01/image_01\ \(22\).jpg']

        btnBox.innerHTML = ''
        this.index = 0

        for (let i = 0; i < itemList.length; i++) {
            const btn = document.createElement('img')
            btn.src = this.imgList[i]
            btn.addEventListener('click', () => {
                console.log("a : " + this.isClear);
                if(this.isClear) {return}
                this.isClear = true
                console.log("b : " + this.isClear);
                clearInterval(this.interval)

                this.clearAnimation(i)

                if (!this.isStop) {
                    this.interval = setInterval(this.nextSlide.bind(this), this.intervalTime * 1000)
                }
            })

            btnBox.appendChild(btn)
        }
        this.interval = setInterval(this.nextSlide.bind(this), this.intervalTime * 1000)

    }

    clearAnimation(ele) {

        for (let i = 0; i < this.itemList.length; i++) {
            this.animation(this.itemList[i], 0, 'left', '-100%')
        }

        this.slideType = 1
        this.animation(this.itemList[ele], 0, 'left', '0%')
        this.animation(this.itemList[ele], 0, 'opacity', '0')
        this.animation(this.itemList[ele], this.animationTime, 'opacity', '1', ()=> {
            this.isClear = false
        })
        this.isProcessing = false
        this.index = ele
    }

    nextSlide(
        currentSlideIndex = this.index,
        nextSlideIndex = this.index + 1 < this.itemList.length ? this.index + 1 : 0
    ) {
        if (this.isProcessing) { return }
        this.isProcessing = true

        this.current = currentSlideIndex

        this.time = new Date()

        const currentSlide = this.itemList[currentSlideIndex]
        this.animation(currentSlide, this.animationTime, 'left', '100%', () => {
            if (!this.isStop) {
                this.animation(currentSlide, 0, 'left', '-100%')
                this.isProcessing = false
            }
        })

        this.index = nextSlideIndex
        const nextSlide = this.itemList[nextSlideIndex]
        this.next = nextSlideIndex

        this.animation(nextSlide, this.animationTime, 'left', '0%')
    }

    animation(item, animationTime, style, type, callback) {
        $(item).animate({
            [style]: type
        }, animationTime * 1000)

        setTimeout(callback, animationTime * 1000)
    }

    stop() {
        this.isStop = true
        this.endTime = new Date()
        this.slideType = 0
        for (let i = 0; i < this.imgList.length; i++) {
            $(this.itemList[i]).stop(true)
        }

        clearInterval(this.interval)
    }

    start() {
        this.isStop = false
        this.interval = setInterval(this.nextSlide.bind(this), this.intervalTime * 1000)

        if (this.slideType == 0) {
            let leftTime = (1000 - (this.endTime - this.time)) / 1000
            this.time = new Date()

            for (let i = 0; i < this.itemList.length; i++) {
                $(this.itemList[i]).css('left', $(this.itemList[i]).css('left'))
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