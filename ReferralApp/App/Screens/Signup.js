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
        const {actions} = this.props
        actions.ScreenChanged('Signup')
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

        if(!this.canSignUp){
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
            <KeyboardAvoidingView style = {styles.container}>
                <View style = {styles.logoContainer}>
                    <Text style = {styles.headingText}>Sign Up</Text>
                </View>
                <View style = {styles.signupForm}>
                    <TextInput
                        style = {styles.input}
                        placeholder = "Name"
                        placeholderTextColor = "#42687C"
                        returnKeyType = "next"
                        autoCorrect = {false}
                        onSubmitEditing = {() => this.mobileNumberInput.focus()}
                        ref = {(input) => this.nameInput = input}
                        onChangeText = {(text) => this.setState({name : text})}

                    />
                    <Text style = {styles.invalidText}>{this.state.invalidNameText}</Text>
                    <TextInput 
                        style = {styles.input}
                        placeholder = "Mobile No."
                        placeholderTextColor = "#42687C"
                        returnKeyType = "next"
                        keyboardType = "number-pad"
                        autoCorrect = {false}
                        onSubmitEditing = {() => this.emailInput.focus()}
                        ref = {(input) => this.mobileNumberInput = input}
                        onChangeText = {(text) => this.setState({mobileNumber : text})}
                    />
                    <Text style = {styles.invalidText}>{this.state.invalidMobileText}</Text>
                    <TextInput
                        style = {styles.input}
                        placeholder = "Email"
                        placeholderTextColor = "#42687C"
                        returnKeyType = "next"
                        keyboardType = "email-address"
                        autoCorrect = {false}
                        onSubmitEditing = {() => this.cityInput.focus()}
                        ref = {(input) => this.emailInput = input}
                        onChangeText = {(text) => this.setState({email : text})}
                    />
                    <Text style = {styles.invalidText}>{this.state.invalidEmailText}</Text>
                    <TextInput
                        style = {styles.input}
                        placeholder = "City"
                        placeholderTextColor = "#42687C"
                        returnKeyType = "next"
                        autoCorrect = {false}
                        onSubmitEditing = {() => this.passwordInput.focus()}
                        ref = {(input) => this.cityInput = input}
                        onChangeText = {(text) => this.setState({city : text})}
                    />
                    <Text style = {styles.invalidText}>{this.state.invalidCityText}</Text>
                    <TextInput
                        style = {styles.input}
                        placeholder = "Password"
                        placeholderTextColor = "#42687C"
                        returnKeyType = "go"
                        secureTextEntry = {true}
                        autoCorrect = {false}
                        ref = {(input) => this.passwordInput = input}
                        onChangeText = {(text) => this.setState({password : text})}
                    />
                    <Text style = {styles.invalidText}>{this.state.invalidPassText}</Text>
                </View>
                <View style = {styles.signupButtonContainer}>
                    <TouchableOpacity style = {styles.signupButton} onPress = {this.OnSignUpPressed}>
                        <Text style = {styles.signUpButtonText}>SIGNUP</Text>
                    </TouchableOpacity>
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
            </KeyboardAvoidingView>

            
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    logoContainer : {
        marginTop : window.height * 0.06,
        
    },
    input :{
        height : 60,
        width : window.width * 0.8,
        shadowOffset:{  width: 0,  height: 0,  },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        borderRadius : 30,
        // marginBottom : 25,
        backgroundColor : '#FFFFFF',
    },
    headingText :{
        fontSize: 20,
        color: '#23536E',
        textAlign: "center",
    },
    signupForm : {
        marginTop : 60,
        alignItems : 'center',
    },
    signupButtonContainer :{
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupButton :{
        height : 60,
        borderRadius : 30,
        width : window.width * 0.8,
        backgroundColor : '#2A81BB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    invalidText : {
        marginBottom : 15,
        color : '#FF0000'
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
});