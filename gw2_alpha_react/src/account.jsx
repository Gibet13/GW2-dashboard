import React, { Component } from 'react';

import './assets/account.css'

class AccountPage extends Component {
    state = { 
        api_key:null,
        characters:null
    }
    render() { 
        return (
            <React.Fragment>
                <div id='account_view'>
                    <div id='menu'>
                        <h3>Account</h3>
                        <div>
                            <input type="text" placeholder='API key'/>
                            <button>Submit</button>
                        </div>
                        <div>characters</div>
                        <div>Bank</div>
                    </div>
                    <div id='character_sheet'>
                        <div id='chara_header'>
                            <div id='chara_info'>
                                <div>character info</div>
                            </div>
                            <div id='chara_menu'>
                                <div>Gear</div>
                                <div>Build</div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>);
    }
}
 
export default AccountPage;