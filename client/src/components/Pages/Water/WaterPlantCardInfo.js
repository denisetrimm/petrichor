// STYLING
import styled from "styled-components";
// ICONS
import { WiRaindrops } from "react-icons/wi"; //Multi-water
import { GiWateringCan } from "react-icons/gi"; //Watering can
import { BsCalendar3 } from "react-icons/bs"; // Calendar1
import { MdOutlineSnooze } from "react-icons/md"; // Snooze
import { BiTime } from "react-icons/bi"; //Clock2

import { MdOutlineChair } from "react-icons/md"; //Room
import { MdOutlineWaterDrop } from "react-icons/md"; //Water
import { BsCalendarCheck } from "react-icons/bs"; // Calendar2
import { MdRemove } from "react-icons/md"; // Snooze
import { BiTimeFive } from "react-icons/bi"; //Clock1
import { ImLoop2 } from "react-icons/im"; //Watering frequency - recurring loop
import { IoIosArrowDown} from "react-icons/io";
import { IoIosArrowUp} from "react-icons/io";
//HOOKS & CONTEXT
import { useState, useContext } from "react";
import { PlantContext } from "../../../context/PlantContext";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import moment from 'moment';

const WaterPlantCardInfo = ({plant}) => {
    const navigate = useNavigate();
    const { plantUser, waterSinglePlant, snoozeSinglePlant, removePlantFromHome} = useContext(UserContext);
    const [openDetails, setOpenDetails] = useState(false)
    const [showButtons, setShowButtons] = useState(false)

    // CLICK CARD - TO PLANT DETAILS
    const handlePlantClick = (plantId) => {
        navigate(`/plants/${plantId}`);
    }
    // WATER SINGLE PLANT
    const handleWaterPlantClick = (e) => {
        e.stopPropagation();
        waterSinglePlant(plant);
    }
    // SNOOZE
    const handleSnoozeClick = (e) => {
        e.stopPropagation();
        snoozeSinglePlant(plant)
    }
    // DELETE
    const handleDeleteClick = (e) => {
        e.stopPropagation();
        removePlantFromHome(plant)
    }

    return (
        <>
        <Wrapper 
            onMouseEnter={() => {setShowButtons(true)}} 
            onMouseLeave={() => {setShowButtons(false); setOpenDetails(false)}} 
            onClick={() => {handlePlantClick(plant.plantId)}}
        >
            <MiniWrapper>

                {/* BUTTONS */}
                    {showButtons && 
                    <>
                        <WaterBtn type="button" onClick={(e)=> {handleWaterPlantClick(e)}}><MdOutlineWaterDrop size="25"/></WaterBtn>
                        <SnoozeBtn type="button" onClick={(e)=> {handleSnoozeClick(e)}}><BiTimeFive size="25"/></SnoozeBtn>
                        <DeleteBtn type="button" onClick={(e)=> {handleDeleteClick(e)}}><MdRemove size="25"/></DeleteBtn>
                    </>
                    }

                {/* INFO */}
                    <PlantImg 
                        src={plant.imgSrc} 
                        alt={plant.nickname 
                            ? plant.nickname
                            : plant.commonName
                        }
                    />
                    <CommonName>
                        {plant.nickname 
                            ? plant.nickname 
                            : plant.commonName
                        }
                    </CommonName>
                    <Due>
                        Due {moment(plant.nextWatering)
                            .calendar(null, {
                                sameDay: '[today]',
                                nextDay: '[tomorrow]',
                                nextWeek: 'dddd',
                                lastDay: '[yesterday]',
                                lastWeek: '[last] dddd',
                                sameElse: '[more than a week ago]'
                            })
                        }
                    </Due>

                {/* BUTTON OPENS/CLOSES EXTRA DETAILS */}
                    <ExpandBtn 
                            openDetails={openDetails}
                            onClick={(e)=> {e.stopPropagation();setOpenDetails(!openDetails)}}
                    >
                        {openDetails 
                            ? <IoIosArrowUp color="hsl(220, 10% , 59%)" size="20"/> 
                            : <IoIosArrowDown color="hsl(220, 10% , 59%)" size="20"/>
                        }
                    </ExpandBtn>

                {/* SHOW EXTRA DETAILS */}
                    {openDetails && 
                    <>
                        {plant.room && 
                            <div>
                                <MdOutlineChair size="16"/>
                                <Room>{plantUser.home[plant.room]}</Room>
                            </div>
                        }
                        <LastWatered>
                            <BsCalendarCheck/>
                            <Span> 
                                Last watered {moment(plant.lastWatered).format("MMM Do")}
                            </Span>
                        </LastWatered>
                        <div>
                            <ImLoop2 color="hsl(230, 14% , 65%)" size="14"/>
                            <Span>
                                Water every {plant.wateringFrequency/7} - {(plant.wateringFrequency+7)/7} weeks
                            </Span>
                        </div>
                    </>
                    }
                    
            </MiniWrapper>
        </Wrapper>
        </>
    );
}
const Wrapper = styled.div`
    background-color: whitesmoke;
    border: 2px solid var(--color-creamAccent);
    border-radius: 10px;
    padding: 20px;
    width: 20%;
    position: relative;
    /* display: flex; */
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    transition-property: background-color, scale;
    transition: ease-in-out 200ms;
    &:hover {
        background-color: #ededed;
        /* transform: scale(1.01); */
        cursor: pointer;
    }
    `
const MiniWrapper = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    `
const PlantImg = styled.img`
    border-radius: 8px;
    max-width: 80%;
    max-height: 80%;
    transition: none;
    &:hover {
        background-color: #ededed;
        transform: none;
        cursor: pointer;
    }
`
const CommonName = styled.p`
    font-weight: bold;
    padding: 10px 0;
`
const ExpandBtn = styled.button`
    align-self: center;
    margin: 10px;
    padding: 10px;
    background-color: transparent;
    color: transparent;
    &:hover{
        background-color:transparent;
    }
`
const Span = styled.span`
    margin-left: 10px;
    font-size: 14px;
`
const WaterBtn = styled.button`
    background-color: var(--color-water);
    padding: 6px 8px;
    position: absolute;
    top: 0px;
    left: 15px;
    z-index: 80;
    &:hover{
        background-color: var(--color-waterHighlight);
    }
`
const SnoozeBtn = styled.button`
    background-color: var(--color-soil);
    padding: 6px 8px;
    position: absolute;
    top: 40px;
    left: 15px;
    z-index: 80;
    &:hover{
        background-color: var(--color-soilHighlight);
    }
`
const DeleteBtn = styled.button`
    background-color: var(--color-pink);
    padding: 6px 8px;
    position: absolute;
    top: 80px;
    left: 15px;
    z-index: 80;
    &:hover{
        background-color: var(--color-pinkHighlight);
    }
`
const Room = styled.span`
    font-size: 14px;
    font-weight: normal;
    margin-left: 5px;
`
const LastWatered = styled.p`
    font-size: 14px;
    padding: 5px 0;
`
const Due = styled.p`
`
export default WaterPlantCardInfo;