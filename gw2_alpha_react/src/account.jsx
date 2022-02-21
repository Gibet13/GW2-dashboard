import React, { Component } from 'react';

import './assets/account.css'
import Charabuild from './layouts/build';
import CharaGear from './layouts/equipement';
import Backstory from './layouts/Story';
import Inventory from './layouts/inventory';

import { SecToHours } from './helpers/utils.js'



class AccountPage extends Component {
    state = {
        viewstate:null,
        valid_key:false,
        api_key:null,
        chara_list:null,
        character:null,
        equipment:null,
        inventory:null,
        backstory:null,
        skills:null,
        traits:null,
        bank:null
    }

    async verify_key() {

        let key = document.getElementById('api-key').value;
        var response = await fetch(`https://api.guildwars2.com/v2/account?access_token=${key}`)
        var result = await response.json()
            
        if(result.text === 'Invalid access token') {
            alert('invalid api key');
        }
        else{
            this.setState({api_key: key})
            this.state.valid_key = true;
            this.load_characters(key)
        }
    }

    async load_characters(key) {
        
        var response = await fetch(`https://api.guildwars2.com/v2/characters?access_token=${key}`)
        var result = await response.json()

        this.setState({chara_list: result})       
    }

    async load_bank(key) {

        var response = await fetch(`https://api.guildwars2.com/v2/account/bank?access_token=${key}`)
        var result = await response.json()

        this.setState({bank: result})
    }

    async load_character(key, name) {

        var response = await fetch(`https://api.guildwars2.com/v2/characters/${name}?access_token=${key}`)
        var result = await response.json()
            
        this.setState({character: result})
    }

    async equipmentInfo(equipment) {
        
        var ids = []
        var info = []

        equipment.forEach(element => {
                ids.push(element.id)
            });
        
        var response = await fetch(`https://api.guildwars2.com/v2/items?ids=${ids.join(",")}`)
        var data = await response.json()

        for(var i = 0; i < ids.length; i++){

            info[equipment[i].slot] = data[i]
        }

        this.setState({equipment:info})
    }

    async skillInfo(skills) {

        var ids = [skills.pve.heal, skills.pve.utilities[0], skills.pve.utilities[1], skills.pve.utilities[2],skills.pve.elite]
        var info = []

        var response = await fetch(`https://api.guildwars2.com/v2/skills?ids=${ids.join(",")}`)
        var data = await response.json()
        
        for(var i = 0; i < ids.length; i++){

            info[`${data[i].type}${i}`] = data[i]
        }
        
        this.setState({skills:info})
    }

    async traitInfo(traits) {
        
        var ids = [traits.pve[0].id,traits.pve[1].id,traits.pve[2].id]

        var response = await fetch(`https://api.guildwars2.com/v2/specializations?ids=${ids.join(",")}`)
        var info = await response.json()
        
        this.setState({traits:info})
    }

    async inventoryInfo(bags) {
        
        var ids = []
        var info = []

        for(let i = 0; i < bags.length; i++){
            ids[i] = []
            info[i] = []
            var a = 0

            for(let y = 0; y < bags[i].inventory.length; y++){
                if(bags[i].inventory[y]){
                    ids[i].push(bags[i].inventory[y].id)
                }    
            }
            
            if(ids[i].length !== 0){
                var response = await fetch(`https://api.guildwars2.com/v2/items?ids=${ids[i].join(",")}`)
                var data = await response.json()
                
                for (let x = 0 ; x < bags[i].inventory.length; x++){
                    if(bags[i].inventory[x]){
                        
                        info[i][x] = data[a]
                        a++
                    }
                    else{
                    info[i][x] = bags[i].inventory[x]
                    }
                }
            }
            else{
                info[i] = bags[i].inventory
            }
        }
        this.setState({inventory:info})
    }

    async backstoryInfo(story) {

        var response = await fetch(`https://api.guildwars2.com/v2/backstory/answers?ids=${story.join(",")}`)
        var info = await response.json()
        
        this.setState({backstory:info})
    }

    changeview(view) {
        this.setState({viewstate: view})
    }

    render() {

        return (
            <React.Fragment>
                <div id='account_view'>
                    <div id='menu'>
                        <div id='key_form'>
                            <input id='api-key' type="text" placeholder='API key'/>
                            <button className="btn btn-dark" onClick={() => this.verify_key()}>Submit</button>
                        </div>
                        <h3>Account</h3>
                        <div className='menu_content'>
                            <div>
                                <div>Characters</div>
                                <div id='chara_list'>
                                    {!this.state.chara_list ? (<React.Fragment/>):(this.state.chara_list.map(item => {return <li key={item} onClick={() => {this.load_character(this.state.api_key, item);this.changeview(null)}}>{item}</li>}))}
                                </div>
                            </div>
                            
                            {this.state.valid_key && <div onClick={() => this.load_bank(this.state.api_key)}>Bank</div>}
                        </div>
                    </div>
                    <div id='character_sheet'>
                        {this.state.character &&
                            <React.Fragment>
                                <div id='chara_header'>
                                    <div><h2>{this.state.character.name}</h2></div>
                                    <div id='chara_detail'>
                                        <div id='chara_info'>
                                            <div>Race: {this.state.character.race}</div>
                                            <div>Profession: {this.state.character.profession}</div>
                                            <div>Level: {this.state.character.level}</div>
                                            <div>Playtime: {SecToHours(this.state.character.age)}</div>
                                            <div>Created: {new Date(this.state.character.created).toLocaleString()}</div>
                                        </div>
                                        <div id='chara_menu'>
                                            <li onClick={() => {this.equipmentInfo(this.state.character.equipment);this.changeview(1)}}>Equipment</li>
                                            <li onClick={() => {this.traitInfo(this.state.character.specializations);this.skillInfo(this.state.character.skills);this.changeview(2)}}>Build</li>
                                            <li onClick={() => {this.inventoryInfo(this.state.character.bags);this.changeview(3)}}>Inventory</li>
                                            <li onClick={() => {this.backstoryInfo(this.state.character.backstory);this.changeview(4)}}>Backstory</li>
                                        </div>
                                    </div>
                                </div>
                                <hr></hr>
                            </React.Fragment>
                            }
                        {(this.state.viewstate !== 1) || !this.state.equipment ? (<React.Fragment/>):(<CharaGear gear = {this.state.equipment}/>)}
                        {(this.state.viewstate !== 2) || !this.state.skills || !this.state.traits ? (<React.Fragment/>) : (<Charabuild skills = {this.state.skills} traits = {this.state.traits}/>)}
                        {(this.state.viewstate !== 3) || !this.state.inventory ? (<React.Fragment/>): (<Inventory bags = {this.state.inventory} info = {this.state.character.bags}/>)}
                        {(this.state.viewstate !== 4) || !this.state.backstory  ? (<React.Fragment/>):(<Backstory journal = {this.state.backstory}/>)}
                    </div>
                </div>
            </React.Fragment>);
    }
}
 
export default AccountPage;