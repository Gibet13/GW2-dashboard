import React from 'react';

import './assets/achievements.css';
import Achievements from './layouts/achievementsView';


class AchievementsPage extends React.Component {
    state = {
        loading_groups: true,
        loading_categories: true,
        currentview:null,
        groups_ids: null,
        groups_info:null,
        categories_info: null,
        achievements_info:null
    }

    render() {

        if(!this.state.groups_info){
            this.fetchgroupsinfo(this.state.groups_ids)
        }

        return (
            <React.Fragment>
                <div id='page_view'>
                    <div className='scrollmenu' id='achmenu'>
                        {
                            this.state.loading_groups || !this.state.groups_info ? (<div>Loading...</div>)
                                 : 
                                (<>
                                    {this.state.groups_info.map(item => { return <li key={item.id} title={item.description} onClick={() => {this.fetchgroup(item.categories); this.showGroup();this.changeLabel(item.name)}}>{item.name}</li>})}
                                </>
                            )
                        }
                    </div>
                    <div id='content'>
                        <div id='categories'>
                            <nav  className="navbar navbar-dark">
                                <div className="container-fluid">
                                    <a className="navbar-brand" href="#">{this.state.currentview ? (<div>{this.state.currentview}</div>):(<React.Fragment></React.Fragment>)}</a>
                                    <button id='group_toggle' className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#CATNav" aria-controls="CATNav" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="CATNav">
                                        <ul id="cat_navbar" className="navbar-nav">
                                            {this.state.loading_categories || !this.state.categories_info ?
                                                (<div>Select an achievement group</div>)
                                                 :
                                                (<div id="menu_content">
                                                    {this.state.categories_info.map(item => { return <li key={item.id} onClick={() => {this.fetchcategory(item.achievements); this.hideGroup(); this.changeLabel(item.name)}}><img src={item.icon}/>{item.name}</li>})}
                                                </div>)
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        {!this.state.achievements_info ?(<React.Fragment></React.Fragment>):(<Achievements ach_list = {this.state.achievements_info}/>)}
                    </div>
                </div>
            </React.Fragment>
        );
    }

    async componentDidMount () {
        
        fetch("https://api.guildwars2.com/v2/achievements/groups")
        .then(response => response.json())
        .then(result => {
             
            this.setState({groups_ids: result});
            
        })
    }

    async fetchgroupsinfo(ids) {
 
        fetch(`https://api.guildwars2.com/v2/achievements/groups?ids=${ids.join(',')}`)
        .then(response => response.json())
        .then(groups => {
                
            this.setState({groups_info: groups});

        })
        this.state.loading_groups = false;      
    }

    async fetchgroup (ids) {
        
        if(ids.length != 0) {
            
            fetch(`https://api.guildwars2.com/v2/achievements/categories?ids=${ids.join(',')}`)
            .then(response => response.json())
            .then(group => {
                
                this.setState({categories_info: group});
    
            })
            this.state.loading_categories = false;
        }      
    }

    async fetchcategory(ids) {
            
        fetch(`https://api.guildwars2.com/v2/achievements?ids=${ids.join(',')}`)
        .then(response => response.json())
        .then(category => {
                
            this.setState({achievements_info: category});
            
        })
    }

    changeLabel(name) {
        this.setState({currentview: name});
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
}
 
export default AchievementsPage;