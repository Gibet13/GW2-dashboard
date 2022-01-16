document.addEventListener('DOMContentLoaded', (event) => {

    document.getElementById("daily_today").onclick =function() {load_dailies("")};
    document.getElementById("daily_tomorrow").onclick = function() {load_dailies('/tomorrow')};

    load_groups()
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

function load_groups() {
    
    group_nav = document.getElementById('main_navbar');

    fetch("https://api.guildwars2.com/v2/achievements/groups")
    .then(response => response.json())
    .then(result => {
        result.forEach(element => {
            fetch(`https://api.guildwars2.com/v2/achievements/groups/${element}`)
            .then(response => response.json())
            .then(group => {
                
                group_tab = document.createElement('div');
                group_tab.innerHTML = group.name;
                group_tab.setAttribute('id', group.name);
                group_tab.onclick = function() {load_categories(group.id)};
                group_tab.classList.add('achievement');

                group_nav.append(group_tab)
            })
        })
    })
}

function load_categories(group_id) {

    cat_nav = document.getElementById('cat_navbar');
    cat_nav.innerHTML = "";

    fetch(`https://api.guildwars2.com/v2/achievements/groups/${group_id}`)
    .then(response => response.json())
    .then(result => {
        result.categories.forEach(element => {
            fetch(`https://api.guildwars2.com/v2/achievements/categories/${element}`)
            .then(response => response.json())
            .then(category => {
                
                cat_tab = document.createElement('div');
                cat_tab.innerHTML = category.name;
                cat_tab.setAttribute('id', category.name);
                cat_tab.onclick = function() {load_category(category.id)};
                cat_tab.classList.add('achievement');

                cat_nav.append(cat_tab)
            })
        })
    })
}

function load_category(cat_id) {

    cat_div = document.getElementById('achievements');
    cat_div.innerHTML = "";

    fetch(`https://api.guildwars2.com/v2/achievements/categories/${cat_id}`)
    .then(response => response.json())
    .then(result => {
        result.achievements.forEach(element => {
            fetch(`https://api.guildwars2.com/v2/achievements?id=${element}`)
            .then(response => response.json())
            .then(achievement => {
                
                ach_box = document.createElement('div');
                ach_box.innerHTML = achievement.name;
                ach_box.setAttribute('id', achievement.name);
                ach_box.classList.add('achievement');

                cat_div.append(ach_box)
            })
        })
    })
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