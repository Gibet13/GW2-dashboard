import React from 'react';
import '../assets/skill.css'

export function Skill(props){
    return <div title={props.skill.name} className='item'><img className={props.skill.type} src={props.skill.icon} alt="" /></div>
}