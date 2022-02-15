import React, { Component } from 'react';
import '../assets/item.css'

import Tooltip from './tooltip';

class Item extends Component {

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
        return  (<div title={this.props.item.name} className='item' onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                    <img className={this.props.item.rarity} src={this.props.item.icon} alt="" />
                    {this.state.isHovering && <Tooltip focus={this.props}/>}
                </div>);
    }
}
 
export default Item;