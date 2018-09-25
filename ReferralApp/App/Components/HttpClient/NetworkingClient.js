import HttpError from './HttpError'
import NetworkConnectivity from '../Utilities/NetworkConnectivity';
import ADVLogger from '../Utilities/ADVLogger';
import fetch from 'react-native-fetch-polyfill';


const Fetch_Status = {
    Pending : 'P',
    Response : 'R',
    Error : 'E',
}
class NetworkingClient {
    fetch_status = Fetch_Status.Pending;

    Get(tag,URL,header,config,responseCallBack,errorCallBack){
        this.fetch_status = Fetch_Status.Pending;
        if(!NetworkConnectivity.getInstance().getConnectionStatus()){
            error = new HttpError();
            error.code = 1;
            error.description = "Internet not connected";
            ADVLogger.e("Client Layer","NetworkingClient","Get","Internet not connected: "+requestURL);
            this.fetch_status = Fetch_Status.Error;
            errorCallBack(error);
            return;
        }

        fetch(URL,{
            method : 'Get',
            headers : header,
            timeout : config.timeout,
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.fetch_status = Fetch_Status.Response;
            ADVLogger.i("Client Layer","NetworkingClient","Get","Response: "+requestURL);
            responseCallback(responseJson);
            return;
        })
        .catch((error) => {
            this.fetch_status = Fetch_Status.Error;
            httpError = new HttpError();
            httpError.description = "Network error: "+error;
            httpError.code = error.code;
            ADVLogger.e("Client Layer","NetworkingClient","Get","Network error: "+requestURL);
            errorCallBack(httpError);
        });
        
    }
    Post(tag,URL,header,data,config,responseCallBack,errorCallBack){
        if(!NetworkConnectivity.getInstance().getConnectionStatus()){
            error = new HttpError();
            error.code = 1;
            error.description = "Internet not connected";
            ADVLogger.e("Client Layer","NetworkingClient","Get","Internet not connected: "+requestURL);
            errorCallBack(error);
            return;
        }

        if(header != null){
            header.push({
                key : "Content-Type",
                value : "application/json",
            });
        }
        else{
            header = new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', 
            })
        }
        this.fetch_status = Fetch_Status.Pending;
        fetch(URL,{
            method : 'Post',
            headers : header,
            body : JSON.stringify(data),
            timeout : config.timeout,
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.fetch_status = Fetch_Status.Response;
            ADVLogger.i("Client Layer","NetworkingClient","Get","Response: "+requestURL);
            responseCallback(responseJson);
            return;
        })
        .catch((error) => {
            this.fetch_status = Fetch_Status.Response;
            httpError = new HttpError();
            httpError.description = "Network error: "+error;
            httpError.code = error.code;
            ADVLogger.e("Client Layer","NetworkingClient","Get","Network error: "+requestURL);
            errorCallBack(httpError);
        });
    }
}
export default NetworkingClient
