import styled from "styled-components";
import AddPlantBtn from "./AddPlantBtn";

//HOOKS & CONTEXT
import { useState, useContext } from "react";
import { PlantContext } from "../../../context/PlantContext";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";

const PlantCardInfo = ({plant}) => {
    const {plantUser} = useContext(UserContext);
    const { handleClear }= useContext(PlantContext);
    const [showButtons, setShowButtons] = useState(false)
    const navigate = useNavigate();

    const handlePlantClick = (plantId) => {
        handleClear();
        navigate(`/plants/${plantId}`);
    }

    return (
        <>
            <Wrapper 
                onMouseEnter={() => {setShowButtons(true)}} 
                onMouseLeave={() => {setShowButtons(false)}} 
                onClick={() => {handlePlantClick(plant._id)}}
            >
                <MiniWrapper>
                    <PlantImg src={plant.imgSrc}/>
                    <CommonName>{plant.commonName}</CommonName>
                    <BotanicalName>{plant.botanicalName}</BotanicalName>
                    {plantUser && showButtons &&
                        <AddPlantBtn plant={plant}/>
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
    max-height: 400px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    transition-property: background-color, scale;
    transition: ease-in-out 200ms;
    &:hover {
        background-color: #ededed;
        transform: scale(1.01);
        cursor: pointer;
    }
`
const MiniWrapper = styled.div`
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
export default PlantCardInfo;