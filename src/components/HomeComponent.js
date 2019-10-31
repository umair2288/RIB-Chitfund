import React,{Component} from 'react';
import { Layout , Form} from 'antd'
import NavigationPane from './NavigationPane'
import LoginDetails from './LoginDetails'
import AddCustomer from './AddCustomer/AddCustomer'
import Dashboard from './Dashboard/Dashboard'
import ViewSales from './ViewSales/ViewSales'
import AddSale from './AddSale/AddSale'
import Profile from './Profile/Profile'
import ViewCustomers from './ViewCustomers/ViewCustomers'
import { BrowserRouter as Router , Route}  from 'react-router-dom'
import 'antd/dist/antd.css'

const { Header, Content, Footer } = Layout;



class Home extends Component
{
   
    render(){
    const WrapedCustomerRegForm = Form.create({ name: 'register' })(AddCustomer);

        return(        
            <div>                 
                <Layout >  
                <Router>             
                    <NavigationPane buttonEvent={this.opendetails}></NavigationPane>
                    <Layout style={{backgroundColor:"white"}} >
                        <Header style={{backgroundColor:"white"}} ><LoginDetails token={this.props.token}/></Header>
                        <Content>
                            <div style={{backgroundColor:"White", margin:"0px" , padding:"50px"}}>                                 
                                <Route path="/dashboard" component={Dashboard}/>
                                <Route path="/addcustomer" component={WrapedCustomerRegForm}/>
                                <Route path="/viewcustomers" component={ViewCustomers}/>
                                <Route path="/addsale" component={AddSale}/>
                                <Route path="/viewsales" component={ViewSales}/>
                                <Route path="/profile" component={Profile}/>
                            </div>
                        </Content>
                        <Footer style={{backgroundColor:"white"}}>Footer</Footer>
                    </Layout>
                </Router> 
                </Layout>
            </div>
        );
    }


}

export default Home