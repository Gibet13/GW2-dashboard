import React from 'react';

import '../assets/tooltip.css'

function Tooltip(props) {
    return  <div className='tool_tip'>
                <div className='tooltip_header'>
                    <img src={props.focus.item.icon} alt="" />
                    <div>{props.focus.item.name}</div>
                </div>
                <hr />
                {props.focus.item.details && 
                <div className='tooltip_stats'>
                    <div>level: {props.focus.item.level}</div>
                    <div>
                        {!props.focus.item.details.defense ? (<React.Fragment/>):(<div>{props.focus.item.details.defense} armor</div>)}
                        {!props.focus.item.details.min_power ? (<React.Fragment/>):(<div>{props.focus.item.details.min_power}-{props.focus.item.details.max_power} damage</div>)}
                    </div>
                </div>}
                <div className='tooltip_description'>
                    <div dangerouslySetInnerHTML={{__html: props.focus.item.description}}/>
                </div>
                <div className='tooltip_label'>
                    <div>{props.focus.item.rarity}</div> - <div>{props.focus.item.type}</div>
                </div>
            </div>
}

export default Tooltip