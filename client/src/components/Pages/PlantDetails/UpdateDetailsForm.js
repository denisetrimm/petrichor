// STYLING
import styled from "styled-components";
// HOOKS & CONTEXT
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/UserContext";

const UpdateDetailsForm = ({currentPlant, setFormOpen})=> {

    const {plantUser, updateSingleHouseplant, removePlantFromHome} = useContext(UserContext);
    const [updatedPlantInfo, setUpdatedPlantInfo] = useState(currentPlant)
    // DT - SHOULD THIS BE A STATE + USEEFFECT?
    const roomArray = Object.entries(plantUser.home)    

    // UPDATE NEW PLANT OBJECT WITH INPUT VALUES
    const handleChange = (e, key, value) => {
        e.stopPropagation();
        setUpdatedPlantInfo({
            ...updatedPlantInfo,
            [key]: value
        })
    }
    // UPDATE PLANT IN DATABASE
    const handleSubmit = (e) => {
        e.stopPropagation();
        e.preventDefault();
        updateSingleHouseplant(updatedPlantInfo);
        setFormOpen(false)
    }
    // DELETE
    const handleDeleteClick = (e) => {
        e.stopPropagation();
        setFormOpen(false)
        removePlantFromHome(currentPlant)
    }


    return (

        <>
            <Wrapper>
                {/* UPDATE OPTIONAL DETAILS FOR PLANT */}
                <PlantForm onSubmit={(e)=> {handleSubmit(e)}} >

                    <InputDiv>
                        <Label htmlFor="nickname">Nickname:</Label>
                        <Input
                            type="text" 
                            placeholder="Add a nickname"
                            id="nickname"
                            name="nickname"
                            value={updatedPlantInfo.nickname}
                            onChange={(e) => {handleChange(e,"nickname", e.target.value)}}
                        />
                    </InputDiv>

                    <InputDiv>
                        <Label htmlFor="room">Room:</Label>
                        <Select 
                            id="room"
                            name="room"
                            onChange={(e) => handleChange(e, "room", e.target.value)}
                        >
                            <Option value={updatedPlantInfo.room}>{plantUser.home[updatedPlantInfo.room]}</Option>
                            {plantUser &&
                                roomArray.map(room => {
                                    return <Option value={room[0]}>{room[1]}</Option>
                                })
                            }
                        </Select>
                    </InputDiv>

                    <InputDiv>
                        <Label htmlFor="lastWatered">Last Watered:</Label>
                        <Input
                            type="date"
                            id="lastWatered"
                            name="lastWatered"
                            value={updatedPlantInfo.lastWatered}
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
                                value={updatedPlantInfo.wateringFrequency}
                                onChange={(e) => handleChange(e, "wateringFrequency", e.target.value)}
                            />
                            days
                        </FrequencySpan>
                    </InputDiv>
                    
                    <ButtonDiv>
                        <DeleteBtn type="button" onClick={(e)=> {handleDeleteClick(e)}}>Delete plant</DeleteBtn>
                        <SaveBtn type="submit">Save</SaveBtn>
                    </ButtonDiv>
                </PlantForm>
            </Wrapper>
            
        </>
    );
};

const Wrapper = styled.div`
    /* border: 1px solid maroon; */
    width: 100%;
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
const InputDiv = styled.div`
    /* border: 1px solid lavender; */
    margin: 10px;
`
const Label = styled.label`
    font-weight: bold;
    color: hsl(220, 10% , 49%);
`
const Input = styled.input`
    position: relative;
    font-size: 16px;
    width: 54%;
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
const FrequencySpan = styled.span`
    margin-left: 10px;
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
const ButtonDiv = styled.div`
    display: flex;
    justify-content: flex-end;
`
const DeleteBtn = styled.button`
    background-color: orangered;
    font-size: 14px;
    /* padding: 8px; */
    margin: 0;
    z-index: 80;
    align-self: center;
    &:hover{
        background-color: var(--color-pinkHighlight);
    }
`
const SaveBtn = styled.button`
    background-color: hsl(182, 22% , 47%);
    padding: 10px 40px;
    margin: 15px;
    z-index: 80;
    align-self: center;
`
export default UpdateDetailsForm;