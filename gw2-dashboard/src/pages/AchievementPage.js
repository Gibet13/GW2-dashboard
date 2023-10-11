import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Achievement from '../components/Achievements/Achievement';


const AchievementsPage = () => {

    const [ groups, setGroups] = useState(null)
    const [ categories, setCategories ] = useState(null)
    const [ achievements, setAchievements] = useState(null)
    const [ accountAchievements, setAccountAchievements] = useState(null)

    useEffect(()=>{

        !groups && loadAllGroups()
        !accountAchievements && loadAccountAchievements()

    }, [groups, categories, achievements])
    

    // load all the groups of achievements
    const loadAllGroups = async() => {
        let groupsFetch = await fetch("https://api.guildwars2.com/v2/achievements/groups")
        let ids = await groupsFetch.json()

        let response = await fetch(`https://api.guildwars2.com/v2/achievements/groups?ids=${ids.join(',')}`)
        let results = await response.json()

        setGroups(results)
    }

    const loadAccountAchievements = async() => {

        if(!localStorage.getItem('api_key')){return}
        
        let accountResponse = await fetch(`https://api.guildwars2.com/v2/account/achievements?access_token=${localStorage.getItem('api_key')}`)
        let accountResults = await accountResponse.json()

        setAccountAchievements(accountResults)
    }

    const loadGroup = async (index, ids) => {

        const tempGroups = [...groups]

        let response = await fetch(`https://api.guildwars2.com/v2/achievements/categories?ids=${ids.join(',')}`)
        let results = await response.json()

        tempGroups[index].details = results
        setGroups(tempGroups)
    }

    const loadCategory = async (name, ids) => {

        if (ids.length != 0) {
            let response = await fetch(`https://api.guildwars2.com/v2/achievements?ids=${ids.join(',')}`)
            let results = await response.json()

            setAchievements(results)
        }
    }

    return <div className='page-container achievements-page'>{ groups &&
        <div className="achievements-menu">
            <Accordion>
                {groups.map((group, index) => {
                    return <Accordion.Item eventKey={index} key={index}>
                        <Accordion.Header onClick={()=>{loadGroup(index ,group.categories)}}>
                            {group.name}
                        </Accordion.Header>
                        <Accordion.Body>
                            {group.details && <div id='category-menu'>{group.details.map((category, index) => {
                                return  <li key={index} onClick={() => loadCategory(category.name, category.achievements)}>
                                            <img src={category.icon}></img>{category.name}
                                        </li>
                            })}</div>}
                        </Accordion.Body>
                  </Accordion.Item>
                })}
            </Accordion>   
        </div>}
        <div id='achievements-list'>
                {achievements && achievements.map((achievement, index) => {
                    return <Achievement
                        key={index}
                        achievement={achievement}
                        status={accountAchievements && accountAchievements.find(accountAchievement => accountAchievement.id === achievement.id)}
                    />
                })}
        </div>
    </div>
}   

export default AchievementsPage