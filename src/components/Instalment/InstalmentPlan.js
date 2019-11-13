import React,{Component} from 'react'
import instalmentPlanStore from './../../store/InstalmentPlanStore'
import {Col, Row, Table} from 'antd'

class InstalmentPlan extends Component{

  
   state = {
        loading: false,
        "data":{
            instalment_terms:[]
        }
    }

    componentDidMount(){
           
       if(instalmentPlanStore.getInstalmePlanById(this.props.match.planId).length > 0 ){
            let data = instalmentPlanStore.getInstalmePlanById(this.props.match.planId).pop()
            this.setState(
                {
                 data:data
                }
                , ()=> console.log(this.state)
            )
       }      
    }


    formatData =() =>{
       
       let today = new Date()
       console.log(this.state)
       let data =  this.state.data.instalment_terms.map(
            (term) =>{
              let  due_date = new Date(term.due_date)
              console.log(due_date)
             return   {
                    key: term.id,
                    dueDate : due_date.getDate() + "-" + (due_date.getMonth()+1) + "-" + due_date.getFullYear() ,
                    amount : term.due_amount,
                    paymentStatus : term.is_paid ? "Paid" : (due_date > today ? "Not Paid" : "Over Due")
             }
            }
        )
        return data
    }



    columns = [
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
          },   
          
          {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
          },  

          {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
          },   



    ]    

       

    render(){
        return(
            <div>
                <Row type="flex" justify="center">
                    <Col span={4} >
                       <h1> Intalment Plan </h1>                                          
                    </Col>
                </Row>
                
                <Table columns={this.columns}   dataSource={this.formatData()} size="small" /> 
            </div> 

            
        )
    }

}


export default InstalmentPlan