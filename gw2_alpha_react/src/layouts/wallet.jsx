import React from 'react';

function Wallet(props){

    return  <div id='wallet'>
                <h3>Wallet</h3>
                
                <div id='currencies'>
                    {props.wallet.map((currency, index) => {
                        return  <div title={props.currencies[index].description}>
                                    <img src={props.currencies[index].icon} alt="" />
                                    {`${currency.value} ${props.currencies[index].name}`}
                                </div>
                    })}
                </div>
            </div>
}
export default Wallet