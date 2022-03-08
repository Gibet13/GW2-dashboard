import React from 'react';

import '../assets/wallet.css'

function Wallet(props){

    return  <>
                <h3>Wallet</h3>
                <br />
                <div id='wallet'>
                    {props.wallet.map((currency, index) => {
                        return <div>
                            <img src={props.currencies[index].icon} alt="" />
                            {`${currency.value} ${props.currencies[index].name}`}
                            </div>
                    })}
                </div>
            </>
}
export default Wallet