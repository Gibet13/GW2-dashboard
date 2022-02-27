import React from 'react';

import '../assets/tooltip.css'

export function Tooltip(props) {
    return  <div className='tool_tip'>
                <div className='tooltip_header'>
                    <img src={props.focus.item.icon} alt="" />
                    <div>{props.focus.details && <React.Fragment>{props.focus.details.count > 1 && <span>{`${props.focus.details.count} `}</span>}</React.Fragment>}{props.focus.item.name}</div>
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
                </div><br />
                <div className='tooltip_label'>
                    
                    <div>
                        <div>{props.focus.item.rarity}</div> - <div>{props.focus.item.type}</div>
                    </div>
                    <React.Fragment>{props.focus.details && <React.Fragment>
                        {props.focus.details.binding  && <div>Bound to {!props.focus.details.bound_to ? (<React.Fragment>{props.focus.details.binding}</React.Fragment>)
                            :
                            (<React.Fragment>{props.focus.details.bound_to}</React.Fragment>)}</div>}
                        </React.Fragment>}
                    </React.Fragment>
                </div>
            </div>
}

export function SkillTooltip(props){
    return  <div className='tool_tip'>
                <div className='tooltip_header'>{props.focus.skill.name}</div>
                <hr />
                <div className='tooltip_description' dangerouslySetInnerHTML={{__html: props.focus.skill.description}}/>
            </div>
}

export function TraitTooltip(props){
    return  <div className='tool_tip'>
                <div className='tooltip_header'>{props.focus.trait.name}</div>
                <hr />
                <div className='tooltip_description' dangerouslySetInnerHTML={{__html: props.focus.trait.description}}/>
            </div>
}
