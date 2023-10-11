import React from 'react';


//this component is used to display the tooltip when the trait is focused
const TraitTooltip = ({trait}) => {

    return  <div className='tool_tip'>
                <div className='tooltip_header'>
                    <img src={trait.icon} alt="" />
                    <div>{trait.name}</div>
                </div>
                <div className='tooltip_description' dangerouslySetInnerHTML={{__html: trait.description}}/>
            </div>
}

export default TraitTooltip