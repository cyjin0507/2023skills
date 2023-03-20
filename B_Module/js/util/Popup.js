class Popup {
    constructor(url, width=700, height=700) {
        this.url = url
        this.width = width
        this.height = height
    }

    async open(data) {
        if(!this.thisWindow || this.thisWindow.closed) {
            this.thisWindow = window.open(this.url, '팝업', `width=${this.width}, height=${this.height}, top=150, left=200, location=no`)
            await this.waitForLoad(this.thisWindow)
            this.document = this.thisWindow.document

            this.init()
            this.addEvent()
        }
        this.thisWindow.resizeTo(this.width, this.height)
        this.document = this.thisWindow.document
        this.reset(data)
    }

    waitForLoad(element) {
        return new Promise((res, rej)=> {
            element.onload = () => {res()}
            element.onerror = () => {rej()}

            setTimeout(()=> {
                res()
            },300)
        })
    }

}