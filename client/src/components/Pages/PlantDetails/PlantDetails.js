import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect, useContext } from "react";
import { PlantContext } from "../../../context/PlantContext";
import { UserContext } from "../../../context/UserContext";
import { useParams } from "react-router-dom";
import BackArrow from "../../UI/BackArrow";
import CareRequirement from "./CareRequirement";
import PlantCare from "./PlantCare";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

// ICONS
import { IoLeafOutline } from "react-icons/io5"; //Leaf
import { MdPets } from "react-icons/md"; //Pets
import { TbShovel } from "react-icons/tb"; //Soil
import { MdOutlineWbSunny } from "react-icons/md"; //Sun - Bright Indirect
import { IoPartlySunnyOutline } from "react-icons/io5"; //Partial shade
import { MdOutlineFilterDrama} from "react-icons/md"; //Low
import { WiHumidity } from "react-icons/wi"; //Humidity
import { WiRaindrops } from "react-icons/wi"; //Multi-water
import { GiWateringCan } from "react-icons/gi"; //Watering can

import { MdOutlineChair } from "react-icons/md"; //Room
import { MdOutlineWaterDrop } from "react-icons/md"; //Water

import { BsCalendar } from "react-icons/bs"; // Calendar1
import { BsCalendarCheck } from "react-icons/bs"; // Calendar2
import { MdOutlineSnooze } from "react-icons/md"; // Snooze
import { BiTimeFive } from "react-icons/bi"; //Clock1
import { BiTime } from "react-icons/bi"; //Clock2
import { ImLoop2 } from "react-icons/im"; //Watering frequency - recurring loop
import DiscoverArrow from "./DiscoverArrow";


const PlantDetails = () => {

    const { plantId } = useParams();
    const { user, isAuthenticated, isLoading} = useAuth0();
    const {plantUser} = useContext(UserContext);
    const { allPlants, filteredPlants } = useContext(PlantContext);
    const [currentPlant, setCurrentPlant] = useState(null);


    useEffect(()=> {
        if(allPlants){
            const selectedPlant = allPlants.find(plant => {
                return plant._id === plantId
            })
            setCurrentPlant(selectedPlant)
        }

    }, [plantId])

    return (
        <>
        {!isAuthenticated &&
            <DiscoverArrow/>
        }
        {plantUser &&
            <BackArrow/>
        }
        { currentPlant &&
            <>
            <FlexWrapper>
                <PlantImg src={currentPlant.imgSrc}/>
                <PlantInfo>
                    <CommonName>{currentPlant.commonName}</CommonName>
                    <BotanicalName>{currentPlant.botanicalName}</BotanicalName>
                    
                    <Tippy content="Family">
                        <Family>
                            <IoLeafOutline color="hsl(179, 30% , 29%)" size="20"/>
                            <FamilySpan>{currentPlant.family}</FamilySpan>
                        </Family>
                    </Tippy>
                    <PlantCare currentPlant={currentPlant}/>
                    
                </PlantInfo>
            </FlexWrapper>
            </>
        }
        
        </>
    );
}

const FlexWrapper = styled.div`
    /* border: 1px solid purple; */
    display: flex;
    position: relative;
    width: fit-content; /*Not sure about this*/
    justify-content: center;
`
const PlantInfo = styled.div`
    /* border: 1px solid green; */
    margin-left: 40px;
    max-width: 500px;
`
const PlantImg = styled.img`
    border-radius: 8px;
    max-width: 520px;
    max-height: 80%;
`
const CommonName = styled.p`
    font-weight: bold;
    font-size: 30px;
    padding: 10px 0;
`
const BotanicalName = styled.p`
    font-style: italic;
    font-size: 18px;
    padding: 10px 0;
`
const Family = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;
    font-size: 14px;
    padding: 10px 0;
`
const FamilySpan = styled.span`
    padding: 5px 0 0 10px;
    font-weight: bold;
    color: var(--color-primaryMedium);
`
export default PlantDetails;