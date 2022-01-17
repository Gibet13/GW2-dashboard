document.addEventListener('DOMContentLoaded', (event) => {
    load_groups()
});


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
                group_tab.setAttribute('id', `grp${group.id}`);
                group_tab.onclick = function() {load_categories(group.id)};
                group_tab.classList.add('achievement');

                group_nav.append(group_tab)
            })
        })
    })
}

function load_categories(group_id) {

    cat_nav = document.getElementById('cat_navbar');
    document.getElementById('achievements').innerHTML = "";
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
                cat_tab.setAttribute('id', `cat${category.id}`);
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
                ach_box.classList.add('accordion-item');
                ach_box.setAttribute('id', `ach${achievement.id}`);

                ach_header = document.createElement('h2');
                ach_header.setAttribute('id', `head${achievement.id}`);
                ach_header.classList.add('accordion-header');
                ach_box.append(ach_header);

                ach_button = document.createElement('button');
                ach_button.classList.add('accordion-button','collapsed');
                ach_button.setAttribute('type', 'button');
                ach_button.setAttribute('data-bs-toggle', 'collapse');
                ach_button.setAttribute('data-bs-target', `#coll${achievement.id}`);
                ach_button.setAttribute('aria-expanded', 'true');
                ach_button.setAttribute('aria-controls', `coll${achievement.id}`);
                ach_button.innerHTML = achievement.name;
                ach_header.append(ach_button);

                ach_collapse = document.createElement('div');
                ach_collapse.classList.add('accordion-collapse','collapse');
                ach_collapse.setAttribute('id',`coll${achievement.id}`);
                ach_collapse.setAttribute('aria-labelledby',`head${achievement.id}`);
                ach_collapse.setAttribute('data-bs-parent','achievements')
                ach_box.append(ach_collapse);

                ach_body = document.createElement('div');
                ach_body.classList.add('accordion-body')
                ach_body.innerHTML = achievement.requirement;
                ach_collapse.append(ach_body);
                
                cat_div.append(ach_box)
            })
        })
    })
}