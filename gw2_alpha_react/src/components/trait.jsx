import React, { Component } from 'react';

import {TraitTooltip} from './tooltip.jsx'

class Trait extends Component {

    constructor(props) {
        super(props);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.state = {
          isHovering: false
        };
      }
    
      handleFocus() {
        this.setState(() => ({
          isHovering: true
        }));
      }
    
      handleBlur() {
        this.setState(() => ({
          isHovering: false
        }));
      }

    render() {
         
        return  (<div className='trait' tabIndex="0" onFocus={this.handleFocus} onBlur={this.handleBlur}>
                    <img className='trait' src={this.props.trait.icon} alt="" />
                    {this.state.isHovering && <TraitTooltip focus = {this.props}/>}
                </div>);
    }
}

export default Trait;