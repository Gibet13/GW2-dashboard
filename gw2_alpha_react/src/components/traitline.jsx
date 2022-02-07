import React from 'react';
import '../assets/traitline.css'

export function Traitline(props) {

    console.log(props)

    return  <div className="traitline" id={props.line.name} style={{backgroundImage: `url(${props.line.background})`,
                                                                    backgroundPosition: 'bottom left'}}>
                <div  className="traitline_icon">
                    <div title={props.line.name} className='line_icon'></div>
                </div>
                <div className="minor_trait_icon"></div>
                <div className="trait_tier">
                    <div className="major_trait_icon"></div>
                    <div className="major_trait_icon"></div>
                    <div className="major_trait_icon"></div>
                </div>
                <div className="minor_trait_icon"></div>
                <div className="trait_tier">
                    <div className="major_trait_icon"></div>
                    <div className="major_trait_icon"></div>
                    <div className="major_trait_icon"></div>
                </div>
                <div className="minor_trait_icon"></div>
                <div className="trait_tier">
                    <div className="major_trait_icon"></div>
                    <div className="major_trait_icon"></div>
                    <div className="major_trait_icon"></div>
                </div>
            </div>
}