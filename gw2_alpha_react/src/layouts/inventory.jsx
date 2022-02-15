import React from 'react';
import Item  from '../components/item';

import '../assets/inventory.css'

function Inventory(props){

    return  <div id='inventory'>
                <h3>Inventory</h3>
                {props.bags.map(bag => {return <div className='bag'>
                    {bag.map(item => {return <Item item = {item}/>})}
                </div>})}
            </div>
}
export default Inventory