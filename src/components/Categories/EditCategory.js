import React from 'react'
import { Form, Input, Button } from 'antd';
import productStore from '../../store/ProductsStore';
import dispatcher from '../../dispatcher/dispatcher';


class EditCategory extends React.Component {

    componentWillMount () {
        console.log(this.props)
        this.category = productStore.getCategory(this.props.match.params.catId)
    }
    render(){
        return (
            this.category != null ? 
            <Form onSubmit = {
                (e) => {
                    e.preventDefault()
                    dispatcher.dispatch({type : "UPDATE_CATEGORY",id : this.category.id,value : this.state})}
            } >
                <Form.Item label = "Title" >
                    <Input defaultValue = {this.category.title} name = "title" onChange = {(e)=>this.setState({[e.target.name] : e.target.value})} />
                </Form.Item>
                <Form.Item >
                    <Button type = "primary" htmlType = {"submit"} >Update</Button>
                </Form.Item>
            </Form>
            :

            <div style = {{display:'flex',justifyContent:'center'}} >
                Sorry Category Not Found!!!
            </div>
    
        )
    }
}

export default EditCategory