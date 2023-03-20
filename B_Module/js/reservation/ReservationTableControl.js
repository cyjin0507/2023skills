class ReservationTableControl {
    constructor(app, jsonData) {
        this.app = app
        this.jsonData = jsonData
        this.reset()

        setInterval(async ()=> {
            this.jsonData = (await $.getJSON('./api/reservation.json')).reservition
            this.reset()
        })
    }

    reset() {
        this.setData()

        const today = new Date()

        document.querySelector('thead').innerHTML = `
            <tr>
                <th>자리/날짜</th>
                <th>오늘</th>
                <th>${this.nextDate(today).myFormat()}</th>
                <th>${this.nextDate(today).myFormat()}</th>
                <th>${this.nextDate(today).myFormat()}</th>
                <th>${this.nextDate(today).myFormat()}</th>
                <th>${this.nextDate(today).myFormat()}</th>
                <th>${this.nextDate(today).myFormat()}</th>
                <th>${this.nextDate(today).myFormat()}</th>
                <th>${this.nextDate(today).myFormat()}</th>
                <th>${this.nextDate(today).myFormat()}</th>
                <th>${this.nextDate(today).myFormat()}</th>
                <th>${this.nextDate(today).myFormat()}</th>
                <th>${this.nextDate(today).myFormat()}</th>
                <th>${this.nextDate(today).myFormat()}</th>
            </tr>
        `

        this.table = document.querySelector('table tbody')
        this.setList()
    }

    setData() {
        this.resetvationData = {}

        for(let i=0; i<7; i++) {
            this.resetvationData[`A${padstart(i)}`] = {
                'spaceName' : `A${padstart(i)}`,
                'stateList' : []
            }
        }

        for(let i=0; i<10; i++) {
            this.resetvationData[`T${padstart(i)}`] = {
                'spaceName' : `T${padstart(i)}`,
                'stateList' : []
            }
        }

        this.jsonData.forEach((x,i)=> {
            const dayData = x[`D+${i}`]
            dayData.forEach(x=> {
                const {loc_num, status} = x
                this.reservitionData[loc_num].stateList.push(status)
            })
        })
    }

    setList() {
        this.table.innerHTML = ''
        const keyList = Object.keys(this.reservitionData)
        keyList.forEach(x=> {
            const tr = this.createTr(this.reservationData[x])
            this.table.appendChild(tr)
        })
    }

    createTr({spaceName, stateList}) {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${spaceName}</td>
        `
        stateList.forEach((x,i)=> {
            tr.appendChild(this.createIcon(spaceName, i, x))
        })
    }

    createIcon({spaceName, index, states}) {
        const td = document.createElement('td')
        td.innerHTML = `
            <td><span>${}</span></td>
        `
    }




}