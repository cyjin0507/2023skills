class ReservationTableControl {
    constructor(app) {
        this.app = app
        this.getData()

        setInterval(this.getData.bind(this), 4900)
    }

    async getData() {
        this.jsonData = await $.getJSON('./get_reservation_data.php')
        this.reset()
    }

    reset() {
        this.setData()

        const today = new Date(this.jsonData.serverDate)
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
            for(let j=0; j<14; j++) {
                this.reservationData[`A${padstart(i)}`].stateList.push('W')
            }
        }

        for(let i=1; i<=10; i++) {
            this.reservationData[`T${padstart(i)}`] = {
                "spaceName" : `T${padstart(i)}`,
                "stateList" : []
            }
            for(let j=0; j<14; j++) {
                this.reservationData[`T${padstart(i)}`].stateList.push('W')
            }
        }

        this.jsonData.reservation.forEach(x=> {
            const {date,place,type} = x
            const startDate = new Date().myFormat()
            const endDate = new Date(new Date().setDate(new Date().getDate() + 13)).myFormat();

            if(startDate <= new Date(date).myFormat() && endDate >= new Date(date).myFormat()) {
                const index = new Date(new Date(date).getTime() - new Date(this.jsonData.serverDate).getTime()).getDate() - 1
                this.reservationData[place].stateList[index] = type == 'ongoing' ? 'R' : 'C'
            }

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
            const date = new Date()
            date.setDate(date.getDate() - index)
            this.app.openPopup({spaceName, index, state})
        })
        return td
    }

    setNextDate(date) {
        date.setDate(date.getDate() + 1)
        return date
    }

}