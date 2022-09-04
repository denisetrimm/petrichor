import { useState } from "react";
import styled from "styled-components";

const WaterCard = ({children, handleFunction, id, setShowButtons}) => {

    return(
        <Wrapper 
            onMouseEnter={() => {setShowButtons(true)}} 
            onMouseLeave={() => {setShowButtons(false)}} 
            onClick={() => {handleFunction(id)}}
        >
            {children}
        </Wrapper>
    )
}



const Wrapper = styled.div`
    background-color: whitesmoke;
    border: 2px solid var(--color-creamAccent);
    border-radius: 10px;
    padding: 20px;
    width: 20%;
    max-height: 400px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    transition-property: background-color, scale;
    transition: ease-in-out 200ms;

    &:hover {
        background-color: #ededed;
        transform: scale(1.01);
        cursor: pointer;
    }
`
export default WaterCard;