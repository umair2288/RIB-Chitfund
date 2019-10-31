import React,{Component} from 'react';
import { Layout , Form} from 'antd'
import NavigationPane from './NavigationPane'
import LoginDetails from './LoginDetails'
import AddCustomerForm from './AddCustomer/AddCustomerForm'
import Dashboard from './Dashboard/Dashboard'
import ViewSales from './ViewSales/ViewSales'
import AddSale from './AddSale/AddSale'
import Profile from './Profile/Profile'
import ViewCustomers from './ViewCustomers/ViewCustomers'
import { BrowserRouter as Router , Route}  from 'react-router-dom'
import 'antd/dist/antd.css'
import AddSupplier from './Suppliers/AddSupplier';
import ViewSuppliers from './Suppliers/ViewSuppliers';
import ViewProducts from './Products/ViewProducts/ViewProducts';
import ViewCategories from './Categories/ViewCategories';
import DeletedCategories from './Categories/DeletedCategories';
import EditCategory from './Categories/EditCategory';
import AddCategory from './Categories/AddCategory';
import AddProduct from './Products/AddProduct/AddProduct';
import DeletedProducts from './Products/DeleteProducts/DeletedProducts';
import EditProduct from './Products/EditProduct';

const { Header, Content, Footer } = Layout;



class Home extends Component
{
   
    render(){
    const WrapedCustomerRegForm = Form.create({ name: 'register' })(AddCustomerForm);

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
                                <Route path="/addsupplier" component={AddSupplier}/>
                                <Route path="/viewsuppliers" component={ViewSuppliers}/>
                                <Route path="/viewproducts" component={ViewProducts}/>
                                <Route path="/products/:prid" component={EditProduct}/>
                                <Route path="/deletedproducts" component={DeletedProducts}/>
                                <Route path="/addproduct" component={AddProduct}/>
                                <Route path="/viewcategories" component={ViewCategories}/>
                                <Route path="/addcategory" component={AddCategory}/>
                                <Route path="/category/:catId" component={EditCategory}/>
                                <Route path="/deletedcategories" component={DeletedCategories}/>
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