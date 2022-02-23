import React, { Component } from 'react';
import '../assets/item.css'

class Trait extends Component {

    render() {
         
        return  (<div title={this.props.trait.name} className='trait'>
                    <img className='trait' src={this.props.trait.icon} alt="" />
                </div>);
    }
}

export default Trait;