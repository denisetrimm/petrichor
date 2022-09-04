//STYLING
import styled from "styled-components";
// ICONS
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { TbAdjustments } from "react-icons/tb";
import { TbAdjustmentsOff } from "react-icons/tb";
//HOOKS & CONTEXT
import { useContext } from "react";
import { PlantContext } from "../../../context/PlantContext";
import { UserContext } from "../../../context/UserContext";
//COMPONENTS
import PlantCardInfo from "./PlantCardInfo";
import TypeAhead from "./TypeAhead";
import BackArrow from "../../UI/BackArrow";


const Discover = () => {
    const {plantUser} = useContext(UserContext);
    const { allPlants, filteredPlants}= useContext(PlantContext);

    return (
        <>
            <h2>Discover</h2>

            {/* ALLOW USER TO USE BACK BUTTON WHEN SIGNED IN */}
                {plantUser &&
                    <BackArrow/>
                }

            {/* DISPLAY SEARCH BAR AND PLANT CARDS */}
                {allPlants && 
                <>  
                    <TypeAhead/>
                    <PlantGrid>
                        {filteredPlants.map(plant => {
                            return (
                                <PlantCardInfo key={plant._id} plant={plant}/>
                            )
                        })}
                    </PlantGrid>
                </>
                }
        </>
    );
}

const PlantGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px 1%;
    margin-top: 40px;
    width: 100%;
`
export default Discover;