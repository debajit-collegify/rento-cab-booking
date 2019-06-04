
const Validation = {

    // stringValidate validation
    // @ author: Debajit Basu
    // @ params: s:string, l=length
    stringValidate(s, l=0) {
        if(s !== null && s !== '' && s.length > l){
            return true;
        }
        else{
            return false;
        }
    },

    // positiveNumber validation
    // @ author: Debajit Basu
    // @ params: n:number
    positiveNumber(n, lowerLimit = 0, uperLimit = 1000000000) {
        if(n !== '' && n !== null && n > lowerLimit && n < uperLimit){
            return true;
        }
        else{
            return false;
        }
    },

    // positiveNumber validation
    // @ author: Debajit Basu
    // @ params: n:number

    emailValidate(value){

        if(value.match(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/)){
            return true;
        }else{
            return false;
        }

    },

    //mobile Number Validation
    //@ Debajit Basu
    //@ params: n:number

    mobileNumberValidate(data) {
        var flag = false;
        if(data.length > 0){
            if (data.match(/^[0-9]+$/) && data.length > 6 && data.length < 17) {
                flag = true;
            }
        }
        return flag
    },

    parseJwt(token){
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(atob(base64));
    }
}

export default Validation;
