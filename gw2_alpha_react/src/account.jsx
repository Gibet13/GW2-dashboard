import React, { Component } from 'react';

import Charabuild from './layouts/build';
import CharaGear from './layouts/equipement';
import Backstory from './layouts/Story';
import Inventory from './layouts/inventory';

import { SecToHours } from './helpers/utils.js'
import Wallet from './layouts/wallet';

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
        bank_item:null,
        bank:[],
        wallet:null,
        currencies:null
    }

    render() {

        return (
            <React.Fragment>
                <div id='account_view'>
                    <div className='act_scrollmenu' id='menu'>
                        {this.state.valid_key && <div className='menu_content'>
                            <div className='dropdown'>
                                <button className='dropbtn'>Characters</button>
                                <div className='dropdown-content' id='chara_list'>
                                    {!this.state.chara_list ? (<React.Fragment/>):(this.state.chara_list.map(item => {return <li key={item} onClick={() => {this.load_character(this.state.api_key, item);this.changeview(null)}}>{item}</li>}))}
                                </div>
                            </div>
                            
                            <span onClick={() => {this.changeview(5);this.inventoryInfo(this.state.bank, 'bank')}}>Bank</span>
                            <span onClick={() => {this.changeview(6);this.walletInfo(this.state.wallet)}}>Wallet</span>
                        </div>}
                        <div id='key_form'>
                            <input id='api-key' type="text" placeholder='API key'/>
                            <button className="btn btn-dark" onClick={() => this.verify_key()}>Submit</button>
                        </div>
                    </div>
                    {this.state.viewstate < 5 && <div id='character_sheet'>
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
                    </div>}
                    {(this.state.viewstate !== 5) || !this.state.bank_item ? (<React.Fragment/>): (
                    <div className='Bank'>
                        <h2>Bank</h2>
                        <Inventory bags = {this.state.bank_item} info = {this.state.bank}/>
                    </div>)}
                    {(this.state.viewstate !== 6) || !this.state.currencies ? (<React.Fragment/>): (
                        <Wallet wallet = {this.state.wallet} currencies = {this.state.currencies}/>
                        )}
                </div>
            </React.Fragment>);
    }

    async verify_key() {

        // envoie un requete avec la clé rentré par l'utilisateur
        let key = document.getElementById('api-key').value;
        var response = await fetch(`https://api.guildwars2.com/v2/account?access_token=${key}`)
        var result = await response.json()
        
        //si la clé est invalide un message est affiché
        if(result.text === 'Invalid access token') {
            alert('invalid api key');
        }
        else{
            this.setState({api_key: key})
            this.state.valid_key = true;
            this.load_characters(key)
            this.load_bank(key)
            this.load_wallet(key)
        }
    }

    async load_characters(key) {
        
        //requete renvoyant uniquement les noms des personnages du compte
        var response = await fetch(`https://api.guildwars2.com/v2/characters?access_token=${key}`)
        var result = await response.json()

        this.setState({chara_list: result})       
    }

    async load_bank(key) {
        
        // requete retournant les ids et compte des item contenu dans la banque du compte
        var response = await fetch(`https://api.guildwars2.com/v2/account/bank?access_token=${key}`)
        var result = await response.json()

        // afin de pouvoir utiliser la fonction inventoryInfo la variable bank est formaté comme un inventaire 
        this.state.bank.push({inventory:result})
    }

    async load_wallet(key) {

        //requete retournant le compte des differente monnaie comptenu dans le porte-feuille
        var response = await fetch(`https://api.guildwars2.com/v2/account/wallet?access_token=${key}`)
        var result = await response.json()

        this.state.wallet = result
    }

    async load_character(key, name) {
        
        this.setState({character: null})

        // requete retournant les info détaillé d'un personnage
        var response = await fetch(`https://api.guildwars2.com/v2/characters/${name}?access_token=${key}`)
        var result = await response.json()
            
        this.setState({character: result})
    }

    async walletInfo(wallet){

        // place les ids des differente monnaies dans une liste
        var ids = []
        wallet.forEach(element => {
            ids.push(element.id)
        })

        //requete retournant les détails de chaque monnaie
        var response = await fetch(`https://api.guildwars2.com/v2/currencies?ids=${ids.join(",")}`)
        var data = await response.json()

        this.setState({currencies:data})
    }

    async equipmentInfo(equipment) {

        this.setState({equipment:null})
        
        var ids = []
        var info = []

        // place les ids dans une liste
        equipment.forEach(element => {
                ids.push(element.id)
        });
        
        // requete retournant les infos de chaque items
        var response = await fetch(`https://api.guildwars2.com/v2/items?ids=${ids.join(",")}`)
        var data = await response.json()

        // ajoute un label a chaque piece d'équipement
        for(var i = 0; i < ids.length; i++){

            info[equipment[i].slot] = data[i]
        }

        this.setState({equipment:info})
    }

    async skillInfo(skills) {

        this.setState({skills:null})

        // place les ids dans une liste
        var ids = [skills.pve.heal, skills.pve.utilities[0], skills.pve.utilities[1], skills.pve.utilities[2],skills.pve.elite]
        var info = []

        // requete retournant les infos de chaque skill
        var response = await fetch(`https://api.guildwars2.com/v2/skills?ids=${ids.join(",")}`)
        var data = await response.json()
        
        // ajoute un label a chaque skill
        for(var i = 0; i < ids.length; i++){

            info[`${data[i].type}${i}`] = data[i]
        }
        
        this.setState({skills:info})
    }

    async traitInfo(traits) {

        this.setState({traits:null})
        
        // place les ids dans une liste
        var ids = [traits.pve[0].id,traits.pve[1].id,traits.pve[2].id]

        // requete retournant les infos de chaque trait
        var response = await fetch(`https://api.guildwars2.com/v2/specializations?ids=${ids.join(",")}`)
        var info = await response.json()
        
        this.setState({traits:info})
    }

    async inventoryInfo(bags, type) {

        this.setState({inventory:null})
        
        var ids = []
        var info = []
        
        //pour chaque sac dans l'inventaire
        for(let i = 0; i < bags.length; i++){
            ids[i] = []
            info[i] = []
            var a = 0
            var duplicate = false

            // place les ids dans une liste
            for(let y = 0; y < bags[i].inventory.length; y++){
                if(bags[i].inventory[y]){
                    ids[i].push(bags[i].inventory[y].id)
                }    
            }
            
            // si le sac n'est pas vide
            if(ids[i].length !== 0){
                // requete retournant les infos de chaque items
                var response = await fetch(`https://api.guildwars2.com/v2/items?ids=${ids[i].join(",")}`)
                var data = await response.json()
                
                // pour chaque item non nul dans le sac 
                for (let x = 0 ; x < bags[i].inventory.length; x++){
                    if(bags[i].inventory[x]){
                        //on verifie si l'item existe en double dans les item le precedant dans le sac
                        for (let b = 0 ; b < x; b++){
                            
                            duplicate = false
                            if(bags[i].inventory[b]){
                                //si un double est trouvé dans le sac il est rajouté dans le sac a son emplacement dans le sac
                                if(info[i][b].id === bags[i].inventory[x].id){

                                    duplicate = true
                                    info[i][x] = info[i][b]
                                    break
                                }
                            }
                        }
                        //si aucun duplicat n'est trouvé on passe a l'item suivants
                        if(!duplicate){
                            info[i][x] = data[a]
                            a++
                        }  
                    }
                    //si l'item est nul on l'ajoute au sac
                    else{
                    info[i][x] = bags[i].inventory[x]
                    }
                }
            }
            //si le sac est vide pas de requete necessaire
            else{
                info[i] = bags[i].inventory
            }
        }
        if(type === 'bank'){
            this.setState({bank_item:info})
        }
        else{
            this.setState({inventory:info})
        }
        
    }

    async backstoryInfo(story) {
        
        this.setState({backstory:null})

        // requete retournant les infos de chaque backstory
        var response = await fetch(`https://api.guildwars2.com/v2/backstory/answers?ids=${story.join(",")}`)
        var info = await response.json()
        
        this.setState({backstory:info})
    }

    changeview(view) {
        this.setState({viewstate: view})
    }

}
 
export default AccountPage;