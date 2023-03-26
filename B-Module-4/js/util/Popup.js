class Popup {
    constructor(url, width=700, heigth=700) {
        this.url = url
        this.width = width
        this.heigth =heigth
    }

    async open(data) {
        if(!this.thisWindow || this.thisWindow.closed) {
            this.thisWindow = window.open(this.url, "팝업", `width=${this.width}, heigth=${this.heigth}, top=150, left=200, location=no`)
            await this.waitForLoad(this.thisWindow)
            this.document = this.thisWindow.document

            this.init()
            this.addEvent()
        }
        this.thisWindow.resizeTo(this.width, this.heigth)
        this.document = this.thisWindow.document
        this.reset(data)
    }

    waitForLoad(ele) {
        return new Promise((res,rej)=> {
            ele.onload = () => {res()}
            ele.onerror = () => {rej()}

            setTimeout(()=> {
                res()
            }, 300)
        })
    }

}