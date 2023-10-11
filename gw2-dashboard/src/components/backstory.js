import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';


// This component is used to display the backstory of a character
const Backstory = ({story}) => {

    const [ storyContent, setStoryContent ] = useState(null)
    const [ storyPrompt, setStoryPrompt ] = useState(null)

    useEffect(()=>{
        !storyContent && loadBackstory()
    }, [])

    const loadBackstory = async() => {

        setStoryContent(null)

        // query returning the backstory detail of a character based on the ids provided 
        var response = await fetch(`https://api.guildwars2.com/v2/backstory/answers?ids=${story.join(",")}`)
        var info = await response.json()
        
        setStoryContent(info)
        loadPrompt(info)
    }

    const loadPrompt = async(stories) => {

        var ids = []
        stories.forEach(story => {
            ids.push(story.question)
        })

        // query returning the backstory prompt of a character based on the ids provided
        var response = await fetch(`https://api.guildwars2.com/v2/backstory/questions?ids=${ids.join(",")}`)
        var info = await response.json()

        setStoryPrompt(info)
    }

    return <>{ (storyContent && storyPrompt) &&
        <Accordion alwaysOpen>
            {storyContent.map((chapter, index) => {
                return <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header>
                        {storyPrompt[index].title}
                    </Accordion.Header>
                    <Accordion.Body>
                        <h6 dangerouslySetInnerHTML={{__html: chapter.journal}} />
                        <p>
                            {chapter.description}
                        </p>
                    </Accordion.Body>
              </Accordion.Item>
            })}
        </Accordion>
    }</>
}

export default Backstory