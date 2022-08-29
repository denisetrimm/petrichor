import styled, {keyframes} from "styled-components";

const Pop = ({size, color}) => {

    return <CircleAnimation size={size} color={color}></CircleAnimation>
}

export default Pop;

const bubble = keyframes`
    from {
        opacity: 1;
        transform: scale(0);
    }
    to {
        opacity: 0;
        transform: scale(1);
    }
`
const CircleAnimation = styled.div`
    height: ${props => props.size}px;
    width: ${props => props.size}px;
    border: 3px solid;
    border-color: ${props => props.color};
    border-radius: 50%;
    animation: ${bubble} 350ms forwards;
` 