import React from 'react';


function load_groups() {

    var items = []

    fetch("https://api.guildwars2.com/v2/achievements/groups")
    .then(response => response.json())
    .then(result => {
        result.forEach(element => {
            fetch(`https://api.guildwars2.com/v2/achievements/groups/${element}`)
            .then(response => response.json())
            .then(group => {
                
                items.push(group.name)
                
            })
        })
    })   
    console.log(items[0])
    return items;
}

export default load_groups;