import styled from "styled-components";

const PlantCard = ({plant}) => {

    return (
        <>
            <PlantImg src={plant.imgSrc}/>
            <p>{plant.commonName}</p>
            <p>{plant.botanicalName}</p>
        </>
    );
}

const PlantImg = styled.img`
    border-radius: 8px;
    max-width: 80%;
    max-height: 80%;
`
export default PlantCard;