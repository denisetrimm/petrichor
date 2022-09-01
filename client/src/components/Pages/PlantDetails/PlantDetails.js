import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect, useContext } from "react";
import { PlantContext } from "../../../context/PlantContext";
import { UserContext } from "../../../context/UserContext";
import { useParams } from "react-router-dom";
import BackArrow from "../../UI/BackArrow";

const PlantDetails = () => {

    const { plantId } = useParams();
    const { user, isAuthenticated, isLoading} = useAuth0();
    const {plantUser} = useContext(UserContext);
    const { allPlants, filteredPlants } = useContext(PlantContext);
    const [currentPlant, setCurrentPlant] = useState(null);

    // Maybe add to plant context... I dunno
    useEffect(()=> {
        const selectedPlant = allPlants.find(plant => {
            return plant._id === plantId
        })
        setCurrentPlant(selectedPlant)

    }, [plantId])

    return (
        <>
        <BackArrow/>
        { currentPlant &&
            <>
                <PlantImg src={currentPlant.imgSrc}/>
                <CommonName>{currentPlant.commonName}</CommonName>
                <BotanicalName>{currentPlant.botanicalName}</BotanicalName>
            </>
        }
        
        </>
    );
}

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
export default PlantDetails;