import React ,{Component} from 'react'
import {Table,  message , Button , Icon , Input} from 'antd'
import Highlighter from 'react-highlight-words';
import saleStore from '../../store/SalesStore'
import { connect } from 'react-redux';
import { fetchSales } from '../../redux/sales/actions/actionCreators';

class SalesTable extends Component{

    state = {
        data:saleStore.getSalesByCustomer(this.props.customer_id)
    }

    componentDidMount(){
        this.props.fetchSales()
        // saleStore.getAllSales(()=>{
        //     this.setState(
        //         {
        //             data:saleStore.getSalesByCustomer(this.props.customer_id)}
        //         ,
        //         () => {
        //             console.log(this.state)
        //             console.log("sales data loaded successfully")
        //         })
        // } ,
        // ()=>{
        //     message.error("error in loading sales, check your internet connection")
        // })
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
            (sale) => {
                return sale.customer.id === parseInt(this.props.customer_id)
            }
        )
        

        console.log(sales)

        return sales.map (
            (sale) => {
                return {
                    key:sale.id,
                    invoice : sale.invoice_no,
                    product_id : sale.order_lines[0].product.item_code,
                    customer_nic: sale.customer.NIC,
                    customer_group : sale.customer_group
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
              },  
    
              {
                title: 'Group Number',
                dataIndex: 'customer_group',
                key: 'customer_group',
              }
    
        ]    

        render(){
            return <Table columns={this.columns} pagination={{ pageSize: 10 }}  dataSource={this.formatTableData()} size="small" /> 
     
            
        }


}
const mapStateToProps = state => {
    return {
        sales : state.sales
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSales : () => dispatch(fetchSales())
    }
}




export default connect(mapStateToProps , mapDispatchToProps)(SalesTable);