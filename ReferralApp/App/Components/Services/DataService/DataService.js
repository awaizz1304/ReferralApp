import ClientLayer from "../../Layers/ClientLayer";
import HttpRequestConfigs from '../../HttpClient/HttpRequestConfigs'
import { Base_URL } from "../../Common/Constants";

class DataService {
    httpConfig = null
    DataService(){
        this.httpConfig = new HttpRequestConfigs()
        this.httpConfig.timeout = 1000
    }
    getHttpClient(){
        return ClientLayer.getInstance().getHttpClient()
    }
}

export default DataService;