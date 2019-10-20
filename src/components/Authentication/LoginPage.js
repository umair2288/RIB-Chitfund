import React, {Component} from 'react'
import {Form} from 'antd'
import Login from './Login'



class LoginPage extends Component
{
    // constructor(){
    //     super()
    // }
    
    render(){
        const LoginWrap = Form.create({ name: 'normal_login' })(Login);
        return (
            <div>
            <LoginWrap/>
            </div>
        )
    }
}

export default  LoginPage