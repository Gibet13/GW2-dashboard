export function SecToHours(value){

    var hours = Math.floor(value/3600);
    var minutes = Math.floor(value%3600 / 60);
    var seconds = value - (hours * 3600) - (minutes * 60);

    var format = `${hours}h ${minutes}min ${seconds}sec`;

    return format;
}

export function parse_attribute(gear) {
    var attributes = {
        'Power':0,
        'Toughness':0,
        'Vitality':0,
        'Precision':0,
        'Ferocity':0,
        'Condition Damage':0,
        'Expertise':0,
        'Concentration':0,
        'Healing Power':0
    }

    return attributes;
}