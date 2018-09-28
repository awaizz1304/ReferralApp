import React , {
    Component
} from 'react';
import {StyleSheet,Platform ,Text ,View,Button, Image, TouchableOpacity, FlatList, TextInput,ActivityIndicator  } from 'react-native';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import ClientLayer from '../Components/Layers/ClientLayer';
import { SearchBar } from "react-native-elements";

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

export default class Rewards extends Component {
    arrayHolder = []
    constructor(props){
        super(props)
        this.state = {
            data : [],
            loadingData : false,
            refreshing : false,
            loadMoreData : false,
            page : 0,
        }
    }
    static navigationOptions = {
        tabBarIcon : ({focused , tintColor}) => {
            imageSource = focused ? require('../../Assets_icons/Navbar/SelectedState/Fill11x.png') : require('../../Assets_icons/Navbar/InactiveState/Rewards1x.png')
            return <Image source = {imageSource} />
        },
        tabBarButtonComponent: TouchableBounce,
        tabBarLabel : "Rewards",
    };
    componentDidMount (){
        this.setState({loadingData : true})
        console.log("componentDidMount rewads")
        this.GetRewards()
    }
    GetRewards () {
        ClientLayer.getInstance().getDataService().getRewards((rewardsData)=>{
            this.setState({data : this.state.page == 0 ? rewardsData : [...this.state.data,rewardsData],
                loadingData : false,refreshing : false,loadMoreData : false})
            this.arrayHolder = rewardsData
        },(error)=>{
            this.setState({loadingData : false,refreshing : false,loadMoreData : false})
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
    refreshList = () => {
        this.setState({
            refreshing : true,
            loadingData : false,
        },()=>{
            this.GetRewards()
        })
    }
    loadMoreData = () => {
        
        this.setState({
            page : this.state.page + 1,
            loadingData : false,
            refershing : false,
            loadMoreData : true,
        },() => {
            this.GetRewards()
        })
    }
    renderHeader = () => {
        return (
            <SearchBar
                inputContainerStyle = {styles.searchInput}
                placeholder = "Search"
                lightTheme
                round
                onChangeText = {(text) => this.searchFilterFunction(text)}
            />
        )
    }
    renderSeparator = () => {
        return (
          <View style = {styles.separatorStyles} />
        )
    }
    renderBadgeImage (props) {
        const level = props.level
        if(level == "Gold"){
            return(
                <Image style = {styles.badgeImage} 
                    source = {require('../../Assets_icons/Medals/GoldMedal1x.png')}>
                </Image>
            )
        }
        else if(level == "Silver"){
            return(
                <Image style = {styles.badgeImage} 
                    source = {require('../../Assets_icons/Medals/SilverMedal1x.png')}>
                </Image>
            )
        }
        else if(level == "Platinium"){
            return(
                <Image style = {styles.badgeImage} 
                    source = {require('../../Assets_icons/Medals/Platinummedal1x.png')}>
                </Image>
            )
        }
        return(
            <Image style = {styles.badgeImage} 
                source = {require('../../Assets_icons/Medals/GoldMedal1x.png')}>
            </Image>
        )
    }
    
    renderList = (props) => {
        const isLoading = props.isLoading
        if(isLoading){
            return (
                <ActivityIndicator size = "large"/>
            )
        }
        return (
            <FlatList 
                scrollsToTop = {false}
                data = {this.state.data}
                ItemSeparatorComponent = {this.renderSeparator}
                onRefresh = {this.refreshList}
                refreshing = {this.state.refreshing}
                onEndReached = {this.loadMoreData}
                onEndReachedThreshold = {0}
                renderItem={({item}) =>
                <View style = {styles.rowContiner}>
                <View style={styles.leftRowItemContainer}>
                    
                    <this.renderBadgeImage level = {item.level} />
                    
                    <View style = {styles.rowItemTextContainer}>
                        <View style = {styles.rowNameContainer}>
                        <Text style={styles.initialText}>for Refering </Text>
                        <Text style={styles.rowNameText}>{item.name} </Text>
                        </View>
                        <Text style={styles.rowLevelText}>{item.level}</Text>
                        <View style = {styles.rowSystemContainer}>
                        <Text style={styles.initialText}>System: </Text>
                        <Text style={styles.rowSystemText}>{item.system}</Text>
                        </View>
                    </View>
                </View>
                <View style = {styles.rightRowItemContainer}>
                    <View style = {styles.rightRowItemTextContainer}> 
                        <Text style = {styles.rowTimeText}>{item.time}</Text>
                        <Text style = {styles.prizeText}>Rs {item.prize}</Text>
                    </View>
                </View>
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
                    <TouchableOpacity onPress = {this.OnInfoPress} >
                        <Image style = {styles.topIconStyle} source = {require('../../Assets_icons/Topbar/Infoicon1x.png')} />
                    </TouchableOpacity>
                    <Text style = {styles.headingText}>Rewards</Text>
                    <View></View>
                </View>
                <View style = {styles.statsContainer}>
                    <Text style = {styles.totalEarningsText}>Total</Text>
                    <Text style = {styles.amountText}>Rs 40,000</Text>
                </View>
                <View style = {styles.searchHeader}>
                    <TextInput style = {styles.searchInput}
                        placeholder = "Search"
                        onChangeText = {(text) => this.searchFilterFunction(text)}>
                        
                    </TextInput>
                    <Image style = {styles.searchImage} source = {require('../../Assets_icons/search1x.png')} />
                </View>
                
                <View style = {styles.listContainer}>
                    <this.renderList isLoading = {this.state.loadingData}/>
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
    statsContainer : {
        marginTop : 15,
        borderRadius : 5,
        height : 150,
        width : window.width * 0.9,
        shadowOffset:{  width: 0,  height: 0,  },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        backgroundColor : '#0088C4',
        justifyContent : "center",
        alignItems : "center",
    },
    listContainer : {
        flex : 1,
        marginTop : '7%',
        width : window.width * 0.9,
        justifyContent : 'center',
    },
    totalEarningsText : {
        fontSize : 14,
        color : '#a9e1f1',
        textAlign : 'left',
    },
    amountText : {
        marginTop : 5,
        fontSize : 35,
        color : '#fff',
        textAlign : 'right',
        fontWeight : 'bold',
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
    rowLevelText : {
        fontSize: 12,
        color : '#9CB2BE',
        fontWeight : "bold",
    },
    rowSystemContainer : {
        flexDirection : "row",
    },
    rowSystemText : {
        fontSize: 12,
        color : '#0063a0',
    },
    rowPhoto : {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor : '#D8D8D8',
    },
    rightRowItemContainer : {
        flexDirection : 'row',
        marginTop : 2,
    },
    rightRowItemTextContainer : {
        marginLeft : 12,
        justifyContent : 'space-between'
    },
    prizeText : {
        color : '#0085bf',
        fontSize : 18,
        fontWeight : "bold",
    },
    rowTimeText : {
        fontSize: 12,
        color : '#9CB2BE',
        textAlign : 'right',
    },
    initialText : {
        fontSize: 12,
        color : '#9CB2BE',
    },
    badgeImage : {
        
    },
    separatorStyles : {
        marginTop: 1,
        marginBottom: 1,
        backgroundColor: '#eff3f4',
        width: '100%', 
        height: 1
    },
    searchHeader : {
        marginTop : '7%',
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
        shadowRadius : 8,
        elevation : 8,
    },
    searchImage : {
        position : "absolute",
        marginLeft : 5,
        marginTop : 45/4,
    }
});