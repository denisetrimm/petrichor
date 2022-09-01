import styled from "styled-components";

const PlantCard = ({plant}) => {

    return (
            <PlantImg src={plant.imgSrc}/>
    );
}

const PlantImg = styled.img`
    border-radius: 5px;
    width: 25%;
`
export default PlantCard;