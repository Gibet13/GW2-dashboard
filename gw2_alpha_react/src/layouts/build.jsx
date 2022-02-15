import React from 'react';

import '../assets/build.css'

import Skill from '../components/skill';
import Traitline from '../components/traitline';

function Charabuild(build) {

    return  <div id="build">
                <h2>Build</h2>
                <div id="skill-bars">
                    <div className="skill_bar">
                        
                        <div className="off_hand">
                            <Skill skill = {build.skills.Heal0}/>
                            <Skill skill = {build.skills.Utility1}/>
                            <Skill skill = {build.skills.Utility2}/>
                            <Skill skill = {build.skills.Utility3}/>
                            <Skill skill = {build.skills.Elite4}/>
                        </div>
                    </div>
                
                </div>
                <div id="trait-lines">
                    <Traitline line = {build.traits[0]}/>
                    <Traitline line = {build.traits[1]}/>
                    <Traitline line = {build.traits[2]}/>
                </div>
            </div>
}

export default Charabuild