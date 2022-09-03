import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../../context/UserContext";
import { useAuth0 } from "@auth0/auth0-react";


const HouseplantCard = ({plant}) => {
    const { user, isAuthenticated, isLoading, logout} = useAuth0();
    const { plantUser } = useContext(UserContext);

    return (
        <>
        {/* <Wrapper> */}
            <PlantImg src={plant.imgSrc}/>
            <CommonName>{plant.commonName}</CommonName>
            <BotanicalName>{plant.botanicalName}</BotanicalName>
        {/* </Wrapper> */}
        </>
    );
}
const Wrapper = styled.div`
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
export default HouseplantCard;