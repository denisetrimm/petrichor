// STYLING
import styled from "styled-components";
// ICONS
import { MdOutlineChair } from "react-icons/md"; //Room
import { BsCalendarCheck } from "react-icons/bs"; // Calendar2
import { ImLoop2 } from "react-icons/im"; //Watering frequency - recurring loop
//HOOKS & CONTEXT
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import moment from 'moment';

const ExtraWateringDetails = ({plant}) => {

    const { plantUser} = useContext(UserContext);

    return (
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
                {+plant.wateringFrequency === 7 &&
                    <>Water weekly</>
                }
                {(+plant.wateringFrequency % 7 === 0) && +plant.wateringFrequency !== 7 &&
                    <>Water every {+plant.wateringFrequency / 7} weeks</>
                }
                {+plant.wateringFrequency % 7 !== 0 &&  
                    <>Water every {+plant.wateringFrequency} days</>
                }
            </Span>
        </div>
        </>
    )
}

const Room = styled.span`
    font-size: 14px;
    font-weight: normal;
    margin-left: 5px;
`
const LastWatered = styled.p`
    font-size: 14px;
    padding: 5px 0;
`
const Span = styled.span`
    margin-left: 10px;
    font-size: 14px;
`

export default ExtraWateringDetails;