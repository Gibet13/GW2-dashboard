import React from 'react';
import '../assets/item.css'

export function Trait(props){
    
    return <div title={props.trait.name} className='item'><img className='trait' src={props.trait.icon} alt="" /></div>
}
