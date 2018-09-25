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
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');



class Login extends Component {
    loginData = null
    constructor(props){
        super(props)

        this.state = {
            email : "a@k.com",
            password : "1234567",
            dialogueVisible : false,
            errorDescription : "",
            errorMessage : "",
            showLoading : false,
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
                this.setState({dialogueVisible:true,errorMessage:"Empty Password",errorDescription : "Password can't be empty"})
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
            this.setState({dialogueVisible:true,errorMessage:"Inavlid Email",errorDescription : "Please enter a valid email"})
        }
    }
    OnSignUpPressed = () =>{
        this.props.navigation.navigate('Signup')
    }
    render (){
        return(
            <TouchableWithoutFeedback onPress = {Keyboard.dismiss} accessible = {false}>
            <View style = {styles.container}>
                <View style = {styles.logoContainer}>
                    <Image 
                        style = {styles.logo} 
                        source = {require('../Assets/152.png')} 
                    />
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
                    />
                    <TextInput
                        defaultValue = "123456"
                        style = {styles.input}
                        secureTextEntry = {true}
                        placeholder = "Password"
                        returnKeyType = "go"
                        ref = {(input) => this.passwordInput = input}
                        onChangeText = {(text) => this.setState({password : text})}
                    />
                </View>
                <View style = {styles.loginButtonContainer}>
                    <TouchableOpacity style = {styles.loginButton} onPress = {this.OnLoginPressed}>
                        <Text style = {styles.loginText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.signupContiner}>
                    <Text style = {styles.noAccountText}>
                        Dont have an account?</Text>
                    <TouchableOpacity onPress = {()=>this.props.navigation.navigate('Page2Screen')}>
                        <Text>Signup</Text>
                    </TouchableOpacity>
                </View>
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
    container: {
      flex: 1,
      backgroundColor: '#3894db',
    },
    logoContainer : {
        marginTop : window.height * 0.15,
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
        alignItems : 'center',
    },
    input :{
        height : 60,
        width : window.width * 0.8,
        shadowOffset:{  width: 0,  height: 0,  },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        borderRadius : 30,
        marginBottom : 20,
        backgroundColor : '#FFFFFF',
    },
    loginButtonContainer :{
        marginTop : 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButton : {
        height : 60,
        borderRadius : 30,
        width : window.width * 0.8,
        backgroundColor : '#2A81BB',
        justifyContent: 'center',
        alignItems: 'center',
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
    }
  });