import React,{Component} from 'react'
import {Avatar ,Typography ,Button , Row ,Col} from 'antd'
import keys from './../keys'
import titleStore from './../store/TitleStore'

const {Title} = Typography;



class LoginDetails extends Component{

    constructor(){
        super();
        this.state ={
            title : titleStore.getTitle(),
            user: ""
        }
    }

    handleClick = () => {
        console.log("hi")
    }

    handleLogout = () =>{
        window.localStorage.removeItem("token")
        window.location.reload(true)
    }

    componentDidMount(){

        //compare props
        const url = keys.server + "/user/get-user-profile/"
        console.log("token " + window.localStorage.token)
        fetch(url,{
            method:"POST",
            headers : {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization' : "token " + window.localStorage.token
            }
        })
        .then(response => response.json())
        .then(result => {
            this.setState(prevState => ({
                'title' : prevState.title,
                'user' : result.data.Contact.PreferedName
            }))
            
            }
            )
        .catch(error => console.log(error))
            
        titleStore.on("change", () => {
            this.setState(prevState =>(
                {
                    "title": titleStore.getTitle(),
                    "user": prevState.user
                }
            ) )
        })
    }
    
    


    render(){


        return(
            <div>
                <Row>
                    <Col span={10}>
                        <Title  level={4} style={{display:"inline" , textAlign:"left"}}> {this.state.title} </Title>
                    </Col>

                    <Col style={{textAlign:"right"}} span={14}>
                        <div style={{textAlign:"right", display:"inline"}} >
                            <div style={{cursor:"pointer" , display:"inline"}}>
                                <Avatar onClick={this.handleClick}  shape = "square" style={{backgroundColor:"red" , marginRight:"10px" , cursor:"pointer"}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                <span >Hi, {this.state.user} </span>
                            </div>   
                            <Button style={{margin:"5px"}} onClick={this.handleLogout}>Logout</Button>                   
                        </div>
                    </Col>
                </Row>
    
            </div>
        )
    }


}


export  default LoginDetails;