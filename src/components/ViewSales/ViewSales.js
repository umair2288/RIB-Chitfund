import React, { Component } from 'react'
import * as titleActions from '../../Actions/TitleActions'

import {Drawer } from 'antd'

import SalesTable from './SalesTable';

class ViewSales extends Component {
 
    // constructor(){
    //     super()
    // }

    state = {
       
    }

    componentDidMount(){
        titleActions.changeTitle("View Sales")
       
    }


    render(){
        return (
            <div>
                <SalesTable></SalesTable>
                   <Drawer
                title="Instalment Plan"
                placement="right"
                width= {600}
                destroyOnClose
                closable={true}
                onClose={this.onClose}
                visible={this.state.drawer_visible}
              >
              {/* <InstalmentPlan InstalmentPlanID={this.state.InstalmentPlanID}/> */}
          </Drawer>
          </div>
        )
    }
}

export default ViewSales;
