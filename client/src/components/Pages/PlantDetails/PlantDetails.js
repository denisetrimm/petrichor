// STYLING
import styled from "styled-components";
// ICONS
import { IoLeafOutline } from "react-icons/io5"; //Leaf
// HOOKS & CONTEXT
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect, useContext } from "react";
import { PlantContext } from "../../../context/PlantContext";
import { UserContext } from "../../../context/UserContext";
import { useParams } from "react-router-dom";
// COMPONENTS
import DiscoverArrow from "./DiscoverArrow";
import BackArrow from "../../UI/BackArrow";
import PlantCare from "./PlantCare";
import AddPlantForm from "./AddPlantForm";
import InHome from "./InHome";
// TOOLTIPS
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';


const PlantDetails = () => {

    const { plantId } = useParams();
    const { isAuthenticated } = useAuth0();
    const {plantUser} = useContext(UserContext);
    const { allPlants } = useContext(PlantContext);
    const [currentPlant, setCurrentPlant] = useState(null);
    const [currentHouseplantArray, setCurrentHouseplantArray] = useState(null);

    useEffect(()=> {
        let selectedPlant = null;
        setCurrentPlant(null)
        setCurrentHouseplantArray(null)

        if(allPlants){
            selectedPlant = allPlants.find(plant => {
                return plant._id === plantId
            })
            setCurrentPlant(selectedPlant)
        }
        if(plantUser && plantUser.houseplants.length > 0){
            const selectedPlantArray = plantUser.houseplants.filter(plant => {
                return selectedPlant._id === plant.plantId;
            })
            if (selectedPlantArray.length > 0){
                setCurrentHouseplantArray(selectedPlantArray)
            }
            else {
                setCurrentHouseplantArray(null)
            }
        }
    }, [plantId, plantUser])

    return (
        <>
        {/* FOR NON-LOGGED-IN USERS: ONLY GOES BACK TO DISCOVER PAGE */}
            {!isAuthenticated &&
                <DiscoverArrow/>
            }
        {/* FOR LOGGED IN USERS: GOES BACK TO THE PREVIOUS PAGE */}
            {plantUser &&
                <BackArrow/>
            }

        {currentPlant &&
            <>
            <FlexWrapper>
                {/* FOR ALL USERS: GENERAL PLANT DETAILS */}
                <PlantImg src={currentPlant.imgSrc}/>

                <PlantInfo>
                    <CommonName>{currentPlant.commonName}</CommonName>
                    <BotanicalName>{currentPlant.botanicalName}</BotanicalName>
                    
                    <Tippy content="Family">
                        <Family>
                            <IoLeafOutline color="hsl(179, 30% , 29%)" size="20"/>
                            <FamilySpan>{currentPlant.family}</FamilySpan>
                        </Family>
                    </Tippy>

                    {/* FOR LOGGED IN USERS: FORM TO ADD A PLANT TO HOME */}
                        {plantUser &&
                            <AddPlantForm currentPlant={currentPlant}/>
                        }

                    {/* FOR ALL USERS: GENERAL PLANT CARE */}
                    <PlantCare currentPlant={currentPlant}/>
                </PlantInfo>

            </FlexWrapper>

            {/* FOR LOGGED IN USERS: SHOW THIS PLANT IN THEIR HOME */}
            {plantUser && currentPlant && currentHouseplantArray && currentHouseplantArray.length > 0 &&
                <InHome currentPlant={currentPlant} currentHouseplantArray={currentHouseplantArray}/>
            } 
            </>
        }
        </>
    );
}

const FlexWrapper = styled.div`
    display: flex;
    position: relative;
    width: fit-content;
    justify-content: center;
`
const PlantInfo = styled.div`
    margin-left: 40px;
    max-width: 500px;
`
const PlantImg = styled.img`
    border-radius: 8px;
    max-width: 520px;
    max-height: 80%;
    max-height: 600px;
`
const CommonName = styled.p`
    font-weight: bold;
    font-size: 30px;
    padding: 10px 0;
`
const BotanicalName = styled.p`
    font-style: italic;
    font-size: 18px;
    padding: 10px 0;
`
const Family = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;
    font-size: 14px;
    padding: 10px 0;
`
const FamilySpan = styled.span`
    padding: 5px 0 0 10px;
    font-weight: bold;
    color: var(--color-primaryMedium);
`
export default PlantDetails;