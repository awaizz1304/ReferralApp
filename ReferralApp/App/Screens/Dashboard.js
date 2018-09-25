import React , {
    Component
} from 'react';
import {StyleSheet,Platform ,Text ,View,Button, Image, TouchableOpacity  } from 'react-native';
import {createBottomTabNavigator,createNavigator} from 'react-navigation';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

export default class Dashboard extends Component {
    constructor(props){
        super(props)
    }
    static navigationOptions = {
        tabBarIcon : ({focused , tintColor}) => {
            imageSource = focused ? require('../../Assets_icons/Navbar/SelectedState/Dashboard1x.png') : require('../../Assets_icons/Navbar/InactiveState/Dashboard1x.png')
            return <Image source = {imageSource} />
        },
        tabBarButtonComponent: TouchableBounce,
    };
    componentDidMount (){
        
    }

    OnInfoPress = () => {
        console.log("InfoPressed")
    }
    OnNotificationPressed = () => {
        console.log("OnNotificationPressed")
    }

    render (){
        return(
            <View style = {styles.container}>
                <View style = {styles.topContainer}>
                    <TouchableOpacity onPress = {this.OnInfoPress} >
                        <Image style = {styles.topIconStyle} source = {require('../../Assets_icons/Topbar/Filters1x.png')} />
                    </TouchableOpacity>
                    <Text style = {styles.headingText}>Dashboard</Text>
                    <TouchableOpacity onPress = {this.OnNotificationPressed} >
                        <Image style = {styles.topIconStyle} source = {require('../../Assets_icons/Topbar/Notification1x.png')} />
                    </TouchableOpacity>
                </View>
                <View style = {styles.statsContainer}>
                    
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems : 'center',
    },
    topContainer : {
        marginTop : window.height * 0.04,
        width : window.width * 0.85,
        alignItems : 'center',
        flexDirection : 'row',
        justifyContent: 'space-between',
    },
    topIconStyle : {
        width : 25,
        height : 25,
    },
    headingText : {
        textAlign : 'center',
        fontSize : 25,
        color : '#2A81BB',
        fontWeight : "bold",
    },
    statsContainer : {
        marginTop : 10,
        borderRadius : 5,
        height : window.height * 0.3,
        width : window.width * 0.85,
        shadowOffset:{  width: 0,  height: 0,  },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        backgroundColor : '#2A81BB',
    }
});