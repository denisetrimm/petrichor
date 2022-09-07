// STYLING
import styled from "styled-components";
// ICONS
import { MdPets } from "react-icons/md"; //Pets
import { TbShovel } from "react-icons/tb"; //Soil
import { MdOutlineWbSunny } from "react-icons/md"; //Sun - Bright Indirect
import { IoPartlySunnyOutline } from "react-icons/io5"; //Partial shade
import { MdOutlineFilterDrama} from "react-icons/md"; //Low
import { WiHumidity } from "react-icons/wi"; //Humidity
import { ImLoop2 } from "react-icons/im"; //Watering frequency - recurring loop
// TOOLTIPS
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const PlantCare = ({currentPlant}) => {
    return (
        <PlantCareWrapper>
            
            {/* SUNSHINE */}
            <Tippy content="Sunlight requirements">
                <CareRequirement color="hsl(220, 10% , 39%)" backgroundColor="hsla(42, 79% , 72%, 0.3)">
                    {currentPlant.sunlightRequirements.includes("bright-indirect") && 
                    <RequirementWrapper>
                        <MdOutlineWbSunny color="hsl(42, 79% , 70%)" size="30"/>
                        <Def>Bright-indirect</Def>
                    </RequirementWrapper>
                    }
                    {currentPlant.sunlightRequirements.includes("partial shade") && 
                    <RequirementWrapper>
                        <IoPartlySunnyOutline color="hsl(42, 79% , 70%)" size="30"/>
                        <Def>Partial shade</Def>
                    </RequirementWrapper>
                    }
                    {currentPlant.sunlightRequirements.includes("low") && 
                    <RequirementWrapper>
                        <MdOutlineFilterDrama color="hsl(42, 79% , 70%)" size="30"/>
                        <Def>Low</Def>
                    </RequirementWrapper>
                    }
                </CareRequirement>
            </Tippy>

            {/* PET-FRIENDLY */}
            <Tippy content="Pet-friendly">
                <CareRequirement color="hsl(220, 10% , 39%)" backgroundColor="hsla(108, 23% , 79%, 0.4)">
                        <RequirementWrapper>
                            <MdPets color="hsl(108, 23% , 79%)" size="30"/>
                            <Def>
                                {currentPlant.petFriendly}
                            </Def>
                        </RequirementWrapper>      
                </CareRequirement>
            </Tippy>

            {/* HUMIDITY */}
            <Tippy content="Humidity level">
                <CareRequirement color="hsl(220, 10% , 39%)" backgroundColor="hsla(210, 46% , 58%, 0.2)">
                        <RequirementWrapper>
                            <WiHumidity color="hsl(230, 14% , 65%)" size="30"/>
                            <Def>
                                {currentPlant.humidityLevel}
                            </Def>
                        </RequirementWrapper>      
                </CareRequirement>
            </Tippy>
            
            {/* SOIL */}
            <Tippy content="Soil requirements">
                <CareRequirement color="hsl(220, 10% , 39%)" backgroundColor="hsla(27, 70% , 87%, 0.5)">
                        <RequirementWrapper>
                            <TbShovel color="hsl(27, 90% , 80%)" size="30"/>
                            <Def>
                                {currentPlant.soilRequirements.includes("None") ? "None" : `${currentPlant.soilRequirements} potting mix`}
                            </Def>
                        </RequirementWrapper>      
                </CareRequirement>
            </Tippy>

            {/* WATERING FREQUENCY */}
            <Tippy content="Watering frequency">
                <CareRequirement color="hsl(220, 10% , 39%)" backgroundColor="hsl(180, 33% , 84%)">
                        <RequirementWrapper>
                            <ImLoop2 color="hsl(230, 14% , 65%)" size="22"/>
                            <Def>
                                {+currentPlant.wateringFrequency % 7 === 0 &&  
                                    <> {+currentPlant.wateringFrequency / 7 } - {((+currentPlant.wateringFrequency + 7) / 7)} weeks</>
                                }
                                {+currentPlant.wateringFrequency % 7 !== 0 &&  
                                    <>{+currentPlant.wateringFrequency} days</>
                                }
                            </Def>
                        </RequirementWrapper>      
                </CareRequirement>
            </Tippy>
        </PlantCareWrapper>

    );
}

const PlantCareWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    margin: 20px -10px;
`
const CareRequirement = styled.div`
    color: ${props => props.color};
    background-color: ${props => props.backgroundColor};
    width: fit-content;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    padding: 10px 20px;
    margin: 10px;
    border-radius: 20px;
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