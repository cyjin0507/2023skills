
// 숫자 아닌 것 지우기
function removeNotNumber(number){
    try {
        return number.replace(/[^0-9]/g, '')
    } catch (error) {
        return ''
    }
}

// 핸드폰 번호 규칙
function phoneFormat(number) {
    number = removeNotNumber(number)

    if(number.length > 7){
        number = number.replace(/(\d{0,3})(\d{0,4})(\d{0,4})/, '$1-$2-$3')
    } else if(number.length > 3) {
        number = number.replace(/(\d{0,3})(\d{0,4})/, '$1-$2')
    } else {
        number = number.replace(/(\d{0,3})/, '$1')
    }

    number = number.substr(0,13)
    return number
}

// 숫자 앞에 0 붙이기 (숫자포멧)
function padstart(number, num=2, str='0'){
    return number.toString().padStart(num, str)
}

// 날짜 표기
Date.prototype.myFormat = function (){
    return this.getFullYear().toString() + '.' + padstart(this.getMonth() + 1) + '.' + padstart(this.getDate())
}