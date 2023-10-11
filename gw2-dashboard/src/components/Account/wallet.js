import React, { useEffect, useState } from 'react';


// this component is used to display the wallet of the account
const Wallet = ({content}) => {

    const [ currencies, setCurrencies ] = useState(null)

    useEffect(()=>{
        !currencies && load_currencies()
    })

    const load_currencies = async() => {
        
        // get the ids of the currencies in the wallet
        var ids = []
        content.forEach(currency => {
            ids.push(currency.id)
        })

        // query returning the currencies details based on the ids provided
        var response = await fetch(`https://api.guildwars2.com/v2/currencies?ids=${ids.join(",")}`)
        var data = await response.json()

        setCurrencies(data)
    }

    return  <>{currencies &&
                <div id='wallet'>
                    <h3>Wallet</h3>
                    
                    <div id='currencies'>
                        {content.map((currency, index) => {
                            return  <div className='currency' key={index} title={currencies[index].description}>
                                        <img src={currencies[index].icon} alt="" />
                                        {`${currency.value} ${currencies[index].name}`}
                                    </div>
                        })}
                    </div>
                </div>
            }</>
}

export default Wallet