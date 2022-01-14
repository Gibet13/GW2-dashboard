document.addEventListener('DOMContentLoaded', (event) => {

    document.getElementById("daily_today").onclick =function() {load_dailies("")};
    document.getElementById("daily_tomorrow").onclick = function() {load_dailies('/tomorrow')};
});


function load_dailies(date) {
    
    fetch(`https://api.guildwars2.com/v2/achievements/daily${date}`)
    .then(response => response.json())
    .then(dailies => {
        
        dailiesList = document.getElementById('dailies');
        dailiesList.innerHTML = "";

        for(let key of Object.keys(dailies)) {
            category = document.createElement('div');
            category.setAttribute('id',`${key}`);
            category.innerHTML = `<h3>${key}</h3>`;
            
            dailies[key].forEach(element => {

                fetch(`https://api.guildwars2.com/v2/achievements?id=${element.id}`)
                .then(response => response.json())
                .then(result => {

                    daily = document.createElement('div');
                    daily.classList.add('achievement');
                    daily.innerHTML = `${result.name}`;
                    document.getElementById(key).append(daily)
                    daily.onclick = function() {load_achievement(element.id)};
                    
                })
                
                dailiesList.append(category);
            }); 
        }
    });
}

function load_categories() {
    fetch("https://api.guildwars2.com/v2/achievements/categories")
}

function load_achievement(id) {
    fetch(`https://api.guildwars2.com/v2/achievements?id=${id}`)
    .then(response => response.json())
    .then(result => {
        const details = document.getElementById('details');
        details.innerHTML = "";
        const name = document.createElement('div');

        name.innerHTML = result.name

        const descryption = document.createElement('div');
        descryption.innerHTML = result.requirement;

        details.append(name, descryption)
    
    })
}