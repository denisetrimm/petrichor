// STYLING
import styled from "styled-components";
//HOOKS & CONTEXT
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
// OTHER COMPONENTS
import HouseplantCardInfo from "./HouseplantCardInfo";

const InHome = ({currentPlant, currentHouseplantArray})=> {
    
    const {plantUser} = useContext(UserContext);

    return (
        <>
            {plantUser && currentPlant && currentHouseplantArray &&
                <Wrapper>
                    <SubTitle>{currentPlant.commonName}{currentPlant.commonName.charAt(currentPlant.commonName.length -1) === "s" ? "'" : "s" } in your home</SubTitle>
                    <PlantGrid>
                        {currentHouseplantArray.map(houseplant => {
                                return <HouseplantCardInfo key={houseplant._id} houseplant={houseplant}/>
                            })
                        }
                    </PlantGrid>
                </Wrapper>
            }
        </>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    margin-top: 60px;
    width: 100%;
`
const SubTitle = styled.h3`
    padding-top: 30px;
    border-top: 2px solid grey;
`
const PlantGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px 1%;
    margin-top: 40px;
    width: 100%;
`
export default InHome;