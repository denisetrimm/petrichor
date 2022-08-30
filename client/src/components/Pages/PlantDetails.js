import styled from "styled-components";
import { useParams } from "react-router-dom";

const PlantDetails = () => {

    const { plantId } = useParams();

    return (
        <>
        {plantId}
        </>
    );
}

export default PlantDetails;