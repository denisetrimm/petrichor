// STYLING
import styled from "styled-components";
// ICONS
import { MdPets } from "react-icons/md"; //Pets
import { TbShovel } from "react-icons/tb"; //Soil
import { MdOutlineWbSunny } from "react-icons/md"; //Sun - Bright Indirect
import { IoPartlySunnyOutline } from "react-icons/io5"; //Partial shade
import { MdOutlineFilterDrama} from "react-icons/md"; //Low
import { WiHumidity } from "react-icons/wi"; //Humidity
import { IoLeafOutline } from "react-icons/io5"; //Leaf
import { WiRaindrops } from "react-icons/wi"; //Multi-water
import { GiWateringCan } from "react-icons/gi"; //Watering can
// TOOLTIPS
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const PlantCare = ({currentPlant}) => {
    return (
        <PlantCareWrapper>
            {/* SUNSHINE */}
            <Tippy content="Sunlight requirements">
                <CareRequirement color="hsl(220, 10% , 59%)" backgroundColor="hsla(42, 69% , 72%, 0.2)">
                    {currentPlant.sunlightRequirements.includes("bright-indirect") && 
                    <RequirementWrapper>
                        <MdOutlineWbSunny color="hsl(42, 69% , 70%)" size="30"/>
                        <Def>Bright-indirect</Def>
                    </RequirementWrapper>
                    }
                    {currentPlant.sunlightRequirements.includes("partial shade") && 
                    <RequirementWrapper>
                        <IoPartlySunnyOutline color="hsl(42, 69% , 70%)" size="30"/>
                        <Def>Partial shade</Def>
                    </RequirementWrapper>
                    }
                    {currentPlant.sunlightRequirements.includes("low") && 
                    <RequirementWrapper>
                        <MdOutlineFilterDrama color="hsl(42, 69% , 70%)" size="30"/>
                        <Def>Low</Def>
                    </RequirementWrapper>
                    }
                </CareRequirement>
            </Tippy>
            {/* PET-FRIENDLY */}
            <Tippy content="Pet-friendly">
                <CareRequirement color="hsl(220, 10% , 59%)" backgroundColor="hsl(356, 32% , 91%)">
                        <RequirementWrapper>
                                <MdPets color="hsl(346, 39% , 79%)" size="30"/>
                            <Def>
                                {currentPlant.petFriendly}
                            </Def>
                        </RequirementWrapper>      
                </CareRequirement>
                </Tippy>
            {/* HUMIDITY */}
            <Tippy content="Humidity level">
                <CareRequirement color="hsl(220, 10% , 59%)" backgroundColor="hsla(210, 46% , 58%, 0.1)">
                        <RequirementWrapper>
                            <WiHumidity color="hsl(230, 14% , 65%)" size="30"/>
                            <Def>
                                {currentPlant.humidiyLevel}
                            </Def>
                        </RequirementWrapper>      
                </CareRequirement>
            </Tippy>
            {/* SOIL */}
            <Tippy content="Soil requirements">
                <CareRequirement color="hsl(220, 10% , 59%)" backgroundColor="hsla(27, 65% , 87%, 0.3)">
                        <RequirementWrapper>
                            <TbShovel color="hsl(230, 14% , 65%)" size="30"/>
                            <Def>
                                {currentPlant.soilRequirements.includes("None") ? "None" : `${currentPlant.soilRequirements} potting mix`}
                            </Def>
                        </RequirementWrapper>      
                </CareRequirement>
            </Tippy>
        </PlantCareWrapper>

    );
}

const CareRequirement = styled.div`
    /* border: 1px solid red; */
    color: ${props => props.color};
    background-color: ${props => props.backgroundColor};
    width: fit-content;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    padding: 20px 30px;
    margin: 15px;
    border-radius: 20px;
`
const PlantCareWrapper = styled.div`
    /* border: 1px solid orange;    */
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`
const RequirementWrapper = styled.div`
    display: flex;
    align-items: center;
`
const Def = styled.span`
    margin: 0 10px;
    font-size: 14px;
`
export default PlantCare;