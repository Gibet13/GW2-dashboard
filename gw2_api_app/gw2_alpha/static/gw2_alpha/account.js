document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('api_key_test').onclick = function() {api_key_test()};
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