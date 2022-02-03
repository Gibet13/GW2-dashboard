import React from 'react';

import './assets/achievements.css';
import header from './layouts/header.jsx';
import Achievements from './helpers/utils';


class MainWrapper extends React.Component {
    state = {
        loading_groups: true,
        loading_categories: true,
        loading_achivements:true,
        groups_ids: null,
        groups_info:null,
        categories_info: null,
        achievements_info:null
    }

    async componentDidMount () {
        
        fetch("https://api.guildwars2.com/v2/achievements/groups")
        .then(response => response.json())
        .then(result => {
             
            this.setState({groups_ids: result});
            
        })
    }

    async fetchgroupsinfo(ids) {
        
        var id_list = ids.join(',')
 
        fetch(`https://api.guildwars2.com/v2/achievements/groups?ids=${id_list}`)
        .then(response => response.json())
        .then(groups => {
                
            this.setState({groups_info: groups});

        })
        this.state.loading_groups = false;      
    }

    async fetchgroup (ids) {

        
        if(ids.length != 0) {
            var id_list = ids.join(',')
            
            fetch(`https://api.guildwars2.com/v2/achievements/categories?ids=${id_list}`)
            .then(response => response.json())
            .then(group => {
                
                this.setState({categories_info: group});
    
            })
            this.state.loading_categories = false;
        }      
    }

    async fetchcategory(ids) {

        var id_list = ids.join(',')
            
        fetch(`https://api.guildwars2.com/v2/achievements?ids=${id_list}`)
        .then(response => response.json())
        .then(category => {
                
            this.setState({achievements_info: category});
            
        })
        this.state.loading_achivements = false;
    }

    showGroup() {
        const button = document.getElementById('group_toggle')
        if (button.getAttribute('aria-expanded') === 'false') {
                button.click()
        }
    }

    hideGroup() {
        const button = document.getElementById('group_toggle')
        if (button.getAttribute('aria-expanded') === 'true') {
                button.click()
        }
    }

    render() {

        if(!this.state.groups_info){
            this.fetchgroupsinfo(this.state.groups_ids)
        }

        return (
            <React.Fragment>
                {header}
                <div id='page_view'>
                    <div id='menu_content'>
                        <h3>Navigation</h3>
                        <hr></hr>
                        {
                            this.state.loading_groups || !this.state.groups_info ? (<div>Loading...</div>)
                                 : 
                                (<div id="menu_content">
                                    {this.state.groups_info.map(item => { return <li key={item.id} title={item.description} onClick={() => {this.fetchgroup(item.categories); this.showGroup()}}>{item.name}</li>})}
                                </div>
                            )
                        }
                    </div>
                    <div id='content'>
                        <div id='categories'>
                            <nav  className="navbar navbar-dark">
                                <div className="container-fluid">
                                    <a className="navbar-brand" href="#">Categories</a>
                                    <button id='group_toggle' className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#CATNav" aria-controls="CATNav" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="CATNav">
                                        <ul id="cat_navbar" className="navbar-nav">
                                            {this.state.loading_categories || !this.state.categories_info ?
                                                (<div>Select an achievement group</div>)
                                                 :
                                                (<div id="menu_content">
                                                    {this.state.categories_info.map(item => { return <li key={item.id} onClick={() => {this.fetchcategory(item.achievements); this.hideGroup()}}><img src={item.icon}/>{item.name}</li>})}
                                                </div>)
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        <div id='achivements' class="accordion accordion-flush">
                                {!this.state.achievements_info ?(<div>Prout</div>):(<Achievements ach_list = {this.state.achievements_info}/>)}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default MainWrapper;