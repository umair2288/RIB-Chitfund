import React , {Component, Fragment} from 'react'
import * as titleActions from '../../Actions/TitleActions'
import {Table, Row, Button , Col, Modal} from 'antd'
import {connect} from 'react-redux'
import { fetchCustomerGroups , fetchCustomers, createCustomerGroup, addCustomersToGroup } from '../../redux/customer/actionCreators'
import GroupDetails from './GroupDetails'
import CustomerList from './CustomerList'
import { fetchProducts } from '../../redux/product/actions/actionCreators'

class CustomerGroup extends Component {

    state = {
        showAddNewGroupModel:false,
        group_details :{
            name : ""
        },
        showAddCustomersModel:false,
        addCustomerModelDetails:{}
    }

    componentDidMount(){
        titleActions.changeTitle("Customer Groups")
        this.props.fetchCustomerGroups()
        this.props.fetchCustomers()
        this.props.fetchProducts()
    }


    addCustomersToList = (list) =>{
        this.setState(prevState=>
                ({
                    addCustomerModelDetails:{
                        ...prevState.addCustomerModelDetails,
                        customers:list
                    }
                }) , () => console.log(this.state)
        )
    }


    nestedTable = (rowData) =>{
        const  columns = [
           {
               id:1,
               dataIndex:"id",
               title: "ID"
           }
           ,
           {
               id:2,
               dataIndex:"NIC",
               title: "NIC"
           },
           {
               id:1,
               dataIndex:"name",
               title:"Name"
    
           }
           ]
        
           const data = this.props.customers.filter(
               (customer) => {
                   for (const id of rowData.customers){
                       if (id === customer.id){
                           return true
                       }         
                   }
                   return false
               }
           )
    
           const formatTableData = () => {
    
             return  data.map(
                   (data,index) => (
                       {
                           key:index,
                           id:data.id,
                           NIC: data.NIC,
                           name: data.contact.FirstName + " " + data.contact.LastName
                       }
                   )
               )   
           }
    
           return (
               <Table columns={columns} dataSource={formatTableData()}/>
           )
    
       }

    handleClick = (event) => {
        console.log(event.target)
        switch(event.target.name){
            case "btn_add_new_group":{
                this.setState({
                    showAddNewGroupModel:true
                })
                break;
            }
        }}

    handleOk = () => {
        this.props.createCustomerGroup(this.state.group_details)
        this.setState({
            showAddNewGroupModel:false
        })
    }

    handleCancel = () => {
        this.setState({
            showAddNewGroupModel:false
        })
    }

    handleChange = (event) => {
        switch(event.target.name){
            case "group_name_input":{
                this.setState({
                    group_details: {
                        name : event.target.value
                    }
                })
            }
            default :{
                break;
            }
        }
    }


    onProductChange = (product_id) => {
        this.setState((prevState)=>({
            group_details: {
                ...prevState.group_details,
                product : product_id
            }
        }),()=> console.log(this.state))
    }


    handleAddCustomerToGroup = (group_id) => {
        console.log(group_id)
        this.setState({
            showAddCustomersModel:true,
            addCustomerModelDetails:{
                group_id : group_id
            }
        })
    }

    handleAddSaleToGroup = (group_id) =>{
        console.log(group_id)
    }

    handleOkAddCustomers = () => {
        console.log(this.state.addCustomerModelDetails)
        this.props.addCustomersToGroup(this.state.addCustomerModelDetails)
        this.setState({
            showAddCustomersModel:false
        })
       
    }

    onSelectChange = (value) => {
        console.log(value)
        this.setState((prevState)=>({
            addCustomerModelDetails:{
                ...prevState.addCustomerModelDetails,
                customer_id : value
            }
        }),()=>console.log(this.state))
    }

    formatTableData = () => {
     return   this.props.customerGroups.map(
            (group,index)=>{
              
               const  product = this.props.products.filter (
                   product =>{
                       return product.id === group.product
                   }
               )
        
            return  {
                key:index,
                ...group,
                group:  {
                  id :  group.id,
                  is_locked : group.is_locked
                },
                memberCount: group.customers.length,
                product : product[0] && product[0].title 
                }
            })

    }

    render(){
     const  columns = [
            {
                id:1,
                dataIndex:"id",
                title:"Group ID"
            },
            {
                id:2,
                dataIndex:"name",
                title:"Group Name"
            },
            {
                id:3,
                dataIndex:"memberCount",
                title:"No Of Members"
            },
            {
                id:4,
                dataIndex:"product",
                title:"Product"
            },
            {
                id:5,
                key:"add_customer",
                dataIndex:"group",
                title:"",
                render : (group) => <Button disabled={group.is_locked} onClick={()=> this.handleAddCustomerToGroup(group.id)}>Add Customer to Group</Button>
            },
            {
                id:6,
                kye:"add_sale",
                dataIndex:"group",
                title:"",
                render : (group) => <Button onClick={() => this.handleAddSaleToGroup(group.id)}  >Add Sale</Button>
            }


        ]


        return (
            <div>       
                <Row>
                    <Col offset={20} span={4}>
                        <Button name = "btn_add_new_group" onClick = {this.handleClick}>Add New Group</Button>
                    </Col>
                </Row>
                <Row> 
                    <Table 
                        columns={columns} 
                        dataSource={this.formatTableData()}
                        expandedRowRender={this.nestedTable}  
                        loading= {this.props.loading}                     
                        >
                    </Table>
                </Row>          
                <Modal
                    title="Add New Group"
                    visible={this.state.showAddNewGroupModel}
                    onOk = {this.handleOk}
                    onCancel = {this.handleCancel}
                    >
                    <GroupDetails onProductChange={this.onProductChange} details={this.state.group_details} handleChange={this.handleChange}/>
                </Modal>
                <Modal
                    title={`Add Customer To Group ${this.state.addCustomerModelDetails.group_id}` }
                    visible={this.state.showAddCustomersModel}
                    onOk = {this.handleOkAddCustomers}
                    onCancel = {()=>this.setState({showAddCustomersModel:false , addCustomerModelDetails:{}},()=>console.log(this.state))}
                    >
                    {
                        this.state.showAddCustomersModel && <CustomerList addCustomersToList={this.addCustomersToList} group_id={this.state.addCustomerModelDetails.group_id}/>                
                    }    
                    </Modal>
            </div>
            )
    }
}                                                           

const mapStateToProps = state => {
    return {
        customerGroups : state.customer.customerGroups,
        customers: state.customer.customers,
        loading : state.customer.loading,
        products: state.product.products
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        fetchCustomerGroups : () => dispatch(fetchCustomerGroups()),
        fetchCustomers: () => dispatch(fetchCustomers()),
        createCustomerGroup : (group) =>  dispatch(createCustomerGroup(group)),
        addCustomersToGroup : (group) => dispatch(addCustomersToGroup(group)),
        fetchProducts : () => dispatch(fetchProducts())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomerGroup)