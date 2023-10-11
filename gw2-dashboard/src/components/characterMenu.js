import React from 'react';


//this component is used to display the character menu on the left side of the screen 
const CharacterMenu = (props) => {

    return  <nav className="characters-menu-nav">
                <div className="characters-menu">
                    <button className="characters-menu_button">
                        Characters
                    </button>
                    <div className="characters-menu_content">
                        {props.characters.map((item, index) => {

                            return <li key={index} onClick={()=>props.handleClick(item)}>
                                {item}
                            </li>
                        })}
                    </div>
                </div>
            </nav>
}

export default CharacterMenu