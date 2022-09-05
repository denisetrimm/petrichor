// STYLING
import styled from "styled-components";
// ICONS
import { MdAdd } from "react-icons/md";
import { BiDownArrow } from "react-icons/bi";
import { IoIosArrowDown} from "react-icons/io";
import { IoIosArrowUp} from "react-icons/io";
import { MdRemove } from "react-icons/md"; // Snooze
// HOOKS & CONTEXT
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect, useContext } from "react";
import { PlantContext } from "../../../context/PlantContext";
import { UserContext } from "../../../context/UserContext";

const UpdateDetailsForm = ({currentPlant})=> {
    const { user, isAuthenticated, isLoading} = useAuth0();
    const {plantUser, addPlantToHome, updateHouseplant, removePlantFromHome} = useContext(UserContext);
    const { allPlants, filteredPlants } = useContext(PlantContext);

    const [newPlantInfo, setNewPlantInfo] = useState(currentPlant)
    const [formOpen, setFormOpen] = useState(false)

    const handleChange = (e, key, value) => {
        e.stopPropagation();
        setNewPlantInfo({
            ...newPlantInfo,
            [key]: value
        })
    }
    const handleSubmit = (e) => {
        e.stopPropagation();
        e.preventDefault();
        updateHouseplant(newPlantInfo);
        setFormOpen(false)
    }
    // DELETE
    const handleDeleteClick = (e) => {
        e.stopPropagation();
        removePlantFromHome(currentPlant)
    }
    // DT - SHOULD THIS BE A STATE + USEEFFECT?
    const roomArray = Object.entries(plantUser.home)
    // console.log(roomArray)

    return (

        <>
            <Wrapper>
                {/* BUTTON OPENS/CLOSES FORM */}
                
                {/* ADD OPTIONAL DETAILS FOR PLANT */}
                <PlantForm onSubmit={(e)=> {handleSubmit(e)}}>
                    <>
                    <InputDiv>
                        <Label htmlFor="nickname">Nickname:</Label>
                        <Input
                            type="text" 
                            placeholder="Add a nickname"
                            id="nickname"
                            name="nickname"
                            value={newPlantInfo.nickname}
                            onChange={(e) => {handleChange(e,"nickname", e.target.value)}}
                        />
                    </InputDiv>
                    <InputDiv>
                        <Label htmlFor="lastWatered">Last Watered:</Label>
                        <Input
                            type="date"
                            id="lastWatered"
                            name="lastWatered"
                            value={newPlantInfo.lastWatered}
                            onChange={(e) => handleChange(e, "lastWatered", e.target.value)}
                        />
                    </InputDiv>
                    <InputDiv>
                        <Label htmlFor="wateringFrequency">Water:</Label>
                        <FrequencySpan>
                        Every
                        
                        <InputFrequency
                            type="number"
                            id="wateringFrequency"
                            name="wateringFrequency"
                            value={newPlantInfo.wateringFrequency}
                            onChange={(e) => handleChange(e, "wateringFrequency", e.target.value)}
                        />days</FrequencySpan>
                    </InputDiv>
                    <InputDiv>
                        <Label htmlFor="room">Room:</Label>
                        <Select 
                            id="room"
                            name="room"
                            onChange={(e) => handleChange(e, "room", e.target.value)}
                        >
                            <Option value={newPlantInfo.room}>{plantUser.home[newPlantInfo.room]}</Option>
                            {plantUser &&
                                roomArray.map(room => {
                                    return <Option value={room[0]}>{room[1]}</Option>
                                })
                            }
                        </Select>
                    </InputDiv>
                    <AddBtn type="submit">
                        {/* <MdAdd /> Save  */}
                        Save
                    </AddBtn>
                    <DeleteBtn type="button" onClick={(e)=> {handleDeleteClick(e)}}>Delete plant</DeleteBtn>
                    </>
                </PlantForm>
            </Wrapper>
            
        </>
    );
};
const DeleteBtn = styled.button`
    background-color: orangered;
    padding: 8px;
    z-index: 80;
    align-self: center;
    &:hover{
        background-color: var(--color-pinkHighlight);
    }
    margin: 0;
`
const Wrapper = styled.div`
    width: 90%;
    /* border: 1px solid maroon; */

`
const ExpandBtn = styled.button`
    /* border: 1px solid lavender; */
    align-self: center;
    margin: 20px 0 10px;
    width: fit-content;
    &:hover{
        transform: none;
        background-color: ${props => props.formOpen && "hsl(182, 22% , 47%)"};
    }
    background-color: ${props => props.formOpen? "hsla(182, 22% , 47%, 0.5)":"hsl(182, 22%, 47%)"};

`
const InputDiv = styled.div`
    /* border: 1px solid lavender; */
    margin: 10px;
`
const PlantForm = styled.form`
    background-color: var(--color-primaryHighlightThin);
    border-radius: 10px;
    /* border: 1px solid red; */
    /* box-shadow: 0 4px 2px -2px lightgrey; */
    display: flex;
    flex-direction: column;
    width: fit-content;
`
const Label = styled.label`
    font-weight: bold;
    color: hsl(220, 10% , 49%);
`
const FrequencySpan = styled.span`
    margin-left: 10px;
`
const Input = styled.input`
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
const InputFrequency = styled.input`
    position: relative;
    font-size: 16px;
    height: 35px;
    width: 50px;
    padding-left: 12px;
    margin: 0 5px;
    border: 2px solid var(--color-creamAccent);
    border-radius: 40px;
    &:focus-visible {
        outline: 2px solid var(--color-creamAccent);
        border: 2px solid var(--color-creamAccent);
    }
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

const AddBtn = styled.button`
    background-color: hsl(182, 22% , 47%);
    padding: 10px 20px;
    z-index: 80;
    align-self: center;
`
export default UpdateDetailsForm;