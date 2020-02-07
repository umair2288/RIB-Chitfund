import React , {Component} from 'react'
import { Table ,Form , Select, Button, message} from 'antd'
import { connect } from 'react-redux'

const {Option} = Select


class CustomerList extends Component {

    state = {
        tableList:[]
    }


    onSelectChange = (value) =>{
       console.log(value)
       const customer = this.props.customers.filter(
        (customer) => {
          return  customer.id === value
        }
       ).pop()

       this.setState({
           customer:customer
       })
    }

    
    componentDidMount(){
        if(this.props.group_id){
            console.log("Hi")
            const customerGroup = this.props.customerGroups.filter(
                (customerGroup) => {
                    return customerGroup.id === this.props.group_id
                }
            ).pop()
            const customerList = customerGroup.customers
            const tableList = this.props.customers.filter(
                (customer) => {
                    return customerList.includes(customer.id)
                }
            )
            this.setState(
                {
                    tableList:tableList
                }
                ,() => console.log(this.state)
            )
        }
    }

    handleAddButtonClicked = () =>{
        this.setState((prevState)=>{
            const tableList = prevState.tableList
            if(!tableList.includes(prevState.customer)){
                tableList.push(prevState.customer)
                 this.props.addCustomersToList(
                  tableList.map(
                        (customer) => {
                            return customer.id 
                        }
                    )
                )
                return  {
                    tableList : tableList
                }
            }else{
                message.error("Watch out! Customer already exists in the list!")
            }
        })  
    }

    clearState = () => {
        this.setState({
            tableList:[]
        })
    }




    render(){


    const formatTableData = (data) => {
        return data.map(
            (data , index) =>{
                return {
                    "nic": data.NIC,
                    "id" : data.id,
                    "name": data.contact.FirstName +" " + data.contact.LastName,
                    "key": index
                }
            }
        )
    }

     const columns = [
            {
                id:"id",
                dataIndex:"id",
                title:"ID"
            } 
            ,
           {
                id:"nic",
                dataIndex:"nic",
                title:"NIC"
           } 
           ,
           {
                id:"name",
                dataIndex:"name",
                title:"Name"
            } 
        ]



        return (
            <div>
                <Form.Item label="Customer NIC">
                <Select
                    showSearch
                    style={{ width: 300 }}
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={this.onSelectChange}
                    // onFocus={onFocus}
                    // onBlur={onBlur}
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    >
                    {
                    this.props.customers.map(
                        (customer, index) => {
                            return(<Option key={index} value={customer.id}>{customer.NIC}</Option>) 
                        }
                    )}
                </Select>
                    <Button onClick={this.handleAddButtonClicked} style={{marginLeft:"20px"}}>Add</Button>
                </Form.Item>    
                <Table size="small" columns={columns} dataSource={formatTableData(this.state.tableList)} />
            </div>
        )
    }
}


const mapStateToProps = state =>{
    return{
        customers : state.customer.customers,
        customerGroups : state.customer.customerGroups  
    }
}


export default connect(mapStateToProps)(CustomerList)