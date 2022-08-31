import styled from "styled-components";

const Banner = () => {
    return (
        <>
        <BannerImg />
        </>
    );
}

const BannerImg = styled.div`
    background-image: url("https://images.unsplash.com/photo-1613862069619-bd0d453846d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
    background-color: #cccccc;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    height: 20%;
    margin-bottom: 40px;
    border-bottom-right-radius: 5px;
`
export default Banner;
