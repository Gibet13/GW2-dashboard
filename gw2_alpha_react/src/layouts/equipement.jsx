import React from 'react';

import { parse_attribute } from '../helpers/utils';
import Item  from '../components/item';

function CharaGear(gear) {

    var attributes = parse_attribute(gear)

    return  <React.Fragment>
        <div id="gear">
            <h2>Gear</h2>
            <div id="gear_view">
                <div id="main_gear">
                    <div id="armor_piece">
                        Armor
                        {!gear.gear.Helm ? (<div className="icon"></div>) : (<Item item = {gear.gear.Helm}/>)}
                        {!gear.gear.Shoulders ? (<div className="icon"></div>) : (<Item item = {gear.gear.Shoulders}/>)}
                        {!gear.gear.Coat ? (<div className="icon"></div>) : (<Item item = {gear.gear.Coat}/>)}
                        {!gear.gear.Gloves ? (<div className="icon"></div>) : (<Item item = {gear.gear.Gloves}/>)}
                        {!gear.gear.Leggings ? (<div className="icon"></div>) : (<Item item = {gear.gear.Leggings}/>)}
                        {!gear.gear.Boots ? (<div className="icon"></div>) : (<Item item = {gear.gear.Boots}/>)}
                    </div>
                    <div id="land_weapons_set">
                        Weapons
                        <div id="set_1">
                            set 1
                            {!gear.gear.WeaponA1 ? (<div className="icon"></div>) : (<Item item = {gear.gear.WeaponA1}/>)}
                            {!gear.gear.WeaponA2 ? (<div className="icon"></div>) : (<Item item = {gear.gear.WeaponA2}/>)}
                        </div>
                        <div id="set_2">
                            set 2
                            {!gear.gear.WeaponB1 ? (<div className="icon"></div>) : (<Item item = {gear.gear.WeaponB1}/>)}
                            {!gear.gear.WeaponB2 ? (<div className="icon"></div>) : (<Item item = {gear.gear.WeaponB2}/>)}
                        </div>
                    </div>
                </div>
                <div id="secondary_gear">
                    Stats
                    <div id="stat_view">
                        <li>Power: {attributes.Power}</li>
                        <li>Toughness: {attributes.Toughness}</li>
                        <li>Vitality: {attributes.Vitality}</li>
                        <li>Precision: {attributes.Precision}</li>
                        <li>Condition Damage: {attributes['Condition Damage']}</li>
                        <li>Expertise: {attributes.Expertise}</li>
                        <li>Concentration: {attributes.Concentration}</li>
                        <li>Healing Power: {attributes['Healing Power']}</li>
                    </div>
                    <div id="trinkets">
                        Trinkets
                        <div>
                        {!gear.gear.Backpack ? (<div className="icon"></div>) : (<Item item = {gear.gear.Backpack}/>)}
                            <div id="accesory">
                                {!gear.gear.Accessory1 ? (<div className="icon"></div>) : (<Item item = {gear.gear.Accessory1}/>)}
                                {!gear.gear.Accessory2 ? (<div className="icon"></div>) : (<Item item = {gear.gear.Accessory2}/>)}
                            </div>
                        </div>
                        <div>
                            {!gear.gear.Amulet ? (<div className="icon"></div>) : (<Item item = {gear.gear.Amulet}/>)}
                            <div id="rings">
                                {!gear.gear.Ring1 ? (<div className="icon"></div>) : (<Item item = {gear.gear.Ring1}/>)}
                                {!gear.gear.Ring2 ? (<div className="icon"></div>) : (<Item item = {gear.gear.Ring2}/>)}
                            </div>
                        </div>
                        Underwater
                        <div id="underwater_gear">
                            <div>
                                {!gear.gear.HelmAquatic ? (<div className="icon"></div>) : (<Item item = {gear.gear.HelmAquatic}/>)}
                                {!gear.gear.WeaponAquaticA ? (<div className="icon"></div>) : (<Item item = {gear.gear.WeaponAquaticA}/>)}
                                {!gear.gear.WeaponAquaticB ? (<div className="icon"></div>) : (<Item item = {gear.gear.WeaponAquaticB}/>)}
                            </div>
                        </div>
                        Gathering tools
                        <div id="gathering_tools">
                            <div>
                                {!gear.gear.Sickle ? (<div className="icon"></div>) : (<Item item = {gear.gear.Sickle}/>)}
                                {!gear.gear.Axe ? (<div className="icon"></div>) : (<Item item = {gear.gear.Axe}/>)}
                                {!gear.gear.Pick ? (<div className="icon"></div>) : (<Item item = {gear.gear.Pick}/>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default CharaGear