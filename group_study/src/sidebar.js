import React, {Component} from 'react';
import './App.css';

export default class SideBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
    const subscribed_groups = this.props.subscribed_groups;
    const groupArr = subscribed_groups.map( (subscribed_group) => {
        return (
            <div>
                {subscribed_group}
            </div>
        )
    } )
        return (
            <div className='sidebar-container'>
                {groupArr}
            </div>
        )
    }
}