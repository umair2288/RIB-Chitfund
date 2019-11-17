import React,{Component} from "react"
//import ButtonGroup from './ButtonGroup'
import 'antd/dist/antd.css'
import { Layout, Menu, Icon } from 'antd';
import { Link }from 'react-router-dom'

//const {Title} = Typography
const {  Sider } = Layout;
const { SubMenu } = Menu;


class NavigationPane extends Component{

    constructor(){
        super()
        this.state = {
          brand : "Royal Marketing"
        }
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        collapsed ? 
        this.setState({ collapsed , brand:"RM"}):this.setState({ collapsed , brand:"Royal Marketing"})
         
     
    };


    render(){

        const styles = {

            navPaneStyles:{
                padding: "10px 5px",
                backgroundColor : "LightGray",
              // borderRight : "1px solid black",
                height : "500px"
                
            },
            brand:{
             // color:"white", 
              textAlign:"center" , 
              fontSize:"24px",
             marginBottom: "20px",
            marginTop:"10px"}
    
         }
        // console.log(this.props.buttonEvent)

       return(
        
       
        <Sider theme="light" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" style={styles.brand}>{this.state.brand}</div>
          <Menu  defaultSelectedKeys={['1']} mode="inline">
          
              <Menu.Item key="dashboard" >
                <Link to='/dashboard'> 
                  <Icon type="desktop" />
                  <span>Dashboard</span>
                </Link>
              </Menu.Item>
            
            <SubMenu
              key="customers"
              title={
                <span>
                  <Icon type="user" />
                  <span>Customer</span>
                </span>
              }
            >
           <Menu.Item key="addCustomer"> <Link to='/addcustomer'>Add Customer </Link></Menu.Item>
           <Menu.Item key="viewCustomers"><Link to='/viewcustomers'>View Customers</Link></Menu.Item>
            
            </SubMenu>
            <SubMenu
              key="sales"
              title={
                <span>
                  <Icon type="skin" />
                  <span>Sales</span>
                </span>
              }
            >
              <Menu.Item key="addSale">  <Link to='/addsale'>Add Sale </Link></Menu.Item>
              <Menu.Item key="viewOrders"><Link to='/viewsales'>View Orders</Link></Menu.Item>
            </SubMenu>
            
            <SubMenu
              key="products"
              title={
                <span>
                  <Icon type="stock" />
                  <span>Products</span>
                </span>
              }
            >
              <Menu.Item key="productrestock">  <Link to='/productrestock'>Restock Products </Link></Menu.Item>
              <Menu.Item key="addproduct">  <Link to='/addproduct'>Add Product </Link></Menu.Item>
              <Menu.Item key="viewproducts"><Link to='/viewproducts'>View Products</Link></Menu.Item>
              <Menu.Item key="deletedproducts"><Link to='/deletedproducts'>Deleted Products</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="category"
              title={
                <span>
                  <Icon type="stock" />
                  <span>Categories</span>
                </span>
              }
            >
              <Menu.Item key="addcategory">  <Link to='/addcategory'>Add Category </Link></Menu.Item>
              <Menu.Item key="viewcategories"><Link to='/viewcategories'>View Categories</Link></Menu.Item>
              <Menu.Item key="deletedcategories"><Link to='/deletedcategories'>Deleted Categories</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="suppiler"
              title={
                <span>
                  <Icon type="shop" />
                  <span>Supplier</span>
                </span>
              }
            >
              <Menu.Item key="addSale">  <Link to='/addsupplier'>Add Supplier </Link></Menu.Item>
              <Menu.Item key="viewOrders"><Link to='/viewsuppliers'>View Suppliers</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="profile">
              <Link to='/profile'>
                <Icon type="user" />
                <span>Profile</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        
        
       )
    }


}

export default NavigationPane

