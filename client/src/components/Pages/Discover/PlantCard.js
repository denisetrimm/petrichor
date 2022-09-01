import styled from "styled-components";

const PlantCard = ({plant}) => {

    return (
        <>
            <PlantImg src={plant.imgSrc}/>
            <CommonName>{plant.commonName}</CommonName>
            <BotanicalName>{plant.botanicalName}</BotanicalName>
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
export default PlantCard;