import React, { Component } from 'react';
import load_groups from '../helpers/utils.js'

import '../assets/sidebar.css'

class Sidebar extends Component {
    state = {
        menu_items: load_groups()
    }

    render() { 
        return (
            <div id="navigation_menu">
                    <h3>Navigation</h3>
                    <hr></hr>
                    <ul>
                        {this.state.menu_items.map(item => {
                            return <li key={item.key}>{item.value}</li>
                        })}
                    </ul>
                </div>
        );
    }
    
}


export default Sidebar;