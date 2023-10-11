import React, { useState } from 'react';
import TraitTooltip from '../Tooltip/traitTooltip';


//this component is used to display a trait
const Trait = ({trait}) => {

    const [ focused,setFocused ] = useState(false)

    const handleFocus = () => {
        setFocused(true)
    }

    const handleBlur = () => {
        setFocused(false)
    }

    return  <div className='trait' title={trait.name} tabIndex="0" onFocus={handleFocus} onBlur={handleBlur}>
                <img className="trait" src={trait.icon} alt="" />
                {focused && <TraitTooltip trait = {trait}/>}
            </div>
}

export default Trait