import React,{Component} from 'react';
import { Layout , Form}  from 'antd'
import NavigationPane from './NavigationPane'
import LoginDetails from './LoginDetails'
//import AddCustomer from './AddCustomer/AddCustomer'
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
import productPieceStore from '../store/ProductPieceStore';
import salesStaffStore from '../store/SalesStaffStore'
import InstalmentPlan from './Instalment/InstalmentPlan';
import AddPayments from './Payments/AddPayments'
import ViewPayments from './Payments/ViewPayment'
import CustomerGroup from './CustomerGroup/CustomerGroup'

import EditProduct from './Products/EditProduct';
import MoveProducts from './Products/MoveProducts/MoveProducts'

import GroupSales from './Sales/GroupSales'

import AddCustomerWiz from './AddCustomer/AddCustomerWiz'
import customerStore from '../store/CustomerStore';
import ProductRestock from './Products/ProductRestock/ProductRestock';
import salesStore from '../store/SalesStore';
const { Header, Content, Footer } = Layout;



class Home extends Component
{
    componentDidMount(){
     //  productPieceStore.loadAllProductPieces()
     productPieceStore.loadAllProductPieces(()=>console.log("product pieces loaded"))
     salesStaffStore.loadAllCurrentSalesStaff(()=>console.log("sales staffs loaded"))
     salesStore.getAllSales()
     customerStore.updateCustomers()
    }
   
    render(){
    const WrapedAddCustomerWiz = Form.create({ name: 'register' })(AddCustomerWiz);

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
                                {/* <Route path="/addcustomer" component={WrapedCustomerRegForm}/> */}
                                <Route path="/addcustomer" component={WrapedAddCustomerWiz}/>
                                <Route path="/viewcustomers" component={ViewCustomers}/>
                                <Route path="/addsale/:NIC" component={AddSale}/>
                                <Route path="/addsale" exact component={AddSale}/>
                                <Route path="/viewsales" component={ViewSales}/>
                                <Route path="/groupsales/:id" component={GroupSales}/>
                                <Route exact path="/groupsales/" component={GroupSales}/>
                                <Route path="/profile" component={Profile}/>
                                <Route path="/addsupplier" component={AddSupplier}/>
                                <Route path="/viewsuppliers" component={ViewSuppliers}/>
                                <Route path="/viewproducts" component={ViewProducts}/>
                                <Route path="/products/:prid" component={EditProduct}/>
                                <Route path="/deletedproducts" component={DeletedProducts}/>
                                <Route path="/addproduct" component={AddProduct}/>
                                <Route path="/productrestock" component={ProductRestock}/>
                                <Route path="/viewcategories" component={ViewCategories}/>
                                <Route path="/addcategory" component={AddCategory}/>
                                <Route path="/category/:catId" component={EditCategory}/>
                                <Route path="/deletedcategories" component={DeletedCategories}/>
                                <Route path="/instalmentplan/:planId" component={InstalmentPlan}/>
                                <Route path="/moveproducts" component={MoveProducts}/>
                                <Route path="/customergroups" component={CustomerGroup} />
                                <Route path="/addpayments/" component={AddPayments}/>
                                <Route path="/viewpayments/" component={ViewPayments}/>
                                {/* <Route path="/productbatch/1" component={QRCodes}/> */}
                            </div>
                        </Content>
                        <Footer style={{backgroundColor:"white"}}>RIB Group</Footer>
                    </Layout>
                </Router> 
                </Layout>
            </div>
        );
    }


}

export default Home