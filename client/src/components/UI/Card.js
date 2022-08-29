import styled from "styled-components";

const Card = ({children, handleFunction, id}) => {
    return(
        <Wrapper onClick={() => {handleFunction(id)}}>
            {children}
        </Wrapper>
    )
}

export default Card;

const Wrapper = styled.div`
    border-bottom: 1px solid black;
    border-left: 1px solid black;
    border-right: 1px solid black;
    padding: 10px 10px;
    transition-property: background-color, box-shadow;
    transition-duration: 0.2s;

    &:hover {
        background-color: whitesmoke;
        cursor: pointer;
    }
`