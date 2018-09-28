import React , {
    Component
} from 'react';
import {StyleSheet,Platform ,Text ,View,Button, Image, TouchableOpacity  } from 'react-native';
import {createBottomTabNavigator,createNavigator} from 'react-navigation';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import Tabs from './Tabs';
import Dashboard_Pending from './Dashboard_Pending';
import Dashboard_InProcess from './Dashboard_InProcess';
import Dashboard_Rewards from './Dashboard_Rewards';
import AddButton from './AddButton';

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
        tabBarLabel : "Dashboard",
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
                        <Image style = {styles.topIconStyle} source = {require('../../Assets_icons/Topbar/Infoicon1x.png')} />
                    </TouchableOpacity>
                    <Text style = {styles.headingText}>Dashboard</Text>
                    <TouchableOpacity onPress = {this.OnNotificationPressed} >
                        <Image style = {styles.topIconStyle} source = {require('../../Assets_icons/Topbar/Notification1x.png')} />
                    </TouchableOpacity>
                </View>
                <View style = {styles.statsContainer}>
                    <View style = {styles.statsUpperTextContainer}>
                        <Text style = {styles.totalEarningsText}>Total Earnings</Text>
                        <Text style = {styles.amountText}>Rs 40,000</Text>
                    </View>
                    <View style = {styles.separatorStyle}></View>
                    <View style = {styles.statsLowerTextContainer}>
                        <View style = {styles.totalReferralsContainer}>
                            <Text style = {styles.referralsHeadingText}>Total Referrals</Text>
                            <Text style = {styles.totalReferralsText}>30</Text>
                        </View>
                        <View style = {styles.activeReferralsContainer}>
                            <Text style = {styles.referralsHeadingText}>Active Referrals</Text>
                            <Text style = {styles.activeReferralsText}>10</Text>
                        </View>
                    </View>
                </View>
                <View style = {styles.tabContainer} >
                    <Tabs>
                        <Dashboard_Pending title = "Pending"/>
                        <Dashboard_InProcess title= "InProcess"/>
                        <Dashboard_Rewards title = "Rewards" />
                    </Tabs>
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
        fontSize : 22,
        color : '#145370',
        fontWeight : "bold",
    },
    statsContainer : {
        marginTop : 15,
        borderRadius : 5,
        height : 180,
        width : window.width * 0.85,
        shadowOffset:{  width: 0,  height: 0,  },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        backgroundColor : '#0088C4',
    },
    tabContainer :{
        marginTop : 15,
    },
    statsUpperTextContainer : {
        
        padding : 15,
    },
    statsLowerTextContainer : {
        flex : 1,
        flexDirection : 'row',
        padding : 15,
    },
    totalEarningsText : {
        fontSize : 14,
        color : '#a9e1f1',
        textAlign : 'left',
    },
    amountText : {
        marginTop : 10,
        fontSize : 35,
        color : '#fff',
        textAlign : 'right',
        fontWeight : 'bold',
    },
    separatorStyle : {
        backgroundColor: '#0092c8',
        width: '100%', 
        height: 0.5,
    },
    totalReferralsContainer : {
        
    },
    activeReferralsContainer : {
        marginLeft : 12
    },
    pieChart : {

    },
    referralsHeadingText : {
        color : '#a9e1f1',
        fontSize : 14,
    },
    totalReferralsText : {
        color : '#a9e1f1',
        fontSize : 22,
    },
    activeReferralsText : {
        color : '#fff',
        fontSize : 22,
    },
});