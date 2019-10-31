import React , {Component} from 'react'
import Home from './HomeComponent'
import LoginPage from './Authentication/LoginPage'
import authStore from '../store/AuthStore';
import dispatcher from '../dispatcher/dispatcher';
import { Spin, Icon } from 'antd';

class MainComponent extends Component
{
    state = {
        authStore : authStore.initialState
    }

    componentWillMount () {
        authStore.on('update',()=>{
            this.setState({authStore:authStore.initialState})
        })
        dispatcher.dispatch({type:"AUTO_CHECK_STATE"})
    }

    render(){
        const {token,loading} = this.state.authStore
        return !loading ? token == null ? <LoginPage/> : <Home token={token}/> : <div style = {{display:'flex',width:'100vw',justifyContent:'center',height:'100vh',alignItems:'center'}}><Spin indicator = {<Icon type = "loading" />}  spinning tip="Loading..." size="large" delay={0} /></div>
          
    }
}

export default MainComponent