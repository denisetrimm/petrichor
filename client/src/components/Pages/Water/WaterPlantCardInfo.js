// STYLING
import styled from "styled-components";
// ICONS
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

// HOOKS & CONTEXT
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { useAuth0 } from "@auth0/auth0-react";
import moment from 'moment';

const WaterPlantCardInfo = ({plant}) => {
    const { user, isAuthenticated, isLoading, logout} = useAuth0();
    const { plantUser } = useContext(UserContext);

    return (
        <>
            <PlantImg src={plant.imgSrc}/>
            <CommonName>{plant.nickname ? plant.nickname: plant.commonName}</CommonName>
            {plant.room && 
                <div><MdOutlineChair size="16"/><Room>{plantUser.home[plant.room]}</Room></div>
            }
{/* {`${Object.values(room)[0]}` */}
        {/* <BotanicalName>{plant.nickname ? plant.commonName: plant.botanicalName}</BotanicalName> */}
        </>
    );
}
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
`
const PlantImg = styled.img`
    border-radius: 8px;
    max-width: 80%;
    max-height: 80%;
`
const CommonName = styled.p`
    font-weight: bold;
    padding: 10px 0;
`
const BotanicalName = styled.p`
    font-style: italic;
    font-size: 14px;
`
const Room = styled.span`
    font-size: 12px;
    
`
export default WaterPlantCardInfo;