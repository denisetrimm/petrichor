// STYLING
import styled from "styled-components";
// ICONS
import { MdOutlineChair } from "react-icons/md"; //Room
import { BsCalendarCheck } from "react-icons/bs"; // Calendar2
import { GiWateringCan } from "react-icons/gi"; //Watering can
import { ImLoop2 } from "react-icons/im"; //Watering frequency - recurring loop

import { FiEdit } from "react-icons/fi"; //Edit
import { MdOutlineWaterDrop } from "react-icons/md"; //Water
import { MdRemove } from "react-icons/md"; // Snooze
import { BiTimeFive } from "react-icons/bi"; //Clock1
import { IoIosArrowDown} from "react-icons/io";
import { IoIosArrowUp} from "react-icons/io";
//HOOKS & CONTEXT
import { useState, useContext, useEffect } from "react";
import { PlantContext } from "../../../context/PlantContext";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
// OTHER COMPONENTS
import ExtraWateringDetails from "../Water/ExtraWateringDetails";
import UpdateDetailsForm from "./UpdateDetailsForm";


const HouseplantCardInfo = ({houseplant}) => {
    const {plantUser, waterSinglePlant, snoozeSinglePlant, removePlantFromHome} = useContext(UserContext);
    const { handleClear }= useContext(PlantContext);
    const navigate = useNavigate();
    const [showButtons, setShowButtons] = useState(false)
    const [overdue, setOverdue] = useState(false)
    const [formOpen, setFormOpen] = useState(false)

    const handlePlantClick = (plantId) => {
        handleClear();
        navigate(`/my-home`);
    }
    // WATER SINGLE PLANT
    const handleWaterPlantClick = (e) => {
        e.stopPropagation();
        waterSinglePlant(houseplant);
    }
    // SNOOZE
    const handleSnoozeClick = (e) => {
        e.stopPropagation();
        snoozeSinglePlant(houseplant)
    }
    // DELETE
    const handleDeleteClick = (e) => {
        e.stopPropagation();
        removePlantFromHome(houseplant)
    }


    useEffect(()=> {
        if(plantUser && plantUser.houseplants.length > 0 && moment().isAfter(houseplant.nextWatering, "day")){
            setOverdue(true)
        }
    },[plantUser])

    return (
        <>
            <Wrapper 
                onMouseEnter={() => {setShowButtons(true)}} 
                onMouseLeave={() => {setShowButtons(false)}} 
                // onClick={() => {handlePlantClick(houseplant.plantId)}}
            >
                <MiniWrapper>
                    <PlantImg 
                            src={houseplant.imgSrc} 
                            alt={houseplant.nickname 
                                ? houseplant.nickname
                                : houseplant.commonName
                            }
                        />
                    {/* INFO */}
                    <PlantInfo>
                        {/* BUTTON OPENS/CLOSES EDIT FORM */}
                            <ExpandBtn 
                                formOpen={formOpen}
                                onClick={(e)=> {e.stopPropagation();setFormOpen(!formOpen)}}
                            >
                                {!formOpen &&
                                // <>
                                //     Edit
                                //     <Span>
                                //         <FiEdit/>
                                //     </Span>
                                // </>
                                <>
                                    <FiEdit/>
                                </>
                                }
                                {formOpen &&
                                <>
                                    Close
                                    <Span>
                                        <IoIosArrowUp />
                                    </Span>
                                </>
                                }
                            </ExpandBtn>
                        {/* SHOW UPDATE FORM */}
                            {formOpen &&
                            <UpdateDetailsForm currentPlant={houseplant}/>
                            }
                        {/* SHOW PLANT DETAILS */}
                            {!formOpen &&
                            <>
                                <CommonName>
                                    {houseplant.nickname 
                                        ? houseplant.nickname 
                                        : houseplant.commonName
                                    }
                                </CommonName>
                                <ExtraWateringDetails plant={houseplant}/>
                                <Due overdue={overdue}>
                                    {!overdue &&
                                    <>
                                        Due {moment(houseplant.nextWatering)
                                            .calendar(null, {
                                                sameDay: '[today]',
                                                nextDay: '[tomorrow]',
                                                nextWeek: 'dddd',
                                                lastDay: '[yesterday]',
                                                lastWeek: '[last] dddd',
                                                sameElse: 'dddd MMM Do'
                                            })
                                        }
                                    </>
                                    }
                                    {overdue &&
                                    <>
                                        Overdue ({moment(houseplant.nextWatering)
                                            .calendar(null, {
                                                sameDay: '[today]',
                                                nextDay: '[tomorrow]',
                                                nextWeek: 'dddd',
                                                lastDay: '[yesterday]',
                                                lastWeek: '[last] dddd',
                                                sameElse: 'MMM Do'
                                            })
                                        })
                                    </>
                                    }
                                </Due>
                                {/* BUTTONS */}
                                <>
                                    <WaterBtn type="button" onClick={(e)=> {handleWaterPlantClick(e)}}><MdOutlineWaterDrop size="15"/>Water me!</WaterBtn>
                                    <SnoozeBtn type="button" onClick={(e)=> {handleSnoozeClick(e)}}><BiTimeFive size="15"/>Snooze </SnoozeBtn>
                                    {/* <DeleteBtn type="button" onClick={(e)=> {handleDeleteClick(e)}}><MdRemove size="15"/>Delete</DeleteBtn> */}
                                </>
                            </>
                        }
                    </PlantInfo>

                </MiniWrapper>
            </Wrapper>
        </>
    );
}

const ExpandBtn = styled.button`
    /* border: 1px solid lavender; */
    align-self: center;
    background-color: ${props => props.formOpen? "hsla(182, 22% , 47%, 0.5)":"hsl(182, 22%, 47%)"};
    width: fit-content;
    &:hover{
        transform: none;
        background-color: ${props => props.formOpen && "lightgrey"};
    }
`
const Span = styled.span`
    margin-left: 10px;
`
const Wrapper = styled.div`
border: 1px solid red;
    background-color: whitesmoke;
    border: 2px solid var(--color-creamAccent);
    border-radius: 10px;
    padding: 20px;
    width: 40%;
    max-width: 660px;
    max-height: 700px;
    position: relative;
    display: flex;
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
border: 1px solid lightgray;
    border-radius: 5px;
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
`
const PlantImg = styled.img`
    border-radius: 8px;
    max-width: 30%;
    max-height: 80%;
`
const PlantInfo = styled.div`
    /* border: 1px solid green; */
    margin-left: 40px;
    position: relative;
`
const CommonName = styled.p`
    font-weight: bold;
    padding: 10px 0;
`
const Due = styled.p`
    font-size: 14px;
    font-weight: bold;
    padding: 20px 0 0px;
    color: ${props => props.overdue ? "red" : "hsl(179, 30% , 29%)"};
`
const WaterBtn = styled.button`
    background-color: var(--color-water);
    padding: 6px 8px;
    z-index: 80;
    &:hover{
        background-color: var(--color-waterHighlight);
    }
`
const SnoozeBtn = styled.button`
    background-color: orange;
    padding: 6px 8px;
    z-index: 80;
    &:hover{
        background-color: var(--color-soilHighlight);
    }
`
const DeleteBtn = styled.button`
    background-color: var(--color-pink);
    padding: 6px 8px;
    z-index: 80;
    &:hover{
        background-color: var(--color-pinkHighlight);
    }
`
export default HouseplantCardInfo;