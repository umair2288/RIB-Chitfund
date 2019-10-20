import React , {Component} from 'react'
import Home from './HomeComponent'
import LoginPage from './Authentication/LoginPage'

class MainComponent extends Component
{
    

    render(){

        const token = window.localStorage.token
        return typeof(token)==="undefined" ? <LoginPage/>:<Home token={token}/>
          
    }
}

export default MainComponent