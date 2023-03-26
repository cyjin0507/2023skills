class MypageDetailPopup extends Popup {
    constructor(app) {
        super('./mypageDetailPopup.html',1000)
        this.orderList = {}
    }

    reset({index}) {
        this.index = index
        this.thisOrderList = this.orderList[index]

        if(!this.thisOrderList) {
            this.thisWindow.alert('주문내역이 없습니다.')
            this.thisWindow.close()
            return
        }

        this.document.querySelector('tbody').innerHTML = ''
        let price = 0

        for(let i=this.thisOrderList.length-1; i>=0; i--) {
            const item = this.thisOrderList[i]
            this.table.innerHTML = `
                <tr>
                    <th>${item.tool ? '대여함' : '대여안함'}</th>
                    <th>${item.orderList[0]}</th>
                    <th>${item.orderList[1]}</th>
                    <th>${item.orderList[2]}</th>
                    <th>${item.orderList[3]}</th>
                    <th>${item.orderList[4]}</th>
                </tr>
            `
            price += item.orderList[0] * 12000
            price += item.orderList[1] * 15000
            price += item.orderList[2] * 3000
            price += item.orderList[3] * 5000
            price += item.orderList[4] * 4000

            break
        }
        this.document.querySelector('#price').innerHTML = price.toLocaleString(undefined)
    }

    init() {
        this.table = this.document.querySelector('tbody')
    }

    addEvent() {

    }

    saveData(index, orderList, tool, countDom) {
        if(this.orderList[`${index}`]) {
            this.orderList[`${index}`].push({orderList,tool})
        } else {
            this.orderList[`${index}`] = [{orderList, tool}]
        }
        countDom.innerHTML = this.orderList[`${index}`].length + '건'
    }

}