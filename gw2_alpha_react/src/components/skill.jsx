import React, { Component } from 'react';
import '../assets/skill.css'

import {SkillTooltip} from './tooltip.jsx'

class Skill extends Component {

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
        return  (<div className='item' onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                    <img className={this.props.skill.type} src={this.props.skill.icon} alt="" />
                    {this.state.isHovering && <SkillTooltip focus = {this.props}/>}
                </div>);
    }
}

export default Skill;