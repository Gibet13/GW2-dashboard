import React, { Component } from 'react';
import '../assets/skill.css'

class Skill extends Component {

    render() { 
        return  (<div title={this.props.skill.name} className='item'>
                    <img className={this.props.skill.type} src={this.props.skill.icon} alt="" />
                </div>);
    }
}

export default Skill;