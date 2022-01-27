'use strict';

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('api_key_test').onclick = function() {api_key_test()};

    document.getElementById('menu_gear').onclick = function() {toggle_tab('gear')}
    document.getElementById('menu_build').onclick = function() {toggle_tab('build')}
    
});


function api_key_test(){

    let key = document.getElementById('api-key').value;
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

        console.log(result);
        let characters = document.querySelector('#characters');

        result.forEach(element => {
            let character = document.createElement('div');
            character.innerHTML = element;
            character.onclick = function() {load_character(api_key, element)};
            characters.append(character);

        });
    })
}

function load_character(api_key, name){

    character = {}
    equipement = {}
    build = {}

    fetch(`https://api.guildwars2.com/v2/characters/${name}?access_token=${api_key}`)
    .then(response => response.json())
    .then(result => {
        console.log(result)
    })

    return(character);
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

/*function showcharactersheet(character, build) {


    return(
        <div id="character_sheet" class="container">
            <div id="account_header">
                <div>
                    <h1>Character Name</h1>
                </div>
                <div id="chara_navigation">
                    <div  id="chara_tabs">Info</div>
                    <div id="chara_info">
                        <ul>
                            <div class="achievement" id="menu_gear">Gear</div>
                            <div class="achievement" id="menu_build">Build</div>
                            <div class="achievement">Inventory</div>
                        </ul>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div id="gear">
                <h2>Gear</h2>
                <div id="gear_view">
                    <div id="main_gear">
                        <div id="armor_piece">
                            Armor
                            <div class="icon">1</div>
                            <div class="icon">2</div>
                            <div class="icon">3</div>
                            <div class="icon">4</div>
                            <div class="icon">5</div>
                            <div class="icon">6</div>
                        </div>
                        <div id="land_weapons_set">
                            Weapon Set
                            <div id="set_1">
                                set 1
                                <div class="icon">1</div>
                                <div class="icon">2</div>
                            </div>
                            <div id="set_2">
                                set 2
                                <div class="icon">1</div>
                                <div class="icon">2</div>
                            </div>
                        </div>
                    </div>
                    <div id="secondary_gear">
                        Stats
                        <div id="stat_view">
                            Attributes
                        </div>
                        <div id="trinkets">
                            Trinkets
                            <div>
                                <div id="backpiece" class="icon">1</div>
                                <div id="accesory">
                                    <div class="icon">1</div>
                                    <div class="icon">2</div>
                                </div>
                            </div>
                            <div>
                                <div id="amulet" class="icon">1</div>
                                <div id="rings">
                                    <div class="icon">1</div>
                                    <div class="icon">2</div>
                                </div>
                            </div>
                            Underwater
                            <div id="underwater_gear">
                                <div>
                                    <div class="icon">1</div>
                                    <div class="icon">1</div>
                                    <div class="icon">2</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="inventory" class="container">

            </div>
            
            <div id="build">
                <h2>Build</h2>
                <div id="skill-bars">
                    <div class="skill_bar">
                        
                        <div class="off_hand">
                            <div class="icon">1</div>
                            <div class="icon">1</div>
                            <div class="icon">2</div>
                            <div class="icon">3</div>
                            <div class="icon">1</div>
                        </div>
                    </div>
                  
                    <div class="skill_bar">
                        
                        <div class="off_hand">
                            <div class="icon">1</div>
                            <div class="icon">1</div>
                            <div class="icon">2</div>
                            <div class="icon">3</div>
                            <div class="icon">1</div>
                        </div>
                    </div>
                </div>
                <div id="trait-lines">
                    <div class="traitline" id="topline">
                        <div class="traitline_icon">1</div>
                        <div class="minor_trait_icon"></div>
                        <div class="trait_tier">
                            <div class="major_trait_icon"></div>
                            <div class="major_trait_icon"></div>
                            <div class="major_trait_icon"></div>
                        </div>
                        <div class="minor_trait_icon"></div>
                        <div class="trait_tier">
                            <div class="major_trait_icon"></div>
                            <div class="major_trait_icon"></div>
                            <div class="major_trait_icon"></div>
                        </div>
                        <div class="minor_trait_icon"></div>
                        <div class="trait_tier">
                            <div class="major_trait_icon"></div>
                            <div class="major_trait_icon"></div>
                            <div class="major_trait_icon"></div>
                        </div>
                    </div>
                    <div class="traitline" id="midline">
                        <div class="traitline_icon">2</div>
                        <div class="minor_trait_icon"></div>
                        <div class="trait_tier">
                            <div class="major_trait_icon"></div>
                            <div class="major_trait_icon"></div>
                            <div class="major_trait_icon"></div>
                        </div>
                        <div class="minor_trait_icon"></div>
                        <div class="trait_tier">
                            <div class="major_trait_icon"></div>
                            <div class="major_trait_icon"></div>
                            <div class="major_trait_icon"></div>
                        </div>
                        <div class="minor_trait_icon"></div>
                        <div class="trait_tier">
                            <div class="major_trait_icon"></div>
                            <div class="major_trait_icon"></div>
                            <div class="major_trait_icon"></div>
                        </div>
                    </div>
                    <div class="traitline" id="bottomline">
                        <div class="traitline_icon">3</div>
                        <div class="minor_trait_icon"></div>
                        <div class="trait_tier">
                            <div class="major_trait_icon"></div>
                            <div class="major_trait_icon"></div>
                            <div class="major_trait_icon"></div>
                        </div>
                        <div class="minor_trait_icon"></div>
                        <div class="trait_tier">
                            <div class="major_trait_icon"></div>
                            <div class="major_trait_icon"></div>
                            <div class="major_trait_icon"></div>
                        </div>
                        <div class="minor_trait_icon"></div>
                        <div class="trait_tier">
                            <div class="major_trait_icon"></div>
                            <div class="major_trait_icon"></div>
                            <div class="major_trait_icon"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}*/