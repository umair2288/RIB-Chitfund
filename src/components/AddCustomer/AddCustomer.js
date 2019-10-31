import React,{Component} from 'react'
import {Row,Col,Button} from 'antd'
import AddCustomerForm from './AddCustomerForm'
import * as customerActions from '../../Actions/CustomerActions'
//mport customerStore from '../../store/CustomerStore'
//import Customer from '../../Classes/Customer'



class AddCustomer extends Component{

    constructor(){
        super()
        this.state = {
            "NIC": "",
            "DOB": "",
            "Gender": "",
        //    "LastModified": null,
        //    "RegisteredDate": null,
            "User": null,
            "RegisteredByEmployee": null,
            "AlternativeContact": null,
            "Referee": null,
            "BillingAddress": null,
            "contact": {
                "FirstName": "",
                "LastName": "",
                "PreferedName": "",
                "ContactNo": "",
                "MobileNo": "",
                "Email": 'dummy@email.com',
                "Address": {
                    "No": "",
                    "Street": "",
                    "Town": "",
                    "District": "",
                    "GSDivision": null,
                    "DSDivision": null,
                    "Longitude": null,
                    "Latitude": null
                }
            }
           
        }
    }


    handleClick = ()=>{
        console.log(this.state)
        customerActions.addCustomer(this.state)
    }

    updateState = (newState) =>{
        
        this.setState(newState , () =>{
            console.log(this.state)
        })
    

    }


    render(){
        return (
        <div>
            <AddCustomerForm form={this.props.form} prevState={this.state} callback={this.updateState} updateState={this.updateState}></AddCustomerForm>
            <Row gutter={20}>
                <Col span={6} offset={15}>
                    <Button onClick={this.handleClick}>Add Customer</Button>
                </Col>
            </Row>
        </div>
        )
    }
}



export default AddCustomer
