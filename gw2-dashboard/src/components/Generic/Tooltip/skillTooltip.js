import React from 'react';

//this component is used to display the tooltip when the skill is focused
const SkillTooltip = ({skill}) => {

    return  <div className='tool_tip'>
                <div className='tooltip_header'>
                    <img src={skill.icon} alt="" />
                    <div>{skill.name}</div>
                </div>
                <div className='tooltip_description' dangerouslySetInnerHTML={{__html: skill.description}}/>
            </div>
}

export default SkillTooltip