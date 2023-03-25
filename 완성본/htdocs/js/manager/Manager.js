class ManagerPopup extends Popup {
    constructor(refreshFunc) {
        super('./ManageDetailPopup.html', 1000)
        this.orderList = {}
        this.refreshFunc = refreshFunc
    }

    reset({index}) {
        this.index = index
        this.thisOrderList = this.orderList[index]

        if(!this.thisOrderList) {
            this.thisWindow.alert('더이상의 예약이 없음')
            this.thisWindow.close()
            return
        }

        this.document.querySelector('table tbody').innerHTML = ''
        let sumPrice = 0

        for(let i=0; i<this.thisOrderList.length; i++) {
            const item = this.thisOrderList[i]
            if(item.type == 'cancel') {
                continue
            }

            const tr = document.createElement('tr')
            tr.innerHTML = `
                <tr>
                    <td>${item.data.tool ? '대여함' : '대여안함'}</td>
                    <td>
                        돼지고기 바비큐 세트 <br>
                        해산물 바비큐 세트 <br>
                        음료 <br>
                        주류 <br>
                        과자 세트 <br>
                    </td>
                    <td>
                        ${item.data.orderList[0]}개 <br>
                        ${item.data.orderList[1]}개<br>
                        ${item.data.orderList[2]}개<br>
                        ${item.data.orderList[3]}개<br>
                        ${item.data.orderList[4]}개
                    </td>
                    <td>${item.price}</td>
                    <td>${item.type =='cancel' ? '취소' : (item.type == 'accept' ? '접수' : '배달완료')}</td>
                    <td>
                        <button class="complete btn btn-success">수락</button>
                        <button class="cancel btn btn-danger">취소</button>
                    </td>
                </tr>
            `

            tr.querySelector('.cancel').addEventListener('click', ()=> {
                console.log("cancel");
                fetch(`./process_order_manager.php?id=${item.id}&process=cancel`)
                item.type = 'cancel'
                this.reset({index})
                this.refreshFunc()
            })

            tr.querySelector('.complete').addEventListener('click', ()=> {
                fetch(`./process_order_manager.php?id=${item.id}&process=complete`)
                item.type = 'complete'
                this.reset({index})
                this.refreshFunc()
            })

            this.document.querySelector('tbody').appendChild(tr)

            sumPrice += item.price

        }

        this.document.querySelector('#price').innerHTML = sumPrice.toLocaleString(undefined)
    }

    init() {

    }

    addEvent() {

    }

    saveOrder(index, orderList, countDom) {
        this.orderList[`${index}`] = orderList
        countDom.innerHTML = orderList.reduce((s,orderList)=> (orderList.type !== 'cancel' ? s++ : s),0);
    }

}