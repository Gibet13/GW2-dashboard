import React, { useEffect, useState } from 'react';
import Item from '../Generic/item';


// this component is used to display the inventory of a character 
const Inventory = ({bags}) => {

    const [ inventoryContent, setInventoryContent ] = useState(null)

    useEffect(()=> {
        !inventoryContent && loadInventoryInfo()
    })

    // this function is used to get the information of the items in the inventory of the character
    const loadInventoryInfo = async () => {

        setInventoryContent(null)
        
        var ids = []
        var info = []
        
        // for each bag in the inventory of the character
        for(let i = 0; i < bags.length; i++){
            ids[i] = []
            info[i] = []
            var a = 0
            var duplicate = false

            // get the ids of the items in the bag
            for(let y = 0; y < bags[i].inventory.length; y++){
                if(bags[i].inventory[y]){
                    ids[i].push(bags[i].inventory[y].id)
                }    
            }
            
            // if the bag is not empty
            if(ids[i].length !== 0){
                // query returning the items of a character based on the ids provided
                var response = await fetch(`https://api.guildwars2.com/v2/items?ids=${ids[i].join(",")}`)
                var data = await response.json()
                
                // for each item in the bag 
                for (let x = 0 ; x < bags[i].inventory.length; x++){
                    if(bags[i].inventory[x]){
                        // check if the item is a duplicate of an item already in the bag
                        for (let b = 0 ; b < x; b++){
                            
                            duplicate = false
                            if(bags[i].inventory[b]){
                                // if the item is a duplicate we replace it with the item already in the bag
                                if(info[i][b].id === bags[i].inventory[x].id){

                                    duplicate = true
                                    info[i][x] = info[i][b]
                                    break
                                }
                            }
                        }
                        // if the item is not a duplicate we add it to the bag
                        if(!duplicate){
                            info[i][x] = data[a]
                            a++
                        }  
                    }
                    // if the item is null we add null to the bag
                    else{
                    info[i][x] = bags[i].inventory[x]
                    }
                }
            }
            // if the bag is empty we add null to the bag
            else{
                info[i] = bags[i].inventory
            }
        }
        setInventoryContent(info)
    }

    return  <div id='inventory'>
                <h3>Inventory</h3>
                {inventoryContent && <>
                    {inventoryContent.map((bag, index) => {
                        var x = 0
                        return <div className='bag'>
                            {bag.map(item => {
                                var info = bags[index].inventory[x]
                                x++
                                return <Item item = {item} details = {info}/>
                                })}
                        </div>
                        })
                    }
                </>}
            </div>
}

export default Inventory