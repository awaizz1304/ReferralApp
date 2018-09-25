import React , {
    Component
} from 'react';
import {Platform ,Text ,View,Button, Image  } from 'react-native';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';

export default class Referrals extends Component {
    constructor(props){
        super(props)
    }
    static navigationOptions = {
        tabBarIcon : ({focused , tintColor}) => {
            imageSource = focused ? require('../../Assets_icons/Navbar/SelectedState/Referrals1x.png') : require('../../Assets_icons/Navbar/InactiveState/Referrals1x.png')
            return <Image source = {imageSource} />
        },
        tabBarButtonComponent: TouchableBounce,
    };
    componentDidMount (){
        
    }
    render (){
        return(
            <Text>Referrals</Text>
        )
    }

}