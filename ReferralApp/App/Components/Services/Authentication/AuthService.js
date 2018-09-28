import ClientLayer from "../../Layers/ClientLayer";
import HttpRequestConfigs from '../../HttpClient/HttpRequestConfigs'
import { Base_URL } from "../../Common/Constants";


class AuthService {
    httpConfig = null
    AuthService(){
        this.httpConfig = new HttpRequestConfigs()
        this.httpConfig.timeout = 1000
    }
    getHttpClient(){
        return ClientLayer.getInstance().getHttpClient()
    }
    SignUp(signupData,successCallBack,errorCallBack){
        this.getHttpClient().Post("SignUp",Base_URL,header,loginData,this.httpConfig,(response)=>{

        },(error)=>{

        })
    }
    Login(loginData,successCallBack,errorCallBack){
        
        this.getHttpClient().Post("Login",Base_URL,header,loginData,this.httpConfig,(response)=>{

        },(error)=>{

        })
    }
}
export default AuthService