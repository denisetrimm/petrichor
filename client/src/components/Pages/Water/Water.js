//STYLING
import styled from "styled-components";
// ICONS

//HOOKS & CONTEXT
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect, useContext } from "react";
import { PlantContext } from "../../../context/PlantContext";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
//COMPONENTS
import Card from "../../UI/Card";
import WaterPlantCard from "./WaterPlantCard";
import BackArrow from "../../UI/BackArrow";


const Water = () => {
    const { user, isAuthenticated, isLoading} = useAuth0();
    const {plantUser} = useContext(UserContext);
    const { allPlants, filteredPlants, handleClear }= useContext(PlantContext);
    const [dueForWater, setDueForWater] = useState([]);
    const navigate = useNavigate();

    const handlePlantClick = (plantId) => {
        console.log("clicked!");
        console.log(`plantId`)
        handleClear();
        navigate(`/plants/${plantId}`);
    }
    
    useEffect(()=> {
        if(plantUser && plantUser.houseplants.length > 0){
            const filterPlants = plantUser.houseplants.filter(plant => {
                return moment().isSameOrAfter(plant.nextWatering, "day")
            })
            if (filterPlants.length > 0) {
                setDueForWater(filterPlants)
            }
        }
    },[plantUser])

    return (
        <>

        <h2>Water</h2>
        {plantUser &&
            <BackArrow/>
        }
        {allPlants && dueForWater.length > 0 &&
        <>  
            <PlantGrid>
                {dueForWater.map(plant => {
                        return (
                            <Card key={plant.plantId} id={plant.plantId} handleFunction={handlePlantClick}>
                                <WaterPlantCard plant={plant}/>
                            </Card>
                        )
                    }
                )}
            </PlantGrid>
        </>
        }
        </>
    );
}

const PlantGrid = styled.div`
    /* border: 1px solid blue; */
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px 1%;
    margin-top: 40px;
    width: 100%;
`

export default Water;