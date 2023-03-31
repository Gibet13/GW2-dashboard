import React from 'react';

function Backstory(props){
    return  <div id='Backstory' className="accordion accordion-flush"> 
                {props.journal.map(item => {
                    return  (
                    <div className="accordion-item" id={"ach" + item.id} key={item.id}>
                        <h2 className="accordion-header" id={"header" + item.id}>
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#coll" + item.id} aria-expanded="false" aria-controls={"coll" + item.id}>
                                {item.title}
                            </button>
                        </h2>
                        <div id={"coll" + item.id} className="accordion-collapse collapse" aria-labelledby={"header" + item.id}>
                            <div className="accordion-body">
                                <div className='descryption'>
                                    <div dangerouslySetInnerHTML={{__html: item.journal}}/>
                                    <div dangerouslySetInnerHTML={{__html: item.description}}/>
                                </div>
                            </div>
                        </div>
                    </div>)
                })}
            </div>
}
export default Backstory

