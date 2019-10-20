import React , {Component} from 'react'
import * as titleActions from '../../Actions/TitleActions'


class AddSale extends Component{

    // constructor(){
    //     super()
    // }

    componentDidMount(){
        titleActions.changeTitle("Profile")
    }

    render(){
        return <h1> Add Sale </h1>
    }
}


export default AddSale;