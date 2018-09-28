import React , {
    Component
} from 'react';
import {StyleSheet ,Platform ,Text ,View ,Button, TextInput, TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import { validateEmail, validatePassword, validateMobileNumber } from '../Components/Utilities/Validator';
import { Dialog, ProgressDialog } from 'react-native-simple-dialogs';
import ClientLayer from '../Components/Layers/ClientLayer';
import SignUpDataModel from '../Components/Services/Authentication/DataModels/SignUpDataModel';

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

export default class Signup extends Component {
    canSignUp = false
    signUpDataModel = null
    constructor(props){
        super(props)
        this.state = {
            name : "",
            mobileNumber : "",
            email: "",
            city : "",
            password : "",
            invalidNameText : "",invalidMobileText: "",invalidEmailText: "",invalidCityText: "",invalidPassText: "",
            showLoading : false,
            showDialoge : false,
            errorMessage : "",
            errorDescription : "",
        };
    }
    componentDidMount (){
        // const {actions} = this.props
        // actions.ScreenChanged('Signup')
    }
    
    OnSignUpPressed = () => {
        this.canSignUp = true
        this.setState({invalidNameText:""})
        this.setState({invalidMobileText:""})
        this.setState({invalidEmailText:""})
        this.setState({invalidCityText:""})
        this.setState({invalidPassText:""})

        if(this.state.name == ""){
            this.canSignUp = false
            this.setState({invalidNameText:"Enter a valid name"})
        }
        if(!validateMobileNumber(this.state.mobileNumber)){
            this.canSignUp = false
            this.setState({invalidMobileText: "Enter a valid mobile number"})
        }

        if(!validateEmail(this.state.email)){
            this.canSignUp = false
            this.setState({invalidEmailText: "Enter a valid email"})
        }

        if(this.state.city == ""){
            this.canSignUp = false
            this.setState({invalidCityText: "Enter a valid city"})
        }


        if(!validatePassword(this.state.password)){
            this.canSignUp = false
            this.setState({invalidPassText: "Password must contain 5 characters"})
        }

        if(this.canSignUp){
            // Signup here
            this.setState({showLoading:true})
            this.signUpDataModel = new SignUpDataModel()
            this.signUpDataModel.name = this.state.name
            this.signUpDataModel.mobileNumber = this.state.mobileNumber
            this.signUpDataModel.email = this.state.email
            this.signUpDataModel.city = this.state.city
            this.signUpDataModel.password = this.state.password
            ClientLayer.getInstance().getAuthService().SignUp(this.signUpDataModel,()=>{
                this.setState({showLoading:false})
            },(error)=>{
                this.setState({showLoading : false,showDialoge : true,errorMessage : "Error",errorDescription : error.description})
            })
        }
    }

    render (){
        return(
            <View style = {styles.backgroundContainer}>
                
                <View style = {styles.container}>
                    <View style = {styles.headingTextContainer}>
                        <Text style = {styles.headingText}>Sign Up</Text>
                    </View>
                    <View style = {styles.formContainer}>
                        <TextInput
                            style = {styles.input}
                            defaultValue = {this.state.name}
                            placeholder = "Name"
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
                            defaultValue = {this.state.email}
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
                            defaultValue = {this.state.city}
                            placeholderTextColor = "#42687C"
                            returnKeyType = "next"
                            autoCorrect = {false}
                            ref = {(input) => this.cityInput = input}
                            onChangeText = {(text) => this.setState({city : text})}
                            clearButtonMode = "unless-editing"
                        />
                        <View style = {styles.emptySpace}>
                            <Text style = {styles.invalidText}>{this.state.invalidCityText}</Text>
                        </View>
                        <TextInput
                            style = {styles.input}
                            placeholder = "Password"
                            defaultValue = {this.state.password}
                            placeholderTextColor = "#42687C"
                            returnKeyType = "go"
                            autoCorrect = {false}
                            secureTextEntry = {true}
                            ref = {(input) => this.passwordInput = input}
                            onChangeText = {(text) => this.setState({password : text})}
                            clearButtonMode = "unless-editing"
                        />
                        <View style = {styles.emptySpace}>
                            <Text style = {styles.invalidText}>{this.state.invalidPassText}</Text>
                        </View>
                    </View>
                    <View style = {styles.signUpButtonContainer}>
                        <TouchableOpacity style = {styles.signUpButton} onPress = {this.OnSignUpPressed}>
                            <Text style = {styles.signUpButtonText}>Signup</Text>
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
                    title = {this.state.errorMessage}
                    onTouchOutside = {() => this.setState({showDialoge : false})}>
                    <View>
                        <Text style = {styles.errorText}>{this.state.errorDescription}</Text>
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
const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent : 'center',
    },
    container : {
        justifyContent : 'space-between',
        width : '100%',
        height : window.height * 0.8,
        alignItems : 'center',
        backgroundColor : '#fff',
    },
    formContainer : {

    },
    input :{
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
        paddingLeft : 10,
    },
    headingTextContainer : {
        alignItems : 'center',
    },
    headingText :{
        fontSize: 20,
        color: '#23536E',
        textAlign: "center",
    },
    signUpButtonContainer :{
        marginTop : 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpButton : {
        height : 50,
        borderRadius : 30,
        width : window.width * 0.8,
        backgroundColor : '#2A81BB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    invalidText : {
        color : 'red',
        marginLeft : 20,
    },
    signUpButtonText :{
        textAlign : 'center',
        fontWeight : '700',
        color : '#ffffff',
    },
    closePopupText : {
        marginTop : 15,
        fontSize : 16,
        textAlign : 'center',
        fontWeight : '700',
    },
    errorText : {
        marginTop : 2,
        textAlign : 'center',
    },
    emptySpace : {
        height : 20,
    },
});