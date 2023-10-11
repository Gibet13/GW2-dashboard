import React, { useState } from 'react';
import SkillTooltip from './Tooltip/skillTooltip';


//this component is used to display a skill
const Skill = ({skill}) => {

    const [ focused,setFocused ] = useState(false)

    const handleFocus = () => {
        setFocused(true)
    }

    const handleBlur = () => {
        setFocused(false)
    }

    return  <div className='item' title={skill.name} tabIndex="0" onFocus={handleFocus} onBlur={handleBlur}>
                <img className={skill.type} src={skill.icon} alt="" />
                {focused && <SkillTooltip skill = {skill}/>}
            </div>
}

export default Skill