import React , {Component} from 'react'
import {Table} from 'antd'



class ProductList extends Component{

    state = {
        data:[]
    }

    columns = [
        {
          title: 'ProductID',
          dataIndex: 'product',
          key: 'product',
    
        },
        {
            title: 'Invoice',
            dataIndex: 'address',
            key: 'address',
        }, 
        {
            title: 'Payment Status',
            dataIndex: 'payment',
            key: 'payment',
          },   
     
      ];

    render(){
        return(
            <div>
                <h3>Sales Data</h3>
                <Table columns={this.columns} pagination={{ pageSize: 10 }}  dataSource={this.state.data} size="small" /> 
            </div>
        )
            
    }
}

export default ProductList;