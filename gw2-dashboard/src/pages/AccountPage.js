import React, { useEffect, useState } from 'react';
import CharacterMenu from '../components/characterMenu';
import CharacterSheet from '../components/characterSheet';
import Inventory from '../components/Character/inventory';
import Wallet from '../components/Account/wallet';


const AccountPage = () => {

    const [ key, setKey ] = useState(localStorage.api_key)
    const [ allCharacters , setAllCharacters ] = useState(null)
    const [ character , setCharacter ] = useState(null)
    const [ bank, setBank ] = useState([])
    const [ wallet, setWallet ] = useState()
    const [ viewState, setViewState ] = useState(0)

    useEffect(()=>{

        if(key && !allCharacters){

            loadAllCharacters()
            loadWallet()
            loadBank()
        }
    }, [])


    const loadAllCharacters = async () => {
        // query returning the list of characters of the account based on the api key provided
        var response = await fetch(`https://api.guildwars2.com/v2/characters?access_token=${key}`)
        var result = await response.json()

        setAllCharacters(result)
    }

    const loadCharacter = async (name) => {
        setCharacter(null)

        // query returning the detail of a character based on the name provided
        var response = await fetch(`https://api.guildwars2.com/v2/characters/${name}?access_token=${key}`)
        var result = await response.json()
        
        setViewState(1)    
        setCharacter(result)
    }

    const loadWallet = async () => {
        // query returning the wallet of the account based on the api key provided
        var response = await fetch(`https://api.guildwars2.com/v2/account/wallet?access_token=${key}`)
        var result = await response.json()

        setWallet(result)
    }

    const loadBank = async () => {
        // query returning the bank of the account based on the api key provided
        var response = await fetch(`https://api.guildwars2.com/v2/account/bank?access_token=${key}`)
        var result = await response.json()

        setBank(...bank, {inventory: result})
    }

    return <>
        <div className='page-container'>
            {key &&
                <>
                    <div className="account-menu">
                        {allCharacters &&
                            <CharacterMenu
                                characters={allCharacters}
                                handleClick={loadCharacter}
                            />
                        }
                        <li onClick={() => setViewState(2)}>Bank</li>
                        <li onClick={() => setViewState(3)}>Wallet</li>
                    </div>
                    {(viewState === 1 && character) && <CharacterSheet character={character} />}
                    {(viewState === 2 && bank) && <Inventory bags={[bank]} />}
                    {(viewState === 3 && wallet) && <Wallet content={wallet} />}
                </>
            }
        </div>
    </>
}

export default AccountPage