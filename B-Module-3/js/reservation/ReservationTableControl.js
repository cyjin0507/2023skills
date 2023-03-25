class ReservationTableControl {
    constructor(app, jsonData) {
        this.app = app
        this.jsonData = jsonData
        
        this.reset()

        setInterval(async ()=> {
            this.jsonData = (await $.getJSON('./api/reservation.json')).reservition
            this.reset()
        },4900)
    }

    reset() {
        this.setData()

        const today = new Date()
        document.querySelector('thead').innerHTML = `
            <tr>
                <th>자리/날짜</th>
                <th>오늘</th>
                <th>${this.setNextDate(today).myFormat()}</th>
                <th>${this.setNextDate(today).myFormat()}</th>
                <th>${this.setNextDate(today).myFormat()}</th>
                <th>${this.setNextDate(today).myFormat()}</th>
                <th>${this.setNextDate(today).myFormat()}</th>
                <th>${this.setNextDate(today).myFormat()}</th>
                <th>${this.setNextDate(today).myFormat()}</th>
                <th>${this.setNextDate(today).myFormat()}</th>
                <th>${this.setNextDate(today).myFormat()}</th>
                <th>${this.setNextDate(today).myFormat()}</th>
                <th>${this.setNextDate(today).myFormat()}</th>
                <th>${this.setNextDate(today).myFormat()}</th>
                <th>${this.setNextDate(today).myFormat()}</th>
            </tr>
        `

        this.table = document.querySelector('tbody')
        this.setList()
    }

    setData() {
        this.reservationData = {}

        for(let i=1; i<=7; i++) {
            this.reservationData[`A${padstart(i)}`] = {
                "spaceName" : `A${padstart(i)}`,
                "stateList" : []
            }
        }

        for(let i=1; i<=10; i++) {
            this.reservationData[`T${padstart(i)}`] = {
                "spaceName" : `T${padstart(i)}`,
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

    setList(){
        this.table.innerHTML = ''
        const keyList = Object.keys(this.reservationData)
        keyList.forEach(x=> {
            const tr = this.createTr(this.reservationData[x])
            this.table.appendChild(tr)
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
            td.innerHTML = `<td><span class=${state}><i class="fa-solid fa-tents"></i></span></td>`
        } else if(state == 'C') {
            td.innerHTML = `<td><span class=${state}><i class="fa-solid fa-person-shelter"></i></span></td>`
        } else {
            td.innerHTML = `<td><span class=${state}><i class="fa-solid fa-kiwi-bird"></i></span></td>`
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