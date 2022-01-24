document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('api_key_test').onclick = function() {api_key_test()};

    document.getElementById('menu_gear').onclick = function() {toggle_tab('gear')}
    document.getElementById('menu_build').onclick = function() {toggle_tab('build')}
    
});


function api_key_test(){

    key = document.getElementById('api-key').value;
    fetch(`https://api.guildwars2.com/v2/account?access_token=${key}`)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if(result.text == 'Invalid access token') {
            alert('invalid api key');
        }
        else{
            alert('valid api key');
            load_characters(key);
        }
    })

}



function load_characters(api_key) {

    fetch(`https://api.guildwars2.com/v2/characters?access_token=${api_key}`)
    .then(response => response.json())
    .then(result => {
        console.log(result)
    })
}

function load_bank(api_key) {

}

function toggle_tab (tab_id) {

    tab = document.getElementById(tab_id)
    if(tab.style.display == 'none') {
        tab.style.display = 'flex';
    }
    else {
        tab.style.display = 'none';
    }
}