import React from 'react'
import { Form, Input, Button, Spin } from 'antd';
import dispatcher from '../../dispatcher/dispatcher';
import productStore from '../../store/ProductsStore';


class AddCategory extends React.Component {

    state = {
        productStore : productStore.initialState
    }

    componentWillMount () {
        productStore.on('update',()=>{
            this.setState({productStore:productStore.initialState})
        })
    }
    render(){
        return (
            <Spin spinning = {this.state.productStore.loading}>
            <Form id = {"category-add-form"} onSubmit = {
                (e) => {
                    e.preventDefault()
                    dispatcher.dispatch({type : "ADD_CATEGORY",value : this.state})
                    document.getElementById('category-add-form').reset()
                }
            } >
                <Form.Item label = "Title" >
                    <Input placeholder = "Category Title" name = "title" required onChange = {(e)=>this.setState({[e.target.name] : e.target.value})} />
                </Form.Item>
                <Form.Item >
                    <Button type = "primary" htmlType = {"submit"} >Add Category</Button>
                </Form.Item>
            </Form>
            </Spin>
        
    
        )
    }
}

export default AddCategory