import React,{Component} from 'react';
import { Row , Col , Layout , Form} from 'antd'
import NavigationPane from './NavigationPane'
import DetailsPane from './DetailsPane'
import LoginDetails from './LoginDetails'
import AddCustomerForm from './AddCustomerForm'
import 'antd/dist/antd.css'

const { Header, Content, Footer, Sider } = Layout;



class Home extends Component
{
    constructor(){
        super()
        this.state = {
            navPaneWidth: 4,
            detailPaneWidth : 5,
            contentPaneWidth : 13,
            headerPanelWidth: 21
        }
    }

    opendetails = () => {
        this.setState(
            {
                navPaneWidth: 4,
                detailPaneWidth : 5,
                contentPaneWidth : 13,
                headerPanelWidth: 21
            }
        )
    }



    render(){

        const myStyle = {
            backgroundColor: "LightGray",
        };

        const WrapedCustomerRegForm = Form.create({ name: 'register' })(AddCustomerForm);
                              

        return(
            
                <div>   
                
                   < Layout >               
                        <NavigationPane buttonEvent={this.opendetails}></NavigationPane>
                        <Layout >
                            <Header style={{backgroundColor:"white"}} ><LoginDetails/></Header>
                            <Content>
                               <div style={{backgroundColor:"White", margin:"50px" , padding:"50px"}}> 
                                    <WrapedCustomerRegForm/>
                               </div>
                            </Content>
                            <Footer>Footer</Footer>
                        </Layout>
                </Layout>
                     

            </div>

        );
    }


}

export default Home