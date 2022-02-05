import React from 'react';
import '../assets/achievementsView.css';

function Achievements(ach_list) {
    ach_list = ach_list.ach_list

    if(ach_list.text !== "missing ids value"){
        return <React.Fragment>{ach_list.map(item => {
        
                return  (
                <div className="accordion-item" id={"ach" + item.id} key={item.id}>
                    <h2 className="accordion-header" id={"header" + item.id}>
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#coll" + item.id} aria-expanded="false" aria-controls={"coll" + item.id}>
                            {item.icon ? (<img src={item.icon} alt=""></img>):(<React.Fragment/>)}{item.name}
                        </button>
                    </h2>
                    <div id={"coll" + item.id} className="accordion-collapse collapse" aria-labelledby={"header" + item.id} data-bs-parent="#achievements">
                        <div className="accordion-body">
                            <div id='descryption'>
                                <p>{item.requirement}</p>
                                <div dangerouslySetInnerHTML={{__html: item.description}}/>
                            </div>
                            <div id='rewards'>
                                <div>{item.tiers.length > 1 ?(item.tiers.map(tier =>{return <li>{tier.count} | {tier.points} point(s)</li>})) : (<li>{item.tiers[0].points} point(s)</li>)}</div>
                            </div>
                        </div>
                    </div>
                </div>)
                })}
            </React.Fragment>
    }
    else{
        return <React.Fragment><i>No achievements</i></React.Fragment>
    }
}
 
export default Achievements;


