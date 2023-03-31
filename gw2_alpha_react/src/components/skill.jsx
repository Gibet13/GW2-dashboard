import React, { Component } from 'react';

import {SkillTooltip} from './tooltip.jsx'

class Skill extends Component {

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
        return  (<div className='item' tabIndex="0" onFocus={this.handleFocus} onBlur={this.handleBlur}>
                    <img className={this.props.skill.type} src={this.props.skill.icon} alt="" />
                    {this.state.isHovering && <SkillTooltip focus = {this.props}/>}
                </div>);
    }
}

export default Skill;