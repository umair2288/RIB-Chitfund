import React ,{Component} from 'react'
import LoginUI from './LoginUI'
import {Form} from 'antd'



class Login extends Component{

    constructor(){
        super()
    }

    handleSubmit = () => {
        console.log("hi")
    }

    render(){
        return(

            <LoginUI onSubmit={this.handleSubmit} form={this.props.form}></LoginUI>
        )
    }

    

}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm