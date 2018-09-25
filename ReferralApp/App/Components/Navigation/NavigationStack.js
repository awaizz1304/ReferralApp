import React,{ Component,PropTypes } from 'react';
import { createStackNavigator } from 'react-navigation';

import Login from '../../Screens/Login';
import Signup from '../../Screens/Signup';
import Home from '../../Screens/BottomNavigator';



export const LoginNavigationStack = createStackNavigator({
    Login : {screen: Login},
    Signup : {screen: Signup},
    Home : {screen : Home},
},{
    headerMode : 'none',
    initialRouteName : 'Login',
});


export const HomeNavigationStack = createStackNavigator({
    Login : {screen: Login},
    Signup : {screen: Signup},
    Home : {screen : Home},
},{
    headerMode : 'none',
    initialRouteName : 'Home',
});



