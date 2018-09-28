import React , {
    Component
} from 'react';
import {StyleSheet ,Platform ,Text ,View ,Button, Image, TextInput, TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { validateEmail } from '../Components/Utilities/Validator';
import { Dialog,ProgressDialog } from 'react-native-simple-dialogs';
import ClientLayer from '../Components/Layers/ClientLayer';
import LoginDataModel from '../Components/Services/Authentication/DataModels/LoginDataModel';
import { NavigationActions } from 'react-navigation';
import {connect} from 'react-redux';
import CheckBox from 'react-native-check-box'
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');



class Login extends Component {
    loginData = null
    canLoginIn = false
    constructor(props){
        super(props)

        this.state = {
            email : "a@k.com",
            password : "1234567",
            dialogueVisible : false,
            errorDescription : "",
            errorMessage : "",
            showLoading : false,
            invalidEmailText : "" , invalidPassText : "",
            rememberMe : false,
        }
        this.OnLoginPressed = this.OnLoginPressed.bind(this);
    }
    componentDidMount (){
        // const {actions} = this.props
        // actions.ScreenChanged('Home')
        const {navigation} = this.props
    }

    OnLoginPressed = () => {


        emailText = this.state.email
        passwordText = this.state.password
        if(validateEmail(emailText)){
            if(passwordText == ""){
                this.setState({invalidEmailText : "Password can't be empty"})
                return
            }
            this.setState({showLoading:true})
            this.loginData = new LoginDataModel()
            this.loginData.email = emailText;
            this.loginData.password = passwordText;
            ClientLayer.getInstance().getAuthService().Login(this.loginData,()=>{
                this.setState({showLoading:false})
                this.props.navigation.navigate('Home')
            },(error)=>{
                this.setState({showLoading:false})
            })
        }
        else{
            this.setState({invalidEmailText : "Enter a valid email"})
        }
    }
    OnSignUpPressed = () =>{
        this.props.navigation.navigate('Signup')
    }
    OnRememberMePressed = () => {
        this.setState({rememberMe : !this.state.rememberMe})
    }
    OnForgotPasswordPressed = () => {

    }
    renderCheckBox = (props) => {
        const isChecked = props.isChecked
        if(isChecked)
        {
            return <Image style = {styles.checkBox} source = {require('../../Assets_icons/checkBoxChecked.png')}/>
        }
        else{
            return <Image style = {styles.checkBox} source = {require('../../Assets_icons/checkBoxUnchecked.png')}/>
        }
    }
    render (){
        return(
            <TouchableWithoutFeedback onPress = {Keyboard.dismiss} accessible = {false}>
            <View style = {styles.backgroudContainer}>
                <View style = {styles.container}>
                <View style = {styles.logoContainer}>
                    <Image 
                        style = {styles.logo} 
                        source = {require('../../Assets_icons/LoginScreen/SELogo1x.png')} 
                    />
                    <Text style = {styles.headingText}>Referral App</Text>
                </View>
                <View style = {styles.formContainer}>
                    <TextInput
                        defaultValue = "a@k.com"
                        style = {styles.input}
                        placeholder = "Email"
                        returnKeyType = "next"
                        keyboardType = "email-address"
                        autoCorrect = {false}
                        onSubmitEditing = {()=> this.passwordInput.focus()}
                        ref = {(input) => this.emailInput = input}
                        onChangeText = {(text) => this.setState({email : text})}
                        clearButtonMode = "unless-editing"
                    />
                    <View style = {styles.emptySpace}>
                        <Text style = {styles.invalidText}>{this.state.invalidEmailText}</Text>
                    </View>
                    <TextInput
                        defaultValue = "123456"
                        style = {styles.input}
                        secureTextEntry = {true}
                        placeholder = "Password"
                        returnKeyType = "go"
                        ref = {(input) => this.passwordInput = input}
                        onChangeText = {(text) => this.setState({password : text})}
                        clearButtonMode = "unless-editing"
                    />
                    {/* <View style = {styles.emptySpace}> */}
                        {/* <Text style = {styles.invalidText}>{this.state.invalidPassText}</Text> */}
                    {/* </View> */}
                </View>
                <View style = {styles.forgotPassAndRememberContainer}>
                    <View style = {styles.rememberMeContainer}>
                        <TouchableOpacity onPress = {this.OnRememberMePressed}>
                            <this.renderCheckBox isChecked = {this.state.rememberMe} />
                        </TouchableOpacity>
                        <Text style = {styles.rememberMeText}>Remember Me</Text>
                    </View>
                    <Text style = {styles.forgotPassText}>Forgot pasword?</Text>
                </View>
                <View style = {styles.loginButtonContainer}>
                    <TouchableOpacity style = {styles.loginButton} onPress = {this.OnLoginPressed}>
                        <Text style = {styles.loginText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.signupContiner}>
                    <Text style = {styles.noAccountText}>
                        Dont have an account?</Text>
                    <TouchableOpacity onPress = {()=>this.props.navigation.navigate('Signup')}>
                        <Text style = {styles.signupText}> Signup</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style = {styles.fbLoginButtonContainer}>
                    <View style = {styles.fbloginButtonInnerContainer} onPress = {this.OnLoginPressed}>
                        <Image source = {require('../../Assets_icons/LoginScreen/FBlogo1x.png')}/>
                        <Text style = {styles.loginText}>Login with facebook</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.googleLoginButtonContainer}>
                    <View style = {styles.googleloginButtonInnerContainer} onPress = {this.OnLoginPressed}>
                        <Image source = {require('../../Assets_icons/LoginScreen/Gmaillogo1x.png')}/>
                        <Text style = {styles.loginText}>Login with google</Text>
                        <View></View>
                    </View>
                </TouchableOpacity>
                <ProgressDialog
                    visible = {this.state.showLoading}
                    title = "Please Wait"
                    message = "Sending Request"
                />
                <Dialog
                    visible = {this.state.dialogueVisible}
                    title = {this.state.errorMessage}
                    onTouchOutside = {() => this.setState({dialogueVisible : false})}>
                    <View>
                        <Text style = {styles.errorText}>{this.state.errorDescription}</Text>
                        <TouchableOpacity onPress = {() => {
                            this.setState ({dialogueVisible : false});
                        }}>
                            <Text style = {styles.closePopupText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Dialog>
                </View>
            </View>
            </TouchableWithoutFeedback>
        )
    }

}
const mapStateToProps = state => ({
    
});
const mapDispatchToProps = dispatch => ({
    
});
// export default connect (mapStateToProps,mapDispatchToProps)(Login)
export default Login
const styles = StyleSheet.create({
    backgroudContainer : {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent : 'center',
    },
    container: {
      alignItems : 'center',
      justifyContent : 'space-between',
      width : '100%',
      height : window.height * 0.85,
      backgroundColor : '#fff',
    },
    logoContainer : {
        alignItems : 'center',
        justifyContent : 'center'
    },
    logo : {
        width : 100,
        height : 100,
    },
    formContainer : {
        marginTop : 10,
        padding : 20,
        
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
    forgotPassAndRememberContainer : {
        width : window.width * 0.8,
        flexDirection : 'row',
        justifyContent : 'space-between',
    },
    rememberMeContainer : {
        width : window.width * 0.3,
        flexDirection : 'row',
        justifyContent : 'space-between',
    },
    rememberMeText : {
        color : '#8ba3ae',
        fontSize : 13,
    },
    forgotPassText : {
        color : '#214f63',
        fontSize : 14,
    },
    fbLoginButtonContainer : {
        height : 50,
        borderRadius : 30,
        width : window.width * 0.8,
        backgroundColor : '#2a3a71',
        justifyContent: 'center',
        alignItems: 'center',
    },
    googleLoginButtonContainer : {
        height : 50,
        borderRadius : 30,
        width : window.width * 0.8,
        backgroundColor : '#f02f2e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonContainer :{
        marginTop : 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection : 'row',
    },
    loginButton : {
        height : 50,
        borderRadius : 30,
        width : window.width * 0.8,
        backgroundColor : '#2A81BB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fbloginButtonInnerContainer : {
        width : window.width * 0.5,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection : 'row',
    },
    googleloginButtonInnerContainer : {
        width : window.width * 0.5,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection : 'row',
    },
    loginText : {
        textAlign : 'center',
        fontWeight : '700',
        color : '#ffffff',
    },
    errorText : {
        marginTop : 2,
        textAlign : 'center',
    },
    closePopupText : {
        marginTop : 15,
        fontSize : 16,
        textAlign : 'center',
        fontWeight : '700',
    },
    signupContiner : {
        flexDirection : 'row',
        marginTop : 5,
        alignItems : 'center',
        justifyContent: 'center',
    },
    noAccountText : {
        textAlign : 'center',
        color : '#8ba3ae',
        fontSize : 15,
    },
    signupText : {
        color : '#214f63',
        fontSize : 15,
        fontWeight : 'bold',
    },
    invalidText : {
        color : 'red',
        marginLeft : 25,
    },
    emptySpace : {
        height : 20,
    },
    headingText : {
        marginTop : 10,
        textAlign : 'center',
        fontSize : 28,
        color : '#145370',
    },
    checkBox : {
        width : 15,
        height : 15,
    }
  });