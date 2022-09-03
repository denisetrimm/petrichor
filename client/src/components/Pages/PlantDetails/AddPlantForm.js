// STYLING
import styled from "styled-components";
// ICONS
import { MdAdd } from "react-icons/md";
// HOOKS & CONTEXT
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect, useContext } from "react";
import { PlantContext } from "../../../context/PlantContext";
import { UserContext } from "../../../context/UserContext";

const AddPlantForm = ({currentPlant})=> {
    const { user, isAuthenticated, isLoading} = useAuth0();
    const {plantUser, addPlantToHome} = useContext(UserContext);
    const { allPlants, filteredPlants } = useContext(PlantContext);

    const [newPlantInfo, setNewPlantInfo] = useState(currentPlant)

    const handleChange = (key, value) => {
        setNewPlantInfo({
            ...newPlantInfo,
            [key]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(e)
        // console.log(newPlantInfo)
        addPlantToHome(newPlantInfo);
    }
// Need fields for
    // nickname
    // lastWatered
    // wateringFrequency
    // room
    console.log(plantUser.home)
    return (

        <>
            <Wrapper>
                <PlantForm onSubmit={(e)=> {handleSubmit(e)}}>
                    <Label htmlFor="nickname">Nickname</Label>
                    <Input
                        type="text" 
                        placeholder="Add a nickname"
                        id="nickname"
                        name="nickname"
                        value={newPlantInfo.nickname}
                        onChange={(e) => handleChange("nickname", e.target.value)}
                    />
                    <Label htmlFor="lastWatered">Last Watered</Label>
                    <Input
                        type="date"
                        id="lastWatered"
                        name="lastWatered"
                        value={newPlantInfo.lastWatered}
                        onChange={(e) => handleChange("lastWatered", e.target.value)}
                    />
                    <Label htmlFor="wateringFrequency">Watering Frequency</Label>
                    Every
                    <Input
                        type="number"
                        id="wateringFrequency"
                        name="wateringFrequency"
                        value={newPlantInfo.wateringFrequency}
                        onChange={(e) => handleChange("wateringFrequency", e.target.value)}
                    />days
                    <Label htmlFor="room">Room</Label>
                    <Select 
                        id="room"
                        name="room"
                        onChange={(e) => handleChange("room", e.target.value)}
                    >
                        <option value="">Where will she live...</option>
                        {plantUser &&
                            plantUser.home.map(room => {
                                return <option value={Object.keys(room)[0]}>{`${Object.values(room)[0]}`}</option>
                            })
                        }
                    </Select>
                    <AddBtn type="submit">
                        <MdAdd />Add plant to home 
                    </AddBtn>
                </PlantForm>
            </Wrapper>
            
        </>
    );
};

const Wrapper = styled.div`
    border: 1px solid green;
`
const PlantForm = styled.form`

`
const Label = styled.label`

`
const Input = styled.input`

`
const Select = styled.select`
    display: block;
`


const AddBtn = styled.button`
    background-color: var(--color-primaryHighlightThick);
    padding: 10px 10px;
    z-index: 80;

`
export default AddPlantForm;