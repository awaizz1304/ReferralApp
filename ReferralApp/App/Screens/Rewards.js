import React , {
    Component
} from 'react';
import {Platform ,Text ,View,Button, Image  } from 'react-native';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';

export default class Rewards extends Component {
    constructor(props){
        super(props)
    }
    static navigationOptions = {
        tabBarIcon : ({focused , tintColor}) => {
            imageSource = focused ? require('../../Assets_icons/Navbar/SelectedState/Fill11x.png') : require('../../Assets_icons/Navbar/InactiveState/Rewards1x.png')
            return <Image source = {imageSource} />
        },
        tabBarButtonComponent: TouchableBounce,
    };
    componentDidMount (){
        
    }
    render (){
        return(
            <Text>Rewards</Text>
        )
    }

}