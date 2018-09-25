import NetworkingClient from '../HttpClient/NetworkingClient';
import SharedPreferences from '../DataManager/SharedPreferences'
import MockAuthService from '../Services/Authentication/MockAuthService';
class ClientLayer {
    httpClient = null
    sharedPreferences = null
    authService = null
    static instance = null
    // creates instance if instance is null (previously not created)
    static createInstance(){
        if(this.instance == null){
            this.instance = new ClientLayer();
        }
    }

    // returns the instance created
    static getInstance(){
        return this.instance
    }

    // Initialize required components
    Initialize(){
        this.httpClient = new NetworkingClient();
        this.sharedPreferences = new SharedPreferences();
        this.authService = new MockAuthService();
    }
    // calls the above initialize method and then calls error or success callback based on what initialize returns. 
    InitializeWithCallBack(successCallBack,errorCallBack){
        error = this.Initialize();
        if(error == null){
            successCallBack();
        }
        else{
            errorCallBack();
        }
    }

    // returns the instance of http client. 
    getHttpClient(){
        return this.httpClient;
    }
    // returns the instance of shared preferences
    getSharedPreferences(){
        return this.sharedPreferences;
    }
    // returns the instance of current auth service
    // their can be multiple auth services
    getAuthService(){
        return this.authService;
    }
}
export default ClientLayer;