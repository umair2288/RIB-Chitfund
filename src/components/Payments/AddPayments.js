import React, {Component} from 'react'
import * as titleActions from '../../Actions/TitleActions'
import {Table, Button , Input, Icon , message} from 'antd'
import Highlighter from 'react-highlight-words'
import paymentStore from '../../store/PaymentStore'


class AddPayments extends Component {

    state = {
        showPayModal:false,
        data:[]
    }


   handleClick = () =>{
       this.setState(
           {
               showPayModal:true,

           } , () => console.log(this.state)
       )
   }


    componentDidMount(){
        titleActions.changeTitle("Add Payment")
        paymentStore.getDuePayments(
            ()=>{
                this.setState({
                    data:paymentStore.duePaymentsStore
                },()=>console.log(this.state))
            }
            ,
            () => {
                message.error("Loading due payments failed")
            }
        )
    }

    formatTableData = () =>{
        var tableData = []
        this.state.data.map(
            (instalment_plan)=>{
             var data = instalment_plan.overdue_terms.map(
                    (term)=>{
                        let  due_date = new Date(term.due_date)
                        return {
                            key:term.id,
                            invoice: instalment_plan.invoice.invoice_no,
                            customer_nic: instalment_plan.invoice.customer.NIC,
                            due_amount: term.due_amount,
                            due_date : due_date.getDate() + "-" + (due_date.getMonth()+1) + "-" + due_date.getFullYear(),
                            button: term.id
                            
                        }
                    }
                )
               
                tableData.push(data)
                
                return data  
            }
        )
        console.log(tableData)
        return tableData.flat()
    }
    
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: text => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
           textToHighlight={text.toString()}
          />
        ),
      });
    
      handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
      };



    columns = [
       
            {
                title: 'Invoice',
                dataIndex: 'invoice',
                key: 'invoice',
               ...this.getColumnSearchProps('invoice')
              }
              ,

            {
                title: 'Customer NIC',
                dataIndex: 'customer_nic',
                key: 'customer_nic',
                ...this.getColumnSearchProps('customer_nic')
        
              },
              {
                title: 'Due Amount',
                dataIndex: 'due_amount',
                key: 'due_amount',
                
        
              },
              {
                title: 'Due Date',
                dataIndex: 'due_date',
                key: 'due_date',
               
        
              }

              ,
              {
                  title : '',
                  dataIndex: 'button',
                render: id => <Button type="primary" icon="user" onClick={this.handleClick} id={id}>Make Payment</Button>
              }
        
    ]

    render(){
        return (
            <div>
                <h1>List of OverDues</h1>
            <Table columns={this.columns} pagination={{ pageSize: 10 }}  dataSource={this.formatTableData()} size="small" /> 
            </div>
        )
    }

}

export default AddPayments