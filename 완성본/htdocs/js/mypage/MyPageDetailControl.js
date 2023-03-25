class MypageDetailPopup extends Popup {
    constructor() {
        super('./mypageDetailPopup.html', 1000)
        this.orderList = {}
    }

    async reset({index}) {
        this.reservationId = index

        await this.getData()

        this.thisOrderList = this.orderList[index]

        if(!this.thisOrderList) {
            this.thisWindow.alert('주문이 없음')
            this.thisWindow.close()
            return
        }

        this.document.querySelector('tbody').innerHTML = ''
        let price = 0
        let sumPrice = 0
        for(let i=this.thisOrderList.length-1; i>=0; i--) {
            console.log(i);
            const item = this.thisOrderList[i]
            const tr = document.createElement('tr')
            if(item.state == '취소') {
                tr.innerHTML = `
                <tr>
                    <td>${item.tool ? '대여함' : '대여안함'}</td>
                    <td>${item.orderList[0]}</td>
                    <td>${item.orderList[1]}</td>
                    <td>${item.orderList[2]}</td>
                    <td>${item.orderList[3]}</td>
                    <td>${item.orderList[4]}</td>
                    <td>${item.state}</td>
                    <td>취소된 주문</td>
                    <td style="display:none"><button class="btn btn-success">주문취소</button></td>
                </tr>
            `
            } else {
                tr.innerHTML = `
                <tr>
                    <td>${item.tool ? '대여함' : '대여안함'}</td>
                    <td>${item.orderList[0]}</td>
                    <td>${item.orderList[1]}</td>
                    <td>${item.orderList[2]}</td>
                    <td>${item.orderList[3]}</td>
                    <td>${item.orderList[4]}</td>
                    <td>${item.state}</td>
                    <td><button data-id="${item.id}" class="btn btn-success">주문취소</button></td>
                </tr>
            `
            }

            tr.querySelector('button').addEventListener('click', this.orderCancel.bind(this))

            price += item.orderList[0] * 12000
            price += item.orderList[1] *15000
            price += item.orderList[2] *3000
            price += item.orderList[3] *5000
            price += item.orderList[4] *4000

            if(item.state !== '취소') {
                sumPrice += price
            }

            this.table.appendChild(tr)

        }

        this.document.querySelector('#price').innerHTML = sumPrice.toLocaleString(undefined) + '원'

    }

    async orderCancel(e) {
        const response = await fetch(`./process_order_cancel.php?id=${e.target.dataset.id}`);
        this.thisWindow.alert(await response.text())
        window.location.reload()
    }

    init() {
        this.table = this.document.querySelector('tbody')
    }

    addEvent(){

    }

    async saveData(index,orderList,tool,countDom) {
        await this.getData()
        // if(this.orderList[`${index}`]) {
        //     this.orderList[`${index}`].push({orderList, tool})
        // } else {
        //     this.orderList[`${index}`] = [{orderList, tool}]
        // }
        countDom.innerHTML = this.orderList[`${index}`].length
    }

    async getData() {
        const data = await $.getJSON('./get_order_data.php')
        this.orderList = {}
        data.forEach(x=> {
            if(this.orderList[`${x.reservation_id}`]) {
                this.orderList[`${x.reservation_id}`].push({...JSON.parse(x.json_data), id:x.id, state:(x.type=='cancel'? '취소' : (x.type=='complete'?'배달완료': '배달중'))})
            } else {
                this.orderList[`${x.reservation_id}`] = [{...JSON.parse(x.json_data), id:x.id, state:(x.type=='cancel'? '취소' : (x.type=='complete'?'배달완료': '배달중'))}]
            }
        })
    }

}