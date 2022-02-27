import React, { Component } from 'react';
import '../assets/item.css'

import {TraitTooltip} from './tooltip.jsx'

class Trait extends Component {

    constructor(props) {
        super(props);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.state = {
          isHovering: false
        };
      }
    
      handleMouseOver() {
        this.setState(() => ({
          isHovering: true
        }));
      }
    
      handleMouseOut() {
        this.setState(() => ({
          isHovering: false
        }));
      }

    render() {
         
        return  (<div className='trait' onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                    <img className='trait' src={this.props.trait.icon} alt="" />
                    {this.state.isHovering && <TraitTooltip focus = {this.props}/>}
                </div>);
    }
}

export default Trait;