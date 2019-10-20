import React , {Component} from 'react'
import {Row ,Form , Input , Col , Divider} from 'antd'
import CollectAddress from './CollectAddressForm_subcomponent'

class CollectContact extends Component{

    


    updateContact = (address_id) => {
        console.log("i'm creating contact with address_id " + address_id)
        this.props.callback(2)
    }

    render(){
       
        const { getFieldDecorator} = this.props.form;
       
        return(
            <div>
            <h4> Personal Details</h4>
            <Row gutter={20}>
                        <Col span={6}>
                            <Form.Item label="Firstname">
                                {getFieldDecorator('firstname', {
                                    rules: [{ required: true, message: 'Firstname is required' }],
                                })(<Input  onChange={this.handleNameChange}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Lastname">
                                {getFieldDecorator('lastname', {
                                    rules: [{ required: true, message: 'Lastname is Requier' }],
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Prefered Name">
                                {getFieldDecorator('prefered name', {
                                    rules: [{ required: false, message: 'Please provide a prefered name' }],
                                })(<Input />)}
                            </Form.Item>
                        </Col>           
                    </Row>
                    <Row gutter={20}>
                        <Col span={6}>
                            <Form.Item label="Contact No">
                                {getFieldDecorator('phone_number', {
                                    rules: [{ required: true, message: 'Please Provide a Contact Number' }],
                                })(<Input  onChange={this.handleNameChange}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                        <Form.Item label="Mobile">
                            {getFieldDecorator('mobile_number', {
                                rules: [{ required: false, message: 'Please input the title of collection!' }],
                            })(<Input />)}
                        </Form.Item>
                        </Col>
                    </Row>
                    <Divider/>
                    
                    <CollectAddress form={this.props.form} callback={this.updateContact}></CollectAddress>    
                </div>
        )
    }

}


 export default CollectContact