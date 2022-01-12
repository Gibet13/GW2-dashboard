fetch('https://api.guildwars2.com/v2/achievements/daily')
.then(response => response.json())
.then(dailies => {
    console.log(dailies);
    dailiesList = document.getElementById('dailies');
        
    for(let key of Object.keys(dailies)) {
        category = document.createElement('div');
        category.setAttribute('id',`${key}`);
        category.innerHTML = `<h3>${key}</h3>`;
        
        dailies[key].forEach(element => {

            fetch(`https://api.guildwars2.com/v2/achievements?id=${element.id}`)
            .then(response => response.json())
            .then(result => {

                daily = document.createElement('p');
                daily.innerHTML = `${result.name}`;
                document.getElementById(key).append(daily)
            })
        });
        dailiesList.append(category);
    }
});