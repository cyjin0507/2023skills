function removeNotNumber(number) {
    try {
        return number.replace(/[^0-9]/g, '')
    } catch(error) {
        return ''
    }
}

function phoneFormat(number) {
    number = removeNotNumber(number)
    if(number.length > 7) {
        number = number.replace(/(\d{0,3})(\d{0,4})(\d{0,4})/, '$1-$2-$3')
    } else if(number.length > 3) {
        number = number.replace(/(\d{0,3})(\d{0,4})/, '$1-$2')
    } else {
        number = number.replace(/(\d{0,3})/, '$1')
    }

    number = number.substr(0,13)
    return number
}

function padStart(number, num=2, str='0') {
    return number.toString().padStart(num, str)
}

Date.prototype.myFormat = function() {
    return this.getFullYear().toString() + '.' + padStart(this.getMonth() + 1) + '.' + padStart(this.getDay())
}