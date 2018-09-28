import React , {
    Component
} from 'react';
import {Platform ,Text ,View,Button, Image  } from 'react-native';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';

export default class Settings extends Component {
    constructor(props){
        super(props)
    }
    static navigationOptions = {
        tabBarIcon : ({focused , tintColor}) => {
            imageSource = focused ? require('../../Assets_icons/Navbar/SelectedState/Settings1x.png') : require('../../Assets_icons/Navbar/InactiveState/Settings1x.png');
            return <Image source = {imageSource} />
        },
        tabBarButtonComponent: TouchableBounce,
        tabBarLabel : "Settings",
    };
    componentDidMount (){
        
    }
    render (){
        return(
            <Text>Settings</Text>
        )
    }

}