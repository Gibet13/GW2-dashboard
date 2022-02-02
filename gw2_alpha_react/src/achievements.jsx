import React from 'react';

import './assets/achievements.css';


import header from './layouts/header.jsx';


class MainWrapper extends React.Component {
    state = {
        loading_groups: true,
        loading_categories: true,
        groups_ids: null,
        groups_info:null,
        categories_info: null
    }

    async componentDidMount () {
        
        fetch("https://api.guildwars2.com/v2/achievements/groups")
        .then(response => response.json())
        .then(result => {
             
            this.setState({groups_ids: result});
            
        })
    }

    async fetchname(ids) {
        
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
                console.log(this.state.categories_info)
            })
            
            this.state.loading_categories = false;
        }      
    }

    render() {

        if(!this.state.groups_info){
            this.fetchname(this.state.groups_ids)
        }

        return (
            <React.Fragment>
                {header}
                <div id='page_view'>
                    <div id='menu_content'>
                        <h3>Navigation</h3>
                        <hr></hr>
                        {
                            this.state.loading_groups || !this.state.groups_info ? (
                                <div>Loading...</div>
                                ) : (
                                <div id="menu_content">
                                    {this.state.groups_info.map(item => { return <li key={item.id} title={item.description} onClick={() => this.fetchgroup(item.categories)}>{item.name}</li>})}
                            </div>)
                        }
                    </div>
                    <div id='content'>
                        <nav  className="navbar navbar-dark">
                            <div className="container-fluid">
                                <a className="navbar-brand" href="#">Categories</a>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#CATNav" aria-controls="CATNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="CATNav">
                                    <ul id="cat_navbar" className="navbar-nav">
                                        {this.state.loading_categories || !this.state.categories_info ? 
                                            (<div>Select an achievement group</div>)
                                             : 
                                            (<div id="menu_content">
                                                {this.state.categories_info.map(item => { return <li key={item.id}><img src={item.icon}/>{item.name}</li>})}
                                            </div>)
                                        }
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default MainWrapper;