import React , {
    Component
} from 'react';
import {Provider,connect} from 'react-redux';
import configureStore from '../store';
import App from '../App';
import store from '../store'
import { addNavigationHelpers } from 'react-navigation'
import { LoginNavigationStack } from './Components/Navigation/NavigationStack';


export default class Root extends Component{
    render(){
        return(
            <Provider store = {store}>
                <App/>
            </Provider>
        )
    }
}