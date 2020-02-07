import React ,{Component} from 'react'
import {Table,  message , Button , Icon , Input} from 'antd'
import Highlighter from 'react-highlight-words';
import saleStore from '../../store/SalesStore'
import { connect } from 'react-redux';

class SalesTable extends Component{

    state = {
        data:saleStore.getSalesByCustomer(this.props.customer_id)
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



    

    formatTableData = () => {

    var sales = this.props.sales.sales.filter(
        sale => {
            return parseInt(this.props.group_id) === sale.customer_group
        }
    )
    

    console.log(sales)

     return   sales.map (
            (sale) => {
                return {
                    key:sale.id,
                    invoice : sale.invoice_no,
                    product_id : sale.order_lines[0].product.item_code,
                    customer_nic: sale.customer.NIC,
                    paymentStatus: sale.payment_status,
                    instalment_plan_id:sale.instalment_plan_id,
                    date : sale.date.substr(0,10)
                }
            }
        )
    }



   
    columns = [
            {
                title: 'Invoice',
                dataIndex: 'invoice',
                key: 'invoice',
                ...this.getColumnSearchProps('invoice')
              },   
              
              {
                title: 'Product ID',
                dataIndex: 'product_id',
                key: 'productId',
                 ...this.getColumnSearchProps('productId')
              },   
            
                
              {
                title: 'Customer NIC',
                dataIndex: 'customer_nic',
                key: 'customer_nic',
                ...this.getColumnSearchProps('customer_nic')
              }
              ,
              {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                ...this.getColumnSearchProps('date')
              }
    
        ]    

       

        render(){
            console.log(this.props.sales)
            return <Table loading={this.props.sales.loading} columns={this.columns} pagination={false}  dataSource={this.formatTableData()} size="small" /> 
     
            
        }


}


const mapStateToProps = state => {
    return {
        sales : state.sales     
    }
}



export default connect(mapStateToProps)(SalesTable);