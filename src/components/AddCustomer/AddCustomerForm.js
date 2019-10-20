import React,{Component} from 'react'
import {Form , Divider, Button,Row,Col} from 'antd'
import CollectContact from './CollectContactForm_subcomponent'
import VerifyNIC from '../VerifyNIC'
import * as titleActions from '../../Actions/TitleActions'
import * as customerActions from '../../Actions/CustomerActions'

class AddCustomerForm extends Component{

    constructor(){
        super();
        this.state={
            "Customer":{
                "firstName" : "",
                "lastName" : ""
            }
        }
    }

    handleNameChange = () =>{
        this.setState(
            {
                "Customer":{
                    "firstName" : this.props.value,
                    "lastName" : ""
                }
            })
    }

    componentDidMount(){
        titleActions.changeTitle("Add Customer")
    }

    handleClick = ()=>{
            //collect all details from form
            customerActions.addCustomer()

            //dispatch add cutomer actioon
    }

    addCustomer = (contact_id)=>{
        console.log('adding customer' + contact_id)  
        this.contact_id = contact_id    
    }

    addCustomer_2= (nic,bd) =>{
        console.log("i'm called from verify nic" + nic+ " " + bd + " ", this.contact_id )
    }

    render(){
       
        return (
            <div>
                <Form>
                    <VerifyNIC form={this.props.form} callback={this.addCustomer_2}/>
                    <Divider />
                    <CollectContact form={this.props.form} callback={this.addCustomer}></CollectContact>
                    <Row gutter={20}>
                        <Col span={6} offset={15}>
                        <Button onClick={this.handleClick}>Add Customer</Button>
                        </Col>
                    </Row>
                   {/* <div style={{"textAlign":"Right",'paddingRight':'250px', "backgroundColor":"gray"}}> <Button>Add Customer</Button> </div> */}
                </Form>
            </div>
        )
    }


}


export default AddCustomerForm