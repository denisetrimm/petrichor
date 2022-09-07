import styled from "styled-components";
import BackArrow from "../UI/BackArrow";
import { MdError } from "react-icons/md"; // PROFILE

const NotFound = () => {
    return (
        <>
        <BackArrow/>
        <CenterDiv>
            <MdError size="60"/>
            <ErrorMessage>Oops!</ErrorMessage> 
            <ErrorMessage>This isn't what you're looking for.</ErrorMessage>
        </CenterDiv>
        </>
    );
}

const CenterDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50vh;
`
const ErrorMessage = styled.p`
    font-size: 30px;
    margin: 10px;
`
export default NotFound;