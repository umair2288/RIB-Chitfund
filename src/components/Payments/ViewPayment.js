import React, {Component} from 'react'
import * as titleActions from '../../Actions/TitleActions'


class ViewPayments extends Component {


    componentDidMount(){
        titleActions.changeTitle("Add Payment")
    }


    render(){
        return (
            <div>View Payment</div>
        )
    }

}

export default ViewPayments