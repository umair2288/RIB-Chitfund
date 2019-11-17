import React ,{Component} from 'react';
import * as titleActions from '../../Actions/TitleActions'
import {Card , Row , Col} from 'antd' 


class Dashboard extends Component{

   state = {
       todaySales: 0,
       todayCollection:0,
       amountOverDue:0
       
   }

    componentDidMount(){
        titleActions.changeTitle("Dashboard")
      
    }
   

    render(){
        return (
            <div style={{  padding: '30px' }}>
            <Row gutter={16}>
              <Col span={8}>
                <Card title="Today Sales" bordered={false}>
                    {"LKR " + this.state.todaySales}
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Today Collection" bordered={false}>
                    {"LKR " + this.state.todayCollection}
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Amount Over Due" bordered={false}>
                    {"LKR " + this.state.amountOverDue}
                </Card>
              </Col>
            </Row>
          </div>
        )
           
        
    }
}

export default Dashboard
