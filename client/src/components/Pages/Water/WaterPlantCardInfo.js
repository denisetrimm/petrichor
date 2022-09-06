// STYLING
import styled from "styled-components";
// ICONS
import { MdOutlineWaterDrop } from "react-icons/md"; //Water
import { MdRemove } from "react-icons/md"; // Snooze
import { BiTimeFive } from "react-icons/bi"; //Clock1
import { IoIosArrowDown} from "react-icons/io";
import { IoIosArrowUp} from "react-icons/io";
//HOOKS & CONTEXT
import { useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import ExtraWateringDetails from "./ExtraWateringDetails";

const WaterPlantCardInfo = ({plant}) => {
    const navigate = useNavigate();
    const { waterSinglePlant, snoozeSinglePlant, removePlantFromHome} = useContext(UserContext);
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
                                sameElse: '[over a week ago]'
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
                    {openDetails && <ExtraWateringDetails plant={plant}/>}
                    
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
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    transition-property: background-color, scale;
    transition: ease-in-out 200ms;
    &:hover {
        background-color: #ededed;
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
const Due = styled.p`
`

export default WaterPlantCardInfo;