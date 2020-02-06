import React , {Component} from 'react'
import { Input, Form, Row, Col, Select, Button, message } from 'antd'
import { connect } from 'react-redux'
import {fetchCustomers , fetchCustomerGroups} from '../../redux/customer/actionCreators'
import { fetchProductPieces } from '../../redux/product/actions/actionCreators'
import {addSale , fetchSales} from '../../redux/sales/actions/actionCreators'
import * as titleAction from '../../Actions/TitleActions'
import SalesTable from './SalesTable'


const {Option}  = Select

class GroupSales extends Component{

    state = {
        group_id : this.props.match.params.id,
        group:{id:null , customers:[]},
        customers : [],
        customer_ids : []
    }


    componentDidMount(){
        this.props.fetchCustomers()
        this.props.fetchCustomerGroups()
        this.props.fetchProductPieces()
        this.props.fetchSales()
        this.filterCustormers(this.state.group_id)
        titleAction.changeTitle("Group Sales")
    }


   
    handleChange = (e) => {
        e.preventDefault()
        switch(e.target.name){
            case "group_id":{
                this.setState({
                    group_id : e.target.value
                }, () => {
                    console.log(this.state)
                     this.setState({
                        customers:this.filterCustormers(this.state.group_id).customers,
                    } , () => console.log(this.state))
                   // this.filterCustormers(this.state.group_id)
                })
                break;
            }
            case "product_pc_id":{
                this.setState(
                    {
                        pp_id: e.target.value
                    }
                )
                break ;
            }
        }
    }

    
    
    filterCustormers = (group_id) => {
        const customerGroup = this.props.customerGroups.filter(
                (group) => {
                    return group.id === parseInt(group_id)
                }
            ).pop()
        console.log(customerGroup)
        if (customerGroup){
            const customer_ids = customerGroup.customers
            const customers = this.props.customers.filter(
                (customer) => {
                    return customer_ids.includes(customer.id)
                }
            )  
            
            
            return  {
                        customers:customers,
                        customer_ids :customer_ids
                    }   
        }

        return  {
            customers:[],
            customer_ids :[]
        }   
   
    }


    onCustomerSelectChange = (value) => {
        this.setState({
            customer_id:value
        }, () => console.log(this.state))
    }



    handleSubmit = (event) => {
        event.preventDefault()
        var group = this.props.customerGroups.filter(
           (customerGroup) => {
               return customerGroup.id  === parseInt(this.state.group_id)
           }
        ).pop()
           
       if(group){
           var product = group.product;
           var pp =  this.props.productPieces.productPieces.filter(
               pp => {
                   return pp.item_code === this.state.pp_id
               }
           ).pop()

           if(pp){
                if(pp.batch.product.id === product){
                    message.success("adding sale to customer")
                    const data = {
                        customer : this.state.customer_id,
                        order_lines : [
                            {
                                "product" : pp.id,
                                "unit_price":parseFloat(pp.sell_price),
                                "discount_amount":0,
                                "quantity":1
  	                        }
                        ],
                        customer_group: this.state.group_id,
                        amount: parseFloat(pp.sell_price)
                    }
                    this.props.addSale(data)
                }else{
                    message.error(`Product Piece is not valid,You can add ${pp.batch.product.title} only`)
                }

           }else{
               message.error("Invalid Product code, this product not available in chit fund warehouse")
           }
       }
        
    }



    render(){
        return (
            <div>
                <Row gutter={20}>
                <Col >
                <Form onSubmit={this.handleSubmit}>
                  
                        <Col span={6}>
                            <Form.Item label="Group ID">
                                <Input name="group_id" disabled={this.props.match.params.id} onChange={this.handleChange} value={this.state.group_id}></Input>
                            </Form.Item>
                        </Col>
                   
                        <Col span={6}>
                            <Form.Item label="Customer">
                               <Select onChange={this.onCustomerSelectChange}>
                                   {
                                       this.filterCustormers(this.state.group_id).customers.map(
                                           (customer,index) =>{
                                           return ( <Option key={index} value={customer.id}>
                                                    {customer.contact.FirstName + " " + customer.contact.LastName + "-" + customer.NIC }
                                               
                                               </Option> )
                                           }
                                       )
                                   }
                               </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Product Piece ID">
                               <Input name="product_pc_id" onChange={this.handleChange}  value={this.state.pp_id}></Input>
                            </Form.Item>
                        </Col>    
                        <Col span={6} style={{paddingTop:43}}>
                            <Button htmlType="submit" type="primary"> Add Sale</Button>
                        </Col>            
                </Form>
                </Col>
               
                </Row>
                <Row>
                <Col >
                    <h3>Group Sales Details</h3>
                    {  this.state.customer_ids && <SalesTable group_id={this.state.group_id} customer_ids={this.state.customer_ids}></SalesTable> }
                </Col>
                </Row>
        </div>
        )
    }

}

const mapDispatchToProps = dispatch =>{
    return{
        fetchCustomers : () => dispatch(fetchCustomers()),
        fetchCustomerGroups : () => dispatch(fetchCustomerGroups()),
        fetchProductPieces : () => dispatch(fetchProductPieces()),
        addSale: (saleData) => dispatch(addSale(saleData)),
        fetchSales : () => dispatch(fetchSales())
    }
}

const mapStateToProps = state => {
    return {
        customers : state.customer.customers,
        customerGroups : state.customer.customerGroups,
        productPieces : state.productPieces,
        loading : state.customer.loading
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(GroupSales)