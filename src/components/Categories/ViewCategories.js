import React from 'react'
import { Table, Button } from 'antd';
import productStore from '../../store/ProductsStore';
import dispatcher from '../../dispatcher/dispatcher';

class ViewCategories extends React.Component {
    
    state = {
        productStore : productStore.initialState
    }

    componentWillMount () {
        productStore.on('update',()=>{
            this.setState({productStore:productStore.initialState})
        })
        dispatcher.dispatch({type:"FETCH_ALL_CATEGORIES"})
    }

    onDelete = (id) => {
        dispatcher.dispatch({
            type : "UPDATE_CATEGORY",
            id,
            value : {
                is_current : false
            }
        })
    }

    onEdit = (id) => {
        this.props.history.push("/category/"+id)
    }

    render(){
        let categories = []
        for (let category of this.state.productStore.categories){
            if(category.is_current){
                categories.push(category)
            }
        }
        const columns = [
            {
                title : "ID",
                dataIndex : "id"
            },
            {
                title : "Title",
                dataIndex : "title"
            },
            {
                render : (category) => <Button type = "primary" onClick = {()=>this.onEdit(category.id)} >Edit</Button>
            },
            {
                render : (category) => <Button type = "danger" onClick = {()=>this.onDelete(category.id)} >Delete</Button>
            }
        ]

        return(
            <Table
                columns = {columns}
                dataSource = {categories}
            />
        )
    }
}

export default ViewCategories