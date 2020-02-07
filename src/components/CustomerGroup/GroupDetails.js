import React, { Component } from 'react'
import { Form, Input, Row, Col, message } from 'antd'
import ProductCascader from '../GeneralComponents/ProductCascader'

class GroupDetails extends Component {



    onProductChange = (value) => {
        if(value.length > 1){
            this.props.onProductChange(value[1])
        }else{
            message.error("Oops! it's seems like a product category, Select a product please!")
        }
    
    }

    render() {
        return (
            <div>
                <Form>
                    <Row gutter={10}>
                        <Col span={12}>
                            <Form.Item label="Group Name" labelAlign="right">
                                <Input name="group_name_input" value={this.props.details.name} onChange={this.props.handleChange}></Input>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Product" labelAlign="right">
                                <ProductCascader onChange={this.onProductChange} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default GroupDetails