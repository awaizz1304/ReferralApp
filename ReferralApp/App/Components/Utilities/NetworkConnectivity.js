import React from 'react';
import {NetInfo } from 'react-native';

class NetworkConnectivity {
    static instance = null;
    isConnected = false;

    static createInstance(){
        if(this.instance == null){
            this.instance = new NetworkConnectivity();
        }
    }
    static getInstance(){
        return this.instance;
    }
    addInternetCheckListener(){
        NetInfo.isConnected.fetch().then(isConnected => {
            //Always false, so ignore/do nothing here 
            //theoratically will work fine on android
        });
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.handleFirstConnectivityChange
        );
    }
    getConnectionStatus() {
        console.log("getConnectionStatus: "+this.isConnected);
        return this.isConnected;
    }
    handleFirstConnectivityChange = (isConnected) => {
        this.isConnected = isConnected;
    }
}
export default NetworkConnectivity;