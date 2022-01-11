fetch('https://api.guildwars2.com/v2/items?ids=89271')
.then(response => response.json())
.then(result => {
    console.log(result);
});