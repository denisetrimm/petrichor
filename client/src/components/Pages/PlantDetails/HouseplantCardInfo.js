// STYLING
import styled from "styled-components";
// ICONS
import { FiEdit } from "react-icons/fi"; //Edit
import { MdOutlineWaterDrop } from "react-icons/md"; //Water
import { BiTimeFive } from "react-icons/bi"; //Clock1
//HOOKS & CONTEXT
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";
import moment from 'moment';
// OTHER COMPONENTS
import ExtraWateringDetails from "../Water/ExtraWateringDetails";
import UpdateDetailsForm from "./UpdateDetailsForm";


const HouseplantCardInfo = ({houseplant}) => {

    const { plantUser, 
            waterSinglePlant, 
            snoozeSinglePlant, 
    } = useContext(UserContext);

    const [overdue, setOverdue] = useState(false)
    const [formOpen, setFormOpen] = useState(false)

    // WATER SINGLE PLANT
    const handleWaterPlantClick = (e) => {
        e.stopPropagation();
        waterSinglePlant(houseplant)
    }
    // SNOOZE
    const handleSnoozeClick = (e) => {
        e.stopPropagation();
        snoozeSinglePlant(houseplant)
    }

    useEffect(()=> {
        if(plantUser && plantUser.houseplants.length > 0 && moment().isAfter(houseplant.nextWatering, "day")){
            setOverdue(true)
        }
        else{
            setOverdue(false)
        }
    },[plantUser, houseplant.nextWatering])

    return (
        <>
            <Wrapper>
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
                                    <FiEdit color="hsl(182, 22%, 47%)"/>
                                }
                                {formOpen &&
                                    <>x</>
                                }
                            </ExpandBtn>

                        {/* SHOW UPDATE FORM */}
                            {formOpen &&
                                <UpdateDetailsForm currentPlant={houseplant} formOpen={formOpen} setFormOpen={setFormOpen}/>
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
                                <ButtonDiv>
                                    <WaterBtn type="button" onClick={(e)=> {handleWaterPlantClick(e)}}><MdOutlineWaterDrop size="15"/>Water me!</WaterBtn>
                                    <SnoozeBtn type="button" onClick={(e)=> {handleSnoozeClick(e)}}><BiTimeFive size="15"/>Snooze </SnoozeBtn>
                                </ButtonDiv>
                            </>
                        }
                    </PlantInfo>

                </MiniWrapper>
            </Wrapper>
        </>
    );
}

const ExpandBtn = styled.button`
    position: absolute;
    top: 25px;
    left: -35px;
    margin:0;
    padding: ${props => props.formOpen? "3px 8px":"5px 8px"};
    background-color: transparent;
    color:grey;
    width: fit-content;
    &:hover{
        transform: scale(1.1);
        background-color: lightgrey;
    }
`
const Wrapper = styled.div`
    background-color: whitesmoke;
    border: 2px solid var(--color-creamAccent);
    border-radius: 10px;
    padding: 20px;
    width: 40%;
    max-width: 660px;
    max-height: 700px;
    position: relative;
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
    align-items: center;
    justify-content: center;
    width: 100%;
`
const PlantImg = styled.img`
    border-radius: 8px;
    max-width: 30%;
    max-height: 80%;
`
const PlantInfo = styled.div`
    margin-left: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    width: 50%;
    min-height: 390px;
`
const CommonName = styled.p`
    font-weight: bold;
    padding: 10px 0;
`
const Due = styled.p`
    font-size: 14px;
    font-weight: bold;
    padding: 20px 0 0px;
    color: ${props => props.overdue ? "orangered" : "hsl(179, 30% , 29%)"};
`
const ButtonDiv = styled.div`
    display: flex;
`
const WaterBtn = styled.button`
    background-color: var(--color-water);
    padding: 6px 8px;
    z-index: 80;
    &:hover{
        background-color: var(--color-waterDark);
    }
`
const SnoozeBtn = styled.button`
    background-color: var(--color-snoozeDark);
    padding: 6px 8px;
    z-index: 80;
    margin-left: 5px;
    &:hover{
        background-color: var(--color-snooze);
    }
`
export default HouseplantCardInfo;