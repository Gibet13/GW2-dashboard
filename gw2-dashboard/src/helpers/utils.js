import { getBaseValue } from "./variables";

export function SecToHours(value){

    var hours = Math.floor(value/3600);
    var minutes = Math.floor(value%3600 / 60);
    var seconds = value - (hours * 3600) - (minutes * 60);

    var format = `${hours}h ${minutes}min ${seconds}sec`;

    return format;
}

// parse the attributes of a gear set to display them in the gear set component without counting the attributes of aquatics weapons and armor and secondary weapons set
export function parseAttribute(gear, info, level) {

    var equipment = {}
    var aquaticPieces = ['HelmAquatic', 'WeaponAquaticA', 'WeaponAquaticB']
    var secondaryPieces = ['WeaponB1', 'WeaponB2']

    var attributes = {
        'Power': getBaseValue(level),
        'Toughness':getBaseValue(level),
        'Vitality':getBaseValue(level),
        'Precision':getBaseValue(level),
        'CritDamage':0,
        'ConditionDamage':0,
        'ConditionDuration':0,
        'Concentration':0,
        'HealingPower':0
    }


    // parse the attributes of the gear set 
    gear.forEach(item => {
        
        if (item.stats && item.stats.attributes) {
            
            Object.keys(item.stats.attributes).forEach(key => {
                equipment[item.slot] = item.stats.attributes;
            })
        }
        else if(info[item.slot].details.infix_upgrade && info[item.slot].details.infix_upgrade.attributes){

            let piece = {} 
            info[item.slot].details.infix_upgrade.attributes.forEach(attribute => {
                piece[attribute.attribute] = attribute.modifier
            })
            equipment[item.slot] = piece
        }
    });
    
    Object.keys(equipment).forEach(key => {
        if(!aquaticPieces.includes(key) && !secondaryPieces.includes(key)){
            Object.keys(equipment[key]).forEach(attribute => {
                attributes[attribute] += equipment[key][attribute]
            })
        }
    })
    
    return attributes;
}