import React , {
    Component
} from 'react';
import {StyleSheet ,Platform ,Text ,View,Button, Image,TouchableOpacity,TextInput, ScrollView  } from 'react-native';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import CustomTextInput from './UIComponents/CustomTextInput';
import { validateMobileNumber, validateEmail } from '../Components/Utilities/Validator';
import ReferDataModel from '../Components/Services/DataService/DataModels/ReferDataModel';
import ClientLayer from '../Components/Layers/ClientLayer';
import { Dialog, ProgressDialog } from 'react-native-simple-dialogs'

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

export default class Refer extends Component {
    canRefer = false
    constructor(props){
        super(props)
        this.state = {
            name : "awais",
            mobileNumber : "03425551334",
            email : "a@k.com",
            city : "Rawalpindi",
            invalidNameText : "",invalidMobileText: "",invalidEmailText: "",invalidCityText: "",
            showLoading : false,
            showDialoge : false,
            dialogeTitle : "",
            dialogeDescription : "",
        }
        
    }
    componentDidMount (){
        
    }
    OnClosePressed () {
        this.props.navigation.goBack()
    }
    OnReferPressed = () => {
        this.canRefer = true
        this.setState({invalidNameText:""})
        this.setState({invalidMobileText:""})
        this.setState({invalidEmailText:""})
        this.setState({invalidCityText:""})

        if(this.state.name == ""){
            this.canRefer = false
            this.setState({invalidNameText:"Enter a valid name"})
        }
        if(!validateMobileNumber(this.state.mobileNumber)){
            this.canRefer = false
            this.setState({invalidMobileText: "Enter a valid mobile number"})
        }

        if(!validateEmail(this.state.email)){
            this.canRefer = false
            this.setState({invalidEmailText: "Enter a valid email"})
        }

        if(this.state.city == ""){
            this.canRefer = false
            this.setState({invalidCityText: "Enter a valid city"})
        }

        if(this.canRefer){
            referDataModel = new ReferDataModel()
            referDataModel.name = this.state.name
            referDataModel.mobileNumber = this.state.mobileNumber
            referDataModel.email = this.state.email
            referDataModel.city = this.state.city
            this.setState({showLoading : true})
            ClientLayer.getInstance().getDataService().referFriend(this.referDataModel,()=>{
                this.nameInput.clear()
                this.mobileNumberInput.clear()
                this.emailInput.clear()
                this.cityInput.clear()
                this.setState({showLoading:false, showDialoge : true,dialogeTitle : "Success",dialogeDescription : "Referal Successful"})
            },(error)=>{
                this.setState({showLoading : false,showDialoge : true,dialogeTitle : "Error",dialogeDescription : error.description})
            })
        }
    }
    render (){
        return(
            <View style = {styles.backgroundContainer}>
                <View style = {styles.crossImageContainer}>
                    <TouchableOpacity onPress = {this.OnClosePressed.bind(this)}>
                        <View style = {styles.crossImage}>
                        </View>
                   </TouchableOpacity>
                </View>
                <View style = {styles.container}>
                    <View style = {styles.logoContainer}>
                        <Image styles = {styles.logoImage } source = {require('../../Assets_icons/AddReferral/Refer1x.png')}/>
                        <Text style = {styles.headingText}>Refer Now and Earn</Text>
                        <Text style = {styles.headingText}>rewards!</Text>
                    </View>
                    <View style = {styles.formContainer}>
                        <TextInput
                            style = {styles.input}
                            defaultValue = {this.state.name}
                            placeholder = "Referral's Name"
                            placeholderTextColor = "#42687C"
                            returnKeyType = "next"
                            autoCorrect = {false}
                            onSubmitEditing = {() => this.mobileNumberInput.focus()}
                            ref = {(input) => this.nameInput = input}
                            onChangeText = {(text) => this.setState({name : text})}
                            clearButtonMode = "unless-editing"
                        />
                        <View style = {styles.emptySpace}>
                            <Text style = {styles.invalidText}>{this.state.invalidNameText}</Text>
                        </View>
                        <TextInput
                            style = {styles.input}
                            placeholder = "Mobile No."
                            defaultValue = {this.state.mobileNumber}
                            placeholderTextColor = "#42687C"
                            returnKeyType = "next"
                            autoCorrect = {false}
                            onSubmitEditing = {() => this.emailInput.focus()}
                            ref = {(input) => this.mobileNumberInput = input}
                            onChangeText = {(text) => this.setState({mobileNumber : text})}
                            clearButtonMode = "unless-editing"
                        />
                        <View style = {styles.emptySpace}>
                            <Text style = {styles.invalidText}>{this.state.invalidMobileText}</Text>
                        </View>
                        <TextInput
                            style = {styles.input}
                            placeholder = "Email"
                            defaultValue = "a@k.com"
                            placeholderTextColor = "#42687C"
                            returnKeyType = "next"
                            keyboardType = "email-address"
                            autoCorrect = {false}
                            onSubmitEditing = {() => this.cityInput.focus()}
                            ref = {(input) => this.emailInput = input}
                            onChangeText = {(text) => this.setState({email : text})}
                            clearButtonMode = "unless-editing"
                        />
                        <View style = {styles.emptySpace}>
                            <Text style = {styles.invalidText}>{this.state.invalidEmailText}</Text>
                        </View>
                        <TextInput
                            style = {styles.input}
                            placeholder = "City"
                            defaultValue = "Rawalpindi"
                            placeholderTextColor = "#42687C"
                            returnKeyType = "go"
                            autoCorrect = {false}
                            ref = {(input) => this.cityInput = input}
                            onChangeText = {(text) => this.setState({city : text})}
                            clearButtonMode = "unless-editing"
                        />
                        <View style = {styles.emptySpace}>
                            <Text style = {styles.invalidText}>{this.state.invalidCityText}</Text>
                        </View>
                    </View>
                    <View style = {styles.loginButtonContainer}>
                        <TouchableOpacity style = {styles.loginButton} onPress = {this.OnReferPressed}>
                            <Text style = {styles.buttonText}>Refer</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <ProgressDialog
                    visible = {this.state.showLoading}
                    title = "Please Wait"
                    message = "Sending Request"
                />
                <Dialog
                    visible = {this.state.showDialoge }
                    title = {this.state.dialogeTitle}
                    onTouchOutside = {() => this.setState({showDialoge : false})}>
                    <View>
                        <Text style = {styles.dialogeText}>{this.state.dialogeDescription}</Text>
                        <TouchableOpacity onPress = {() => {
                            this.setState ({showDialoge : false});
                        }}>
                            <Text style = {styles.closePopupText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Dialog>

            </View>
        )
    }
}

const styles = StyleSheet.create ({
    backgroundContainer : {
        flex : 1,
        backgroundColor : '#fff',
        justifyContent : 'center',
        // alignItems : 'center',
    },
    crossImageContainer : {
        alignItems : 'flex-end',
        marginRight : '10%',
    },
    crossImage : {
        width : 30,
        height : 30,
        borderRadius : 15,
        backgroundColor : "#0093ca",
    },
    container : {
        justifyContent : 'space-between',
        width : '100%',
        height : window.height * 0.8,
        alignItems : 'center',
        backgroundColor : '#fff',
    },
    logoContainer : {
        alignItems : 'center',
        justifyContent : 'center'
    },
    logoImage : {
        width : 100,
        height : 100,
    },
    headingText : {
        textAlign : 'center',
        fontSize : 20,
        color : '#145370',
        fontWeight : "bold",
    },
    formContainer : {

    },
    input : {
        height : 50,
        width : window.width * 0.8,
        shadowOffset:{  width: 2,  height: 5,  },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        borderRadius : 30,
        // marginBottom : 20,
        backgroundColor : '#FFFFFF',
        shadowRadius : 8,
        elevation : 8,
    },
    loginButtonContainer :{
        marginTop : 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButton : {
        height : 50,
        borderRadius : 30,
        width : window.width * 0.8,
        backgroundColor : '#2A81BB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText : {
        textAlign : 'center',
        fontWeight : '700',
        color : '#ffffff',
        fontSize : 20,
    },
    invalidText : {
        color : 'red',
        marginLeft : 20,
    },
    emptySpace : {
        height : 20,
    },
    closePopupText : {
        marginTop : 15,
        fontSize : 16,
        textAlign : 'center',
        fontWeight : '700',
    },
    dialogeText : {
        marginTop : 2,
        textAlign : 'center',
    },
});