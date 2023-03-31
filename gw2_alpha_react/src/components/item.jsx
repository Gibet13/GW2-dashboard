import React, { Component } from 'react';

import {Tooltip} from './tooltip';

class Item extends Component {

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
        return  (<React.Fragment>
                  {this.props.item ? 
                  (<div className='item' tabIndex="0" onFocus={this.handleFocus} onBlur={this.handleBlur}>
                      <img className={this.props.item.rarity} src={this.props.item.icon} alt=""/>
                      {this.state.isHovering && <Tooltip focus={this.props}/>}
                      {this.props.details && <React.Fragment>{this.props.details.count > 1 && <span className='count'>{this.props.details.count}</span>}</React.Fragment>}
                  </div>)
                  :
                  (<div title='Empty' className='icon'></div>)}
                </React.Fragment>
                );
    }
}
 
export default Item;