import React , {
    Component
} from 'react';
import {StyleSheet,Platform ,Text ,View,Button, Image, TouchableOpacity,FlatList,ActivityIndicator  } from 'react-native';
import ClientLayer from '../Components/Layers/ClientLayer';

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

export default class Dashboard_Rewards extends Component{
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
    componentDidMount () {
        this.setState({loadingData : true})
        this.GetDashboardRewards()
    }
    GetDashboardRewards () {
        ClientLayer.getInstance().getDataService().getDashboardRecords("rewards",(dashBoardData)=>{
            this.setState({data : this.state.page == 0 ? dashBoardData : [...this.state.data,dashBoardData],
                loadingData : false,loadMoreData : false,refershing : false})
        },(error)=>{
            this.setState({loadingData : false,loadMoreData : false,refershing : false})
        })
    }
    refreshList = () => {
        this.setState({
            refreshing : true,
            loadingData : false,
        },()=>{
            this.GetPendingDashboardData()
        })
    }
    loadMoreData = () => {
        this.setState({
            // page : this.state.page + 1,
            loadingData : false,
            refershing : false,
            loadMoreData : true,
        },() => {
            this.GetPendingDashboardData()
        })
    }
    
    renderSeparator = () => {
        return (
          <View style = {styles.separatorStyles} />
        )
    }
    renderBadgeImage (props) {
        const badgeName = props.badgeName
        if(badgeName == "Bronze"){
            return(
                <Image style = {styles.badgeImage} 
                    source = {require('../../Assets_icons/Dashboard/Bronzemedalsmall1x.png')}>
                </Image>
            )
        }
        else if(badgeName == "Silver"){
            return(
                <Image style = {styles.badgeImage} 
                    source = {require('../../Assets_icons/Dashboard/Silvermedalsmall1x.png')}>
                </Image>
            )
        }
    }
    renderList = (props) => {
        const isLoading = props.isLoading
        if(isLoading){
            return(
                <ActivityIndicator size = "large" />
            )
        }
        return(
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
                    <View style = {styles.rowPhoto}></View>
                    <View style = {styles.rowItemTextContainer}>
                        <Text style={styles.rowNameText}>{item.name}</Text>
                        <Text style={styles.rowTimeText}>{item.time}</Text>
                    </View>
                </View>
                <View style = {styles.rightRowItemContainer}>
                    <this.renderBadgeImage badgeName = {item.badge}/>
                    <View style = {styles.rightRowItemTextContainer}> 
                        <Text style = {styles.prizeText}>Rs {item.prize}</Text>
                        <Text style = {styles.bageText}>{item.badge}</Text>
                    </View>
                </View>
                </View>
                
                }
                keyExtractor={item => item.id.toString()}
            />
        )
        
    }
    render(){
        return(
            <View style = {styles.container}>
                <this.renderList isLoading = {this.state.loadingData} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 0.55,                            
        // justifyContent: 'center',                    
        backgroundColor: '#fff',
        justifyContent : 'center',    
    },
    rowItemTextContainer : {
        marginLeft: 12,
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
    rightRowItemContainer : {
        flexDirection : 'row',
        marginTop : 2,
    },
    rightRowItemTextContainer : {
        marginLeft : 12,
    },
    prizeText : {
        color : '#0085bf',
        fontSize : 18,
        fontWeight : "bold",
    },
    bageText : {
        fontSize: 12,
        color : '#9CB2BE',
        textAlign : 'right',
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
});