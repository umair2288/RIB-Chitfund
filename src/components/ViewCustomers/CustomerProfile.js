import React, { Component } from 'react'
import {Col , Row , Divider, Button} from 'antd'
import customerStore from '../../store/CustomerStore'
import ProductList from './ProductList'



class CustomerProfile extends Component{

    state = {
        "is_edit_mode" : false,
        "avatar" : 'img/man.svg',
        "data": customerStore.getCustomer(this.props.CustomerID).pop()
   
        }
    

    render(){
        console.log(this.state)    
        return(
            <div>
            <Row> 
                <Col span={6} >
                    <div style={{backgroundColor:"Gray" , width:130 , height:130 }}>
                        <img alt = "profile_pic" src={this.state.data.profile_pic ? this.state.data.profile_pic:this.state.avatar} width={130} height={130} /> 
                    </div>

                </Col>
                <Col span={18}>
                    <ul>
                        <li>Full Name : {this.state.data.contact.FirstName + " " + this.state.data.contact.LastName}</li>
                        <li>NIC : {this.state.data.NIC} </li>
                        <li>Address : {this.state.data.contact.Address.No + ", " + this.state.data.contact.Address.Street + ", " + this.state.data.contact.Address.Town + "." }</li>
                        <li>Contact No : {this.state.data.contact.ContactNo }</li>
                        <li>Registered Date : {this.state.data.RegisteredDate} </li>
                    </ul>
                </Col>             
            </Row>
                <Divider></Divider>
            <Row>
                <ProductList CustomerID = {this.state.data.id}/>
            </Row>
            <Row style={{padding:"10px 0px"}} >
                <Col  span={3}> <Button  type="danger" ghost>Edit</Button></Col>
                <Col   span={3}> <Button type="danger" >Delete</Button></Col>
            </Row>

            </div>
           
        )
        
        
    }

}

export default CustomerProfile;