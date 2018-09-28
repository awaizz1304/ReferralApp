import React , {
    Component
} from 'react';
import {StyleSheet,Platform ,Text ,View,Button, Image, TouchableOpacity,FlatList,ActivityIndicator,ScrollView  } from 'react-native';
import ClientLayer from '../Components/Layers/ClientLayer';

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

export default class Dashboard_InProcess extends Component{
    constructor(props){
        super(props)
        this.state = {
            data : [],
            loadingData : false,
            refershing : false,
            loadMoreData : false,
            page : 0,
        }
    }
    componentDidMount () {
        this.GetInProcessDashboardData()
        this.setState({loadingData : true})
    }
    GetInProcessDashboardData () {
        ClientLayer.getInstance().getDataService().getDashboardRecords("inprocess",(dashBoardData)=>{
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
            this.GetInProcessDashboardData()
        })
    }
    loadMoreData = () => {
        this.setState({
            // page : this.state.page + 1,
            loadingData : false,
            refershing : false,
            loadMoreData : true,
        },() => {
            this.GetInProcessDashboardData()
        })
    }

    renderRowItem = (item) => {
        return (
            <View style = {styles.rowContiner}>
                <View style = {styles.rowPhoto}></View>
                <View style = {styles.rowItemTextContainer}>
                    <Text style = {styles.rowNameText}>
                        {item.name}
                    </Text>
                    <Text style = {styles.rowTimeText}>
                        30 min
                    </Text>
                </View>
            </View>
        )
    }
    renderSeparator = () => {
        return (
          <View style = {styles.separatorStyles} />
        )
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
                refreshing = {this.state.refershing}
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
                    <Text style = {styles.inProcessText}>In Process</Text>
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
        backgroundColor: '#fff',
        justifyContent : 'center',
    },
    listContainer : {
        flex : 1,
        marginTop : '7%',
        width : window.width * 0.9,
        justifyContent : 'center',
    },
    rowItemTextContainer : {
        marginLeft: 12,
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
        width : 120,
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
    },
    separatorStyles : {
        marginTop: 1,
        marginBottom: 1,
        backgroundColor: '#eff3f4',
        width: '100%', 
        height: 1
    },
});