import React,{Component} from 'react'
import { Table } from 'antd';
import * as titleActions from '../../Actions/TitleActions'
import * as customerActions from '../../Actions/CustomerActions'
import customerStore from '../../store/CustomerStore'


class ViewCustomers extends Component{
    constructor(){
        super()
        this.state={
            data : []
        }
    }

    formatTableData(customer){
        return {
            key: customer.id,
            nic: customer.NIC,
            name: customer.contact.FirstName + " " + customer.contact.LastName,
            contact: customer.contact.ContactNo,
            address:    customer.contact.Address.No + "," +
                        customer.contact.Address.Street + ',' + 
                        customer.contact.Address.Town
        }
    }

    


    componentDidMount(){
        titleActions.changeTitle("Customers")  
        customerActions.updateCustomers() //fetching data and updates the store

        customerStore.on('update',()=>{
            const customers =  customerStore.getAllCustomers()
            const tableData = customers.map(this.formatTableData)
            this.setState({data:tableData})
        })
        
               
    
    } 
    
    columns = [
        {
          title: 'NIC',
          dataIndex: 'nic',
          key: 'nic',
          render: text => <span>{text}</span>,
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
            title: 'Contact No',
            dataIndex: 'contact',
            key: 'contact',
          },   
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },    
      ];

    render(){
        return (
            <Table columns={this.columns} dataSource={this.state.data} size="small" />  
        )
    }
}

export default ViewCustomers;