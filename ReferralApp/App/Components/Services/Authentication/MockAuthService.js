import HttpError from "../../HttpClient/HttpError";

class MockAuthService {
    simulateSignupError = true
    simulateLoginError = false
    Login(loginData,successCallBack,errorCallBack){
        setTimeout(() => {
            if(this.simulateLoginError){
                errorCallBack()
            }
            else{
                successCallBack()
            }
        }, 2000);
    }
    SignUp(signupData,successCallBack,errorCallBack){
        setTimeout(() => {
            if(this.simulateSignupError){
                httpError = new HttpError()
                httpError.description = "Something is wrog"
                errorCallBack(httpError)
            }
            else{
                successCallBack()
            }
        }, 2000);
    }
}
export default MockAuthService