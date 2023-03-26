class ReservationTableControl {
    constructor(app, jsonData) {
        this.app = app
        this.jsonData = jsonData
        this.reset()

        setInterval(async ()=> {
            // const jsonData = (await $.getJSON('./api/reservation.json')).reservition
            let jsonData = ""
            await $.ajax({
                url : "./api/reservation.json",
                dataType : "json",
                cache : false,
                success : function(res) {
                    jsonData = res.reservition
                }
            })
            this.jsonData = jsonData
            this.reset()
        },4900)
    }

    reset() {
        this.setData()

        const today = new Date()
        document.querySelector('thead').innerHTML = `
            <tr>
                <td>자리/날짜</td>
                <td>오늘</td>
                <td>${this.setNextDate(today).myFormat()}</td>
                <td>${this.setNextDate(today).myFormat()}</td>
                <td>${this.setNextDate(today).myFormat()}</td>
                <td>${this.setNextDate(today).myFormat()}</td>
                <td>${this.setNextDate(today).myFormat()}</td>
                <td>${this.setNextDate(today).myFormat()}</td>
                <td>${this.setNextDate(today).myFormat()}</td>
                <td>${this.setNextDate(today).myFormat()}</td>
                <td>${this.setNextDate(today).myFormat()}</td>
                <td>${this.setNextDate(today).myFormat()}</td>
                <td>${this.setNextDate(today).myFormat()}</td>
                <td>${this.setNextDate(today).myFormat()}</td>
                <td>${this.setNextDate(today).myFormat()}</td>
            </tr>
        `

        this.tabel = document.querySelector('tbody')
        this.setList()
    }

    setData() {
        this.reservationData = {}

        for(let i=1; i<=7; i++) {
            this.reservationData[`A${padStart(i)}`] = {
                "spaceName" : `A${padStart(i)}`,
                "stateList" : []
            }
        }

        for(let i=1; i<=10; i++) {
            this.reservationData[`T${padStart(i)}`] = {
                "spaceName" : `T${padStart(i)}`,
                "stateList" : []
            }
        }

        this.jsonData.forEach((x,i)=> {
            const dayData = x[`D+${i}`]
            dayData.forEach(x=> {
                const {loc_num, status} = x
                this.reservationData[loc_num].stateList.push(status)
            })
        })

    }

    setList() {
        this.tabel.innerHTML = ''
        const keyList = Object.keys(this.reservationData)
        keyList.forEach(x=> {
            const tr = this.createTr(this.reservationData[x])
            this.tabel.appendChild(tr)
        })
    }

    createTr({spaceName, stateList}) {
        const tr = document.createElement('tr')
        tr.innerHTML = `<td>${spaceName}</td>`
        stateList.forEach((x,i)=> {
            tr.appendChild(this.createIcon(spaceName, i, x))
        })
        return tr
    }

    createIcon(spaceName, index, state) {
        const td = document.createElement('td')
        if(state == 'W') {
            td.innerHTML = `<td><span class="${state}"><i class="fa-solid fa-tents"></i></span></td>`
        } else if(state == 'C') {
            td.innerHTML = `<td><span class="${state}"><i class="fa-solid fa-person-shelter"></i></span></td>`
        } else {
            td.innerHTML = `<td><span class="${state}"><i class="fa-solid fa-kiwi-bird"></i></span></td>`
        }
        td.querySelector('span').addEventListener('click', ()=> {
            this.app.openPopup({spaceName, index, state})
        })
        return td
    }

    setNextDate(date) {
        date.setDate(date.getDate() + 1)
        return date
    }

}