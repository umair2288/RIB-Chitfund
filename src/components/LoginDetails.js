import React,{Component} from 'react'
import {Avatar ,Typography ,Button , Row ,Col} from 'antd'

const {Title} = Typography;



class LoginDetails extends Component{

    constructor(){
        super();
        this.state ={
            title : "Add Customer"
        }
    }

    handleClick = () => {
        console.log("hi")
    }

    


    render(){


        return(
            <div>
                <Row>
                    <Col span={10}>
                        <Title level={4} style={{display:"inline" , textAlign:"left"}}> {this.state.title} </Title>
                    </Col>

                    <Col style={{textAlign:"right"}} span={14}>
                        <div style={{textAlign:"right", display:"inline"}} >
                            <div style={{cursor:"pointer" , display:"inline"}}>
                                <Avatar onClick={this.handleClick}  shape = "square" style={{backgroundColor:"red" , marginRight:"10px" , cursor:"pointer"}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                <span >Hi, Umair! </span>
                            </div>   
                            <Button style={{margin:"5px"}}>Logout</Button>                   
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }


}


export  default LoginDetails;