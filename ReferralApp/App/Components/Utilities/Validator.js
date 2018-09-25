
export const validateEmail = (email) => {
    console.log(email)
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    return reg.test(email);
}

export const validatePassword = (password) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if (password.length < 5){
        return false
    }

    return true
}
export const validateMobileNumber = (number) => {
    let phoneRegex = /(?:\\+971|00971|0)(?:2|3|4|6|7|9|50|51|52|55|56)[0-9]{7}|((\\+92)|(0092))-{0,1}\\d{3}-{0,1}\\d{7}$|^\\d{11}$|^\\d{4}-\\d{7}$/i;
    return phoneRegex.test(number);
}
