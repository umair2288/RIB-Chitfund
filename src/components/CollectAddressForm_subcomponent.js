import React , {Component} from 'react'
import {Row ,Form , Input , Col} from 'antd'

class CollectAddress extends Component{

    constructor(){
        super();

    }

    render(){
       
        const { getFieldDecorator} = this.props.form;
       
        return(
            <div>
            <h4>Address</h4>
            <Row gutter={20}>
                        <Col span={6}>
                            <Form.Item label="No">
                                {getFieldDecorator('address_no', {
                                    rules: [{ required: true, message: 'Please Provide a Contact Number' }],
                                })(<Input  onChange={this.handleNameChange}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                        <Form.Item label="Street">
                            {getFieldDecorator('street', {
                                rules: [{ required: false, message: 'Please input the title of collection!' }],
                            })(<Input />)}
                        </Form.Item>
                        </Col>
                        <Col span={6}>
                        <Form.Item label="Town">
                            {getFieldDecorator('town', {
                                rules: [{ required: false, message: 'Please input the title of collection!' }],
                            })(<Input />)}
                        </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                    <Col span={6}>
                        <Form.Item label="District">
                            {getFieldDecorator('address_no', {
                                rules: [{ required: true, message: 'Please Provide a Contact Number' }],
                            })(<Input  onChange={this.handleNameChange}/>)}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                    <Form.Item label="GN Division">
                        {getFieldDecorator('street', {
                            rules: [{ required: false, message: 'Please input the title of collection!' }],
                        })(<Input />)}
                    </Form.Item>
                    </Col>
                    <Col span={6}>
                    <Form.Item label="DS Division">
                        {getFieldDecorator('town', {
                            rules: [{ required: false, message: 'Please input the title of collection!' }],
                        })(<Input />)}
                    </Form.Item>
                    </Col>
                </Row>
                </div>
        )
    }

}


 export default CollectAddress