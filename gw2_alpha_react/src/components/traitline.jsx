import React, { Component } from 'react';
import '../assets/traitline.css'
import Trait from './trait';

class Traitline extends Component {
    
    state = {
        major_traits:null,
        minor_traits:null,
        trait_load:false
    }

    constructor(props){
        super(props)
    }
    
    async load_major(traits){
        
        var response = await fetch(`https://api.guildwars2.com/v2/traits?ids=${traits.line.major_traits.join(",")}`)
        var info = await response.json()
        
        this.setState({major_traits: info})    
        
    }

    async load_minor(traits){
        
        var response = await fetch(`https://api.guildwars2.com/v2/traits?ids=${traits.line.minor_traits.join(",")}`)
        var info = await response.json()
        
        this.setState({minor_traits: info})    
    }

    async load_traits(){
        
        this.load_major(this.props);
        this.load_minor(this.props);
        this.setState({trait_load: true})

    }
    render() {
        
        if(!this.state.trait_load){
            this.load_traits()
        }
        
        return  (   <React.Fragment>
                        {!this.state.trait_load ? (<div></div>)
                            :
                            (<React.Fragment>
                                <div className="traitline" id={this.props.line.name} style={{backgroundImage: `url(${this.props.line.background})`,
                                                                                            backgroundPosition: 'bottom left'}}>
                                    <div  className="traitline_icon">
                                        <div title={this.props.line.name} className='line_icon'></div>
                                    </div>
                                    {!this.state.minor_traits ? (<div className="minor_trait_icon"></div>):(<Trait trait = {this.state.minor_traits[0]}/>)}
                                    <div className="trait_tier">
                                        {!this.state.major_traits ? (<div className="major_trait_icon"></div>):(<Trait trait = {this.state.major_traits[0]}/>)}
                                        {!this.state.major_traits ? (<div className="major_trait_icon"></div>):(<Trait trait = {this.state.major_traits[1]}/>)}
                                        {!this.state.major_traits ? (<div className="major_trait_icon"></div>):(<Trait trait = {this.state.major_traits[2]}/>)}
                                    </div>
                                    {!this.state.minor_traits ? (<div className="minor_trait_icon"></div>):(<Trait trait = {this.state.minor_traits[1]}/>)}
                                    <div className="trait_tier">
                                        {!this.state.major_traits ? (<div className="major_trait_icon"></div>):(<Trait trait = {this.state.major_traits[3]}/>)}
                                        {!this.state.major_traits ? (<div className="major_trait_icon"></div>):(<Trait trait = {this.state.major_traits[4]}/>)}
                                        {!this.state.major_traits ? (<div className="major_trait_icon"></div>):(<Trait trait = {this.state.major_traits[5]}/>)}
                                    </div>
                                    {!this.state.minor_traits ? (<div className="minor_trait_icon"></div>):(<Trait trait = {this.state.minor_traits[2]}/>)}
                                    <div className="trait_tier">
                                        {!this.state.major_traits ? (<div className="major_trait_icon"></div>):(<Trait trait = {this.state.major_traits[6]}/>)}
                                        {!this.state.major_traits ? (<div className="major_trait_icon"></div>):(<Trait trait = {this.state.major_traits[7]}/>)}
                                        {!this.state.major_traits ? (<div className="major_trait_icon"></div>):(<Trait trait = {this.state.major_traits[8]}/>)}
                                    </div>
                                </div>
                            </React.Fragment>)
                        }
                    </React.Fragment>);
    }
}
 
export default Traitline;