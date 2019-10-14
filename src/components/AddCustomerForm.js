import React,{Component} from 'react'
import {Form ,InputNumber, Input , Row , Col , Divider} from 'antd'
import CollectContact from './CollectContactForm_subcomponent'
import VerifyNIC from './VerifyNIC'

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
            } 

        )



    }

    render(){
       
        return (

            <div>
                <Form>
                    <VerifyNIC form={this.props.form}/>
                    <Divider />
                    <CollectContact form={this.props.form}></CollectContact>
                </Form>
            </div>
        )
    }


}


export default AddCustomerForm