class MypageDetailPopup extends Popup {
    constructor() {
        super('./mypageDetailPopup.html', 1000)
        this.orderList = {}
    }

    reset({index}) {
        this.index = index
        this.thisOrderList = this.orderList[index]

        if(!this.thisOrderList) {
            this.thisWindow.alert('주문이 없음')
            this.thisWindow.close()
            return
        }

        this.document.querySelector('tbody').innerHTML = ''
        let price = 0

        for(let i=this.thisOrderList.length-1; i>=0; i--) {
            console.log(i);
            const item = this.thisOrderList[i]
            this.table.innerHTML = `
                <tr>
                    <td>${item.tool ? '대여함' : '대여안함'}</td>
                    <td>${item.orderList[0]}</td>
                    <td>${item.orderList[1]}</td>
                    <td>${item.orderList[2]}</td>
                    <td>${item.orderList[3]}</td>
                    <td>${item.orderList[4]}</td>
                </tr>
            `

            price += item.orderList[0] * 12000
            price += item.orderList[1] *15000
            price += item.orderList[2] *3000
            price += item.orderList[3] *5000
            price += item.orderList[4] *4000

            break

        }

        this.document.querySelector('#price').innerHTML = price.toLocaleString(undefined) + '원'

    }

    init() {
        this.table = this.document.querySelector('tbody')
    }

    addEvent(){

    }

    saveData(index,orderList,tool,countDom) {
        if(this.orderList[`${index}`]) {
            this.orderList[`${index}`].push({orderList, tool})
        } else {
            this.orderList[`${index}`] = [{orderList, tool}]
        }
        countDom.innerHTML = this.orderList[`${index}`].length
    }

}