import React from 'react';

function Achievements(ach_list) {
    ach_list = ach_list.ach_list
    console.log(ach_list)
    return <React.Fragment>{ach_list.map(item => {
        
                return  (
                <div className="accordion-item" id={"ach" + item.id} key={item.id}>
                    <h2 className="accordion-header" id={"header" + item.id}>
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#coll" + item.id} aria-expanded="false" aria-controls={"coll" + item.id}>
                            {item.name}
                        </button>
                    </h2>
                    <div id={"coll" + item.id} className="accordion-collapse collapse" aria-labelledby={"header" + item.id} data-bs-parent="#achivements">
                        <div className="accordion-body">
                            <p>{item.requirement}</p>
                            {item.description}
                        </div>
                    </div>
                </div>)
                })}
            </React.Fragment>
}
 
export default Achievements;


