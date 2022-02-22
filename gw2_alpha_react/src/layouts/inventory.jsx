import React from 'react';
import Item  from '../components/item';

import '../assets/inventory.css'

function Inventory(props){

    return  <div id='inventory'>
                <h3>Inventory</h3>
                {props.bags.map((bag, index) => {
                    var x = 0
                    return <div className='bag'>
                    {bag.map(item => {
                        var info = props.info[index].inventory[x]
                        x++
                        return <Item item = {item} details = {info}/>
                        })}
                </div>})}
            </div>
}
export default Inventory