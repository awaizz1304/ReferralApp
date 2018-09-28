import React , {
    Component
} from 'react';
import {StyleSheet ,Platform ,Text ,View,Button, Image,TouchableOpacity,TextInput,FlatList,ActivityIndicator  } from 'react-native';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import ClientLayer from '../Components/Layers/ClientLayer';

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

export default class Referrals extends Component {
    arrayHolder = []
    constructor(props){
        super(props)
        this.state = {
            data : [],
            loadingData : false,
            refershing : false,
            page : 0,
            loadMoreData : false,
        }
        
    }
    static navigationOptions = {
        tabBarIcon : ({focused , tintColor}) => {
            imageSource = focused ? require('../../Assets_icons/Navbar/SelectedState/Referrals1x.png') : require('../../Assets_icons/Navbar/InactiveState/Referrals1x.png')
            return <Image source = {imageSource} />
        },
        tabBarButtonComponent: TouchableBounce,
        tabBarLabel : "Referrals",
    };
    componentDidMount (){
        this.GetReferrals()
        this.setState({loadingData : true})
    }
    GetReferrals () {
        ClientLayer.getInstance().getDataService().getAllReferrals((referralsData)=>{
            this.setState({data : this.state.page == 0 ? referralsData : [...this.state.data,...referralsData],
                loadingData : false,refershing : false,loadMoreData : false})
            this.arrayHolder = referralsData
        },(error)=>{
            this.setState({loadingData : false,refershing : false,loadMoreData : false})
        })
    }
    searchFilterFunction = text => {
        const newData = this.arrayHolder.filter(item => {
            const itemData = item.name

            const textData = text

            return itemData.indexOf(textData) > -1
        })
        this.setState({data : newData})
    }
    refershData = () => {
        this.setState ({
            loadingData : false,
            refershing : true,
        },() => {
            this.GetReferrals()
        })
    }

    loadMoreData = () => {
        
        this.setState({
            // page : this.state.page + 1,
            loadingData : false,
            refershing : false,
            loadMoreData : true,
        },() => {
            this.GetReferrals()
        })
    }

    renderListFooter = () => {
        return(
            <ActivityIndicator size = "small" />
        )
            
    }
    renderSeparator = () => {
        return (
          <View style = {styles.separatorStyles} />
        )
    }
    renderStatusBadge = (props) => {
        const status = props.status
        if(status == "Pending"){
            return(
                <View style = {styles.statusBadgePending}>
                    <Text style = {styles.pendingText}>Pending</Text>
                </View>
            )
        }
        else if (status == "In Process"){
            return(
                <View style = {styles.statusBadgeInProcess}>
                    <Text style = {styles.inProcessText}>In Process</Text>
                </View>
            )
        }
        else if(status == "Declined"){
            return(
                <View style = {styles.statusBadgeDeclined}>
                    <Text style = {styles.declinedText}>Declined</Text>
                </View>
            )
        }
        return(
            <View style = {styles.statusBadgePending}>
                <Text style = {styles.inProcessText}>Pending</Text>
            </View>
        )
    }
    renderList = (props) => {
        const isLoading = props.isLoading
        if(isLoading){
            return (
                <ActivityIndicator size = "large"/>
            )
        }
        return(
            <FlatList
                scrollsToTop = {false}
                data = {this.state.data}
                ItemSeparatorComponent = {this.renderSeparator}
                onRefresh = {this.refershData}
                refreshing = {this.state.refershing}
                onEndReached = {this.loadMoreData}
                onEndReachedThreshold = {0} // when scrolled to 0 pixels from bottom
                renderItem={({item}) =>
                <View style = {styles.rowContiner}>
                    <View style={styles.leftRowItemContainer}>
                        <View style = {styles.rowPhoto}></View>
                        <View style = {styles.rowItemTextContainer}>
                            <Text style={styles.rowNameText}>{item.name}</Text>
                            <Text style={styles.rowTimeText}>{item.time}</Text>
                        </View>
                    </View>
                    <this.renderStatusBadge status = {item.status} />
                </View>
                }
                keyExtractor={item => item.id.toString()}
            />
            
        )
        
    }
    render (){
        return(
            <View style = {styles.container}>
                <View style = {styles.topContainer}>
                    <View style = {styles.topIconsContainer}>
                        <TouchableOpacity onPress = {this.OnInfoPress} >
                            <Image style = {styles.topIconStyle} source = {require('../../Assets_icons/Topbar/Infoicon1x.png')} />
                        </TouchableOpacity>
                        <Text style = {styles.headingText}>Rewards</Text>
                        <TouchableOpacity onPress = {this.OnInfoPress} >
                            <Image style = {styles.topIconStyle} source = {require('../../Assets_icons/Topbar/Filters1x.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style = {styles.searchHeader}>
                    <TextInput style = {styles.searchInput}
                        placeholder = "Search"
                        onChangeText = {(text) => this.searchFilterFunction(text)}>
                        
                    </TextInput>
                    <Image style = {styles.searchImage} source = {require('../../Assets_icons/search1x.png')} />
                </View>
                
                <View style = {styles.listContainer}>
                    <this.renderList isLoading = {this.state.loadingData} />
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
        width : '100%',
        marginTop : window.height * 0.04,
        height : window.height * 0.075,
        shadowOffset:{  width: 0,  height: 5,  },
        shadowColor: 'black',
        backgroundColor : '#fff',
        shadowOpacity: 0.3,
        shadowRadius : 3,
        elevation : 3,
        alignItems : 'center',
        justifyContent: 'center',
    },
    topIconsContainer : {
        width : window.width * 0.9,
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
    listContainer : {
        flex : 1,
        marginTop : '7%',
        width : window.width * 0.9,
        justifyContent : 'center',
    },
    rowItemTextContainer : {
        marginLeft: 12,
        justifyContent : 'space-between',
    },
    leftRowItemContainer : {
        flex: 1,
        flexDirection: 'row',
        
    },
    rowContiner : {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
    },
    rowNameContainer : {
        flexDirection : "row",
    },
    rowNameText : {
        color : '#427085',
        fontSize: 16,
    },
    rowTimeText : {
        fontSize: 12,
        color : '#9CB2BE',
    },
    rowPhoto : {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor : '#D8D8D8',
    },
    statusBadgeInProcess : {
        width : 80,
        height : 30,
        marginTop : 2,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 30,
        borderColor : '#5ABCEB',
        borderWidth: 1,
    },
    inProcessText : {
        textAlign : 'center',
        color : '#5ABCEB',
        fontWeight : 'bold',
        fontSize : 12,
    },
    statusBadgePending : {
        width : 80,
        height : 30,
        marginTop : 2,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 30,
        borderColor : '#f49b4e',
        borderWidth: 1,
    },
    pendingText : {
        textAlign : 'center',
        color : '#f49b4e',
        fontWeight : 'bold',
        fontSize : 12,
    },
    statusBadgeDeclined : {
        width : 80,
        height : 30,
        marginTop : 2,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 30,
        borderColor : '#ff1428',
        borderWidth: 1,
    },
    declinedText : {
        textAlign : 'center',
        color : '#ff1428',
        fontWeight : 'bold',
        fontSize : 12,
    },
    rightRowItemTextContainer : {
        marginLeft : 12,
        justifyContent : 'space-between'
    },
    separatorStyles : {
        marginTop: 1,
        marginBottom: 1,
        backgroundColor: '#eff3f4',
        width: '100%', 
        height: 1
    },
    searchHeader : {
        marginTop : '5%',
    },
    searchInput :{
        height : 45,
        fontSize : 18,
        width : window.width * 0.9,
        shadowOffset:{  width: 2,  height: 5,  },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        borderRadius : 30,
        paddingLeft : '8%',
        // marginBottom : 20,
        backgroundColor : '#FFFFFF',
        shadowRadius : 4,
        elevation : 4,
    },
    searchImage : {
        position : "absolute",
        marginLeft : 5,
        marginTop : 45/4,
    }
});