import React , {
    Component
} from 'react';
import {StyleSheet,Platform ,Text ,View,Button, Image, TouchableOpacity,TouchableWithoutFeedback  } from 'react-native';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import { withNavigation } from "react-navigation";
import Refer from './Refer';
const SIZE = 110;

class AddButton extends Component {
    OnButtonClick = () =>{
        this.props.navigation.navigate('Refer')
    }
    componentDidMount () {
        
    }
    render () {
        return (
            <TouchableBounce onPress = {this.OnButtonClick}>
                <View style = {styles.addButtonStyle}>
                    <Image style = {styles.imageStyle} source = {require('../../Assets_icons/AddReferral/AddReferral1x.png')}/> 
                </View>
            </TouchableBounce>
        )
    }
}
export default withNavigation(AddButton)
const styles = StyleSheet.create({
    addButtonStyle : {
        marginTop : -23,
        borderRadius : 100/2,
        backgroundColor : '#0086C3',
        justifyContent : 'center',
        alignItems : 'center',
        width: SIZE / 2,
        height: SIZE / 2,
        shadowOffset:{  width: 0,  height: 5,  },
        shadowColor: 'black',
        shadowOpacity: 0.2,
    },
    imageStyle : {
        
    },
});