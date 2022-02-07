import React from 'react';
import '../assets/item.css'

export function Item(props){
    return <div title={props.item.name} className='item'><img className={props.item.rarity} src={props.item.icon} alt="" /></div>
}
