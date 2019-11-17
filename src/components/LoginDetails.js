import React,{Component} from 'react'
import {Avatar ,Typography ,Button , Row ,Col} from 'antd'
import titleStore from './../store/TitleStore'
import dispatcher from '../dispatcher/dispatcher';
import authStore from '../store/AuthStore';

const {Title} = Typography;



class LoginDetails extends Component{

    constructor(){
        super();
        this.state ={
            title : titleStore.getTitle(),
            user: "",
            authStore : authStore.initialState
        }
    }

    handleClick = () => {
        console.log("hi")
    }

    handleLogout = () =>{
        dispatcher.dispatch({type : "LOGOUT"})
    }

    componentWillMount(){
        authStore.on('update',()=>{
            this.setState({authStore:authStore.initialState})
        })

        titleStore.on('change',()=>{
            this.setState({title:titleStore.getTitle()})
        })

    }
    
    


    render(){

        const {profile} = this.state.authStore

        return(
            <div>
                <Row>
                    <Col span={10}>
                        <Title  level={4} style={{display:"inline" , textAlign:"left"}}> {this.state.title} </Title>
                    </Col>

                    <Col style={{textAlign:"right"}} span={14}>
                        <div style={{textAlign:"right", display:"inline"}} >
                            <div style={{cursor:"pointer" , display:"inline"}}>
                                <Avatar onClick={this.handleClick}  shape = "square" style={{backgroundColor:"red" , marginRight:"10px" , cursor:"pointer"}} src="img/login_icon.png" />
                                <span >Hi, {profile.Contact.FirstName} </span>
                            </div>   
                            <Button type="danger" ghost style={{margin:"5px"}} onClick={this.handleLogout}>Logout</Button>                   
                        </div>
                    </Col>
                </Row>
    
            </div>
        )
    }


}


export  default LoginDetails;