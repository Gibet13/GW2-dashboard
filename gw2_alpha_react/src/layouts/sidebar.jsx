import React, { Component } from 'react';

import '../assets/sidebar.css'
import load_groups from '../helpers/utils.jsx';

class Sidebar extends Component {
    state = {
        loading: true,
        groups_ids: null,
        groups_name:null
    }

    async componentDidMount () {
        
        fetch("https://api.guildwars2.com/v2/achievements/groups")
        .then(response => response.json())
        .then(result => {
             
            this.setState({groups_ids: result});
            
        })
    }

    async fetchname(ids) {
        
        var names = []

        ids.forEach(element => {
            fetch(`https://api.guildwars2.com/v2/achievements/groups/${element}`)
            .then(response => response.json())
            .then(group => {
                
                names.push(group.name) 
                this.setState({groups_name: names});
            })
            this.state.loading = false; 
        });   
    }

    render() {
        
        if(!this.state.groups_name){
            this.fetchname(this.state.groups_ids)
        }
        
        return (
            <React.Fragment>
                <h3>Navigation</h3>
                <hr></hr>
                    
                {this.state.loading || !this.state.groups_name ? (
                    <div>Loading...</div>
                ) : (
                    <div id="menu_content">{this.state.groups_name.map(item => { return <li key={item}>{item}</li>})}</div>
                )}

            </React.Fragment>
        );
    }
    
}


export default Sidebar;