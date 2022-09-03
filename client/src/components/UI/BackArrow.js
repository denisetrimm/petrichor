import styled from "styled-components";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const BackArrow = () => {

    const navigate = useNavigate();

    return(
        <Wrapper>
            <Position>
                <HoverLink onClick={()=> {navigate(-1)}}><FiArrowLeft/></HoverLink>
                <PageTitle>Back</PageTitle>
            </Position>
        </Wrapper>
    )
}

export default BackArrow;

const Wrapper = styled.div`
    position: absolute;
    left: 21%;
`
const Position = styled.div`
    
`
const PageTitle = styled.h2`
    display: inline;
    font-weight: bold;
    margin-left: 10px;
    font-size: 20px;
`;

const HoverLink = styled.button`
    padding: 5px;
    padding-bottom: 1px;
    z-index: 101;
    &:hover {
        /* border-radius: 50%; */
        background-color: var(--color-primaryDark);
    }
`