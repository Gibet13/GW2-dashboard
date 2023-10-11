import React, { useEffect, useState } from 'react';
import Skill from '../Generic/skill';
import Traitline from '../Generic/Traits/Traitline';


// this component is used to display the build of a character
const Build = ({skills, traits}) => {

    const [ skillsInfo, setSkillsInfo ] = useState(null)
    const [ traitsInfo, setTraitsInfo ] = useState(null)
    const [ specialization, setSpecialization ] = useState(null)

    useEffect(()=>{
        !skillsInfo && load_skills_info()
        !traitsInfo && load_traits_info()
    })

    // this function is used to get the information of the skills and traits of the character build
    const load_skills_info = async () => {

        setSkillsInfo(null)

        // put the ids in a list
        var ids = [skills.pve.heal, skills.pve.utilities[0], skills.pve.utilities[1], skills.pve.utilities[2],skills.pve.elite]
        var info = []

        // query returning the skills of a character based on the ids provided
        var response = await fetch(`https://api.guildwars2.com/v2/skills?ids=${ids.join(",")}`)
        var data = await response.json()
        
        // for each skill in the build we add it to the info list with the type of skill as key
        for(var i = 0; i < ids.length; i++){

            info[`${data[i].type}${i}`] = data[i]
        }
        
        setSkillsInfo(info)
    }
    
    // this function is used to get the information of the traits of the character build
    const load_traits_info = async () => {

        setTraitsInfo(null)
        
        // out the ids in a list
        var ids = [traits.pve[0].id,traits.pve[1].id,traits.pve[2].id]

        // query returning the traits of a character based on the ids provided
        var response = await fetch(`https://api.guildwars2.com/v2/specializations?ids=${ids.join(",")}`)
        var info = await response.json()
        
        setTraitsInfo(info)

        // set the specialization of the character based on the third traitline
        if (info[2].elite) {
            setSpecialization(info[2].name)
        } else {
            setSpecialization(info[2].profession)
        }
    }

    return <>{traitsInfo &&
                <div id="build"  >
                    <h2>Build</h2>
                    
                    {skillsInfo && <div className="skill_bar">
                        <div>Utility Skills:</div>
                        <div className="off_hand">
                            <Skill skill = {skillsInfo.Heal0}/>
                            <Skill skill = {skillsInfo.Utility1}/>
                            <Skill skill = {skillsInfo.Utility2}/>
                            <Skill skill = {skillsInfo.Utility3}/>
                            <Skill skill = {skillsInfo.Elite4}/>
                        </div>
                    </div>}

                    <div className="Specializations">
                        <div className={`bg-image ${specialization}`} />
                        {traitsInfo && <div id="trait-lines">
                            <Traitline line = {traitsInfo[0]}/>
                            <Traitline line = {traitsInfo[1]}/>
                            <Traitline line = {traitsInfo[2]}/>
                        </div>}
                    </div>
                </div>
            }</>
}

export default Build