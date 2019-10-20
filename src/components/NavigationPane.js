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
              key="sub1"
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
              key="sub2"
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

