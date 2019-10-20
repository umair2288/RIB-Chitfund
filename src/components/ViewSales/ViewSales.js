import React, { Component } from 'react'
import * as titleActions from '../../Actions/TitleActions'

class ViewSales extends Component {
 
    // constructor(){
    //     super()
    // }

    componentDidMount(){
        titleActions.changeTitle("View Sales")
    }

    render(){
        return (
            <div>
                <h1>View Sales</h1>
            </div>
        )
    }
}

export default ViewSales;
