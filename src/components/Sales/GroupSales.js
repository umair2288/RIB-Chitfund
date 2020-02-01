import React , {Component} from 'react'
import { Input, Form, Row, Col, Select, Button } from 'antd'
import { connect } from 'react-redux'
import {fetchCustomers , fetchCustomerGroups} from '../../redux/customer/actionCreators'
import { fetchProductPieces } from '../../redux/product/actions/actionCreators'


const {Option}  = Select

class GroupSales extends Component{

    state = {
        group_id : this.props.match.params.id,
        group:{id:null}
    }


    componentDidMount(){
        this.props.fetchCustomers()
        this.props.fetchCustomerGroups()
        this.props.fetchProductPieces()
    }

    // componentDidUpdate(){
    //     if(this.state.group_id !== this.state.group.id){
    //         this.setState(
    //             (prevState) => {
    //                 const group = this.props.customerGroups.filter(
    //                     (group) => {
    //                          return group.id === prevState.group_id
    //                     }
    //                 ).pop() 
    //              return {group}  
    //             }
    //         , () => console.log(this.state))
    //     }
    // }
   
    handleChange = (e) => {
        e.preventDefault()
        switch(e.target.name){
            case "group_id":{
                this.setState({
                    group_id : e.target.value
                }, () => console.log(this.state))
            }
            case "product_pc_id":{
                this.setState(
                    {
                        pp_id: e.target.value
                    }
                )
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
           
            return customers
        }

        return []  
    }


    onCustomerSelectChange = (value) => {
        this.setState({
            customer_id:value
        }, () => console.log(this.state))
    }



    handleSubmit = (event) => {
        event.preventDefault()
        
    }



    render(){
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        {/* <Col span={6}>
                            <Form.Item label="Group ID">
                                <Input name="group_id" disabled={this.props.match.params.id} onChange={this.handleChange} value={this.state.product_id}></Input>
                            </Form.Item>
                        </Col> */}
                        <Col span={6}>
                            <Form.Item label="Group ID">
                                <Input name="group_id" disabled={this.props.match.params.id} onChange={this.handleChange} value={this.state.group_id}></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={6}>
                            <Form.Item label="Customer">
                               <Select onChange={this.onCustomerSelectChange}>
                                   {
                                       this.filterCustormers(this.state.group_id).map(
                                           (customer) =>{
                                           return ( <Option value={customer.id}>
                                                    {customer.contact.FirstName + " " + customer.contact.LastName + "-" + customer.NIC }
                                               
                                               </Option> )
                                           }
                                       )
                                   }
                                    {/* <Option value={1}>
                                        hi
                                    </Option> */}
                               </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Product Piece ID">
                               <Input name="product_pc_id" onChange={this.handleChange}  value={this.state.pp_id}></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <Button htmlType="submit" type="primary"> Add Sale</Button>
                        </Col>
                    </Row>
                </Form>
         
        </div>
        )
    }

}

const mapDispatchToProps = dispatch =>{
    return{
        fetchCustomers : () => dispatch(fetchCustomers()),
        fetchCustomerGroups : () => dispatch(fetchCustomerGroups()),
        fetchProductPieces : () => dispatch(fetchProductPieces())
    }
}

const mapStateToProps = state => {
    return {
        customers : state.customer.customers,
        customerGroups : state.customer.customerGroups,
        loading : state.customer.loading
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(GroupSales)