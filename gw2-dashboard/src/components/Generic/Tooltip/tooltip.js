import React from 'react';

// this component is used to display the tooltip of an item 
const ItemTooltip = ({item, details}) => {

    return  <div className='tool_tip'>
                <div className='tooltip_header'>
                    <img src={item.icon} className={item.rarity} alt="" />
                    <div>
                        {details && 
                            <>
                                {details.count > 1 && <span>{`${details.count} `}</span>}
                            </>
                        }{item.name}
                    </div>
                </div>
                <hr />

                {item.details && 
                    <div className='tooltip_stats'>
                        <div>level: {item.level}</div>
                        <div>
                            {!item.details.defense ? (<></>):(<div>{item.details.defense} armor</div>)}
                            {item.details.min_power && (<div>{item.details.min_power}-{item.details.max_power} damage</div>)}
                        </div>
                    </div>
                }

                <div className='tooltip_description'>
                    <div dangerouslySetInnerHTML={{__html: item.description}}/>
                </div>
                <br />

                <div className='tooltip_label'>
                    
                    <div>
                        <div>{item.rarity}</div> - <div>{item.type}</div>
                    </div>
                    <>
                        {details && <>
                            {details.binding  && <div>Bound to {!details.bound_to ? 
                                (<>{details.binding}</>)
                                :
                                (<>{details.bound_to}</>)}</div>}
                            </>
                        }
                    </>
                </div>
            </div>
}

export default ItemTooltip