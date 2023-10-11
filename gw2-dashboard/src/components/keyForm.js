import React, { useState } from 'react';


//this component is used to verify the api key and store it in the local storage if it is valid
const KeyForm = () => {

    const verifyKey = async () => {
        let key = document.getElementById('api-key').value;
        var response = await fetch(`https://api.guildwars2.com/v2/account?access_token=${key}`)
        var result = await response.json()
        
        //if the key is not valid display an error message
        if(result.text === 'Invalid access token') {
            alert('invalid api key');
        }
        else{
            localStorage.setItem("api_key", key)
            alert("valid key")
        }
    }

    return <div id='key_form'>
        <input id='api-key' type="text" placeholder='API key'/>
        <button onClick={verifyKey}>Submit</button>
    </div>
}

export default KeyForm