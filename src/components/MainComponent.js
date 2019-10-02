import React,{Component} from 'react';
import { Row , Col } from 'antd'
import NavigationPane from './NavigationPane'
import DetailsPane from './DetailsPane'
import 'antd/dist/antd.css'





class MainComponent extends Component
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

        return(
            
            <div>
                <Row gutter={5}>   
                    <Col span={this.state.navPaneWidth}>
                        <NavigationPane buttonEvent={this.opendetails}></NavigationPane>
                    </Col>   
                    {/* <Col span = {this.state.headerPanelWidth} >
                        <div style={{backgroundColor:"Black" , color:"White"}}>Header Panel</div>
                    </Col>   */}
                    {
                    this.state.detailPaneWidth ?    <Col span = {this.state.detailPaneWidth}>
                                                        <DetailsPane style={{height:"1000px"}}></DetailsPane>
                                                    </Col> : null
                    }
                    <Col span = {this.state.contentPaneWidth} >
                        <div style={myStyle}>Content Pane</div>
                    </Col>
                       
                        
                   
                </Row>                
            </div>

        );
    }


}

export default MainComponent