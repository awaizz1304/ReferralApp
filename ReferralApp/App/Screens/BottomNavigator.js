import React , {
    Component
} from 'react';
import {Platform ,Text ,View,Button,Image  } from 'react-native';
import { TabNavigator,TabBarBottom, createBottomTabNavigator } from 'react-navigation';
import Dashboard from './Dashboard';
import Referrals from './Referrals';
import Rewards from './Rewards';
import Settings from './Settings';


export default createBottomTabNavigator ({
    Dashboard : {screen : Dashboard},
    Referrals : {screen : Referrals},
    Rewards : {screen : Rewards},
    Settings : {screen : Settings},
},{
    animationEnabled : false,
    swipeEnabled : true,
});