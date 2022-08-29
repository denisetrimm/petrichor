import styled from "styled-components";

const Avatar = ({avatarSrc, size}) => {
    return (
            <AvatarImg src={avatarSrc} alt="avatar" style={{ width: size, height: size }}/>)
}

export default Avatar;

const AvatarImg = styled.img`
    border-radius: 50%;
`