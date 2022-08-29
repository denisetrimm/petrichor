import styled from "styled-components";

const ClickWrapper = ({children, handleFunction, id}) => {
    return(
        <Wrapper onClick={(e) => {handleFunction(e, id)}}>
            {children}
        </Wrapper>
    )
}

export default ClickWrapper;

const Wrapper = styled.span`
    &:hover {
        cursor: pointer;
    }
`