import React from 'react'
import { Table, Button } from 'antd';
import productStore from '../../store/ProductsStore';
import dispatcher from '../../dispatcher/dispatcher';

class DeletedCategories extends React.Component {
    
    state = {
        productStore : productStore.initialState
    }

    componentWillMount () {
        productStore.on('update',()=>{
            this.setState({productStore:productStore.initialState})
        })
        dispatcher.dispatch({type:"FETCH_ALL_CATEGORIES"})
    }

    onRestore = (id) => {
        dispatcher.dispatch({
            type : "UPDATE_CATEGORY",
            id,
            value : {
                is_current : true
            }
        })
    }

    render(){
        let categories = []
        for (let category of this.state.productStore.categories){
            if(!category.is_current){
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
                render : (category) => <Button type = "primary" onClick = {()=>this.onRestore(category.id)} >Edit</Button>
            },
            {
                render : (category) => <Button type = "primary" onClick = {()=>this.onRestore(category.id)} >Restore</Button>
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

export default DeletedCategories