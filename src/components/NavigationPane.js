import React,{Component} from "react"
//import ButtonGroup from './ButtonGroup'
import 'antd/dist/antd.css'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

//const {Title} = Typography
const { Header, Content, Footer, Sider } = Layout;
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

    handleClick = (e)=>{

      if (e.key === "addCustomer")
      {
        console.log("addCustomer")
      }


    }

    
   
    render(){

        const styles = {

            navPaneStyles:{
                padding: "10px 5px",
                backgroundColor : "LightGray",
              //  borderRight : "1px solid black",
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
          <Menu onSelect={this.handleClick} defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" >
              <Icon type="desktop" />
              <span>Dashboard</span>
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
              <Menu.Item key="addCustomer">Add Customer</Menu.Item>
              <Menu.Item key="viewCustomer">View Customers</Menu.Item>
            
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
              <Menu.Item key="6">Add Sale</Menu.Item>
              <Menu.Item key="8">View Orders</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="user" />
              <span>Profile</span>
            </Menu.Item>
          </Menu>
        </Sider>
        
        
       )
    }


}

export default NavigationPane

