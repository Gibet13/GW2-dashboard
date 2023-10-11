import React from 'react';
import {ProgressBar} from 'react-bootstrap';

const Achievement = ({achievement, status}) => {
    return <div className='achievement-container'>
        <div className='achievement-header'>
            {achievement.icon && <img src={achievement.icon} alt={achievement.name}></img>}
            <h6>{achievement.name}</h6>
        </div>
        <div className='achievement-body'>
            <p>{achievement.description && <i>{achievement.description}</i>}</p>
            <p>{achievement.requirement}</p>
            {status && <ProgressBar now={status.current / status.max * 100} label={`${status.current} / ${status.max}`} />}
        </div>
    </div>
}

export default Achievement