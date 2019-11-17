import React, { Component } from 'react'
import * as titleActions from '../../Actions/TitleActions'
import {Table, Drawer} from 'antd'

class ViewSales extends Component {
 
    // constructor(){
    //     super()
    // }

    state = {
        data:[]
    }

    componentDidMount(){
        titleActions.changeTitle("View Sales")
    }

    




   
    columns = [
            {
                title: 'Invoice',
                dataIndex: 'invoice',
                key: 'invoice',
              },   
              
              {
                title: 'Product ID',
                dataIndex: 'product_id',
                key: 'productId',
              },  
    
              {
                title: 'Payment Status',
                dataIndex: 'paymentStatus',
                key: 'paymentStatus',
              },   
    
    
    
        ]    


  




    render(){
        return (
            <div>
            <Table columns={this.columns} pagination={{ pageSize: 10 }}  dataSource={this.state.data} size="small" /> 
            <Drawer
                title="Instalment Plan"
                placement="right"
                width= {600}
                destroyOnClose
                closable={true}
                onClose={this.onClose}
                visible={this.state.drawer_visible}
              >
              {/* <InstalmentPlan InstalmentPlanID={this.state.InstalmentPlanID}/> */}
          </Drawer>
          </div>
        )
    }
}

export default ViewSales;
