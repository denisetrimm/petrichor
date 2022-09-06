// STYLING
import styled from "styled-components";
// ICONS
import { MdOutlineChair } from "react-icons/md"; //Room
import { BsCalendarCheck } from "react-icons/bs"; // Calendar2
import { ImLoop2 } from "react-icons/im"; //Watering frequency - recurring loop
import { HiOutlineArrowCircleRight } from "react-icons/hi"; //Right arrow
//HOOKS & CONTEXT
import { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import moment from 'moment';

const ExtraHouseplantDetails = ({plant, setOpenDetails}) => {

    const { plantUser, updatePlantRoom} = useContext(UserContext);
    const [updatedRoom, setUpdatedRoom] = useState(plant.room)
    const navigate = useNavigate();
    // DT - SHOULD THIS BE A STATE + USEEFFECT?
    const roomArray = Object.entries(plantUser.home)  

    // CLICK CARD - TO PLANT DETAILS
    const handleClick = () => {
        navigate(`/plants/${plant.plantId}`);
    }
    const handleSubmit = (e) => {
        e.stopPropagation();
        e.preventDefault();
        // console.log(e.target.value)
        // console.log(updatedRoom)
        updatePlantRoom(plant, updatedRoom);
        setOpenDetails(false)
    }
    return (
        <>
            {/* UPDATE OPTIONAL DETAILS FOR PLANT */}
            <PlantForm onSubmit={(e)=> {e.stopPropagation();handleSubmit(e)}} >
                <Label htmlFor="room">Change room:</Label>
                <InputDiv>
                        <Select 
                            id="room"
                            name="room"
                            onChange={(e) => {e.stopPropagation(); setUpdatedRoom(e.target.value)}}
                        >
                            <Option value={plant.room}>{plantUser.home[plant.room]}</Option>
                            {plantUser &&
                                roomArray.map(room => {
                                    return <Option value={room[0]}>{room[1]}</Option>
                                })
                            }
                        </Select>
                        <SaveBtn type="submit">Save</SaveBtn>
                    </InputDiv>

            <PlantDetailsBtn onClick={()=> {handleClick()}}> Go to plant details <HiOutlineArrowCircleRight style={{marginLeft: "20px"}}size="20"/></PlantDetailsBtn>
            </PlantForm>
        </>
    )
}
const PlantDetailsBtn = styled.button`
    align-self: center;
    font-size: 14px;
    margin-top: 20px;
    display: flex;
    align-items: center;

`
const PlantForm = styled.form`
    /* border: 2px solid red; */
    background-color: var(--color-primaryHighlightThin);
    border-radius: 10px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    width: fit-content;
`
const Label = styled.label`
    margin-left: 10px;
    margin-top: 10px;
    font-weight: bold;
    color: hsl(220, 10% , 49%);
`
const InputDiv = styled.div`
    /* border: 1px solid blue; */
    /* margin: 10px; */
    border-bottom: 1px solid lightgrey;
`
const Select = styled.select`
    position: relative;
    font-size: 16px;
    height: 35px;
    padding-left: 12px;
    margin: 0 10px;
    border: 2px solid var(--color-creamAccent);
    border-radius: 40px;
    &:focus-visible {
        outline: 2px solid var(--color-creamAccent);
        border: 2px solid var(--color-creamAccent);
    }
`
const Option = styled.option`
`
const SaveBtn = styled.button`
    background-color: hsl(182, 22% , 47%);
    padding: 10px 20px;
    margin: 15px;
    z-index: 80;
    align-self: center;
    font-size: 14px;
`
export default ExtraHouseplantDetails;