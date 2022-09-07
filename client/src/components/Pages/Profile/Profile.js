import styled from "styled-components";
import { IoIosArrowDown} from "react-icons/io";
import { IoIosArrowUp} from "react-icons/io";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";
import moment from 'moment';
import BackArrow from "../../UI/BackArrow";


const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const {deleteUserProfile, removeAllPlantsFromHome, updateSnooze, plantUser} = useContext(UserContext);
    const [snooze, setSnooze] = useState(null)
    const [formOpen, setFormOpen] = useState(false)

    // WHEN PLANT USER IS UPDATED, UPDATE THE SNOOZE
    useEffect(()=> {
        if(plantUser){
            setSnooze(plantUser.snooze)
        }
    },[plantUser])
    
    const setSnoozeDuration = (e) => {
        e.preventDefault();
        updateSnooze(snooze)
        setFormOpen(false)
    }

    return (
        <>
        <BackArrow/>
            { isLoading &&
                <CenterDiv>
                    <LoadingMessage>Just a moment...</LoadingMessage>
                </CenterDiv>
            }
            {isAuthenticated && user && plantUser &&
                <>
                    <h2>Profile</h2>

                    <UserDetails>
                        <Avatar src={user.picture || plantUser.picture} alt="Profile"/>
                        <p>{user.given_name} {user.family_name}</p>
                        <p>{user.email}</p>
                    </UserDetails>
                    <UserDetails>
                        <Info>Caring for {plantUser.houseplants.length} plants</Info>
                    </UserDetails>
                        <p>Joined:<InfoSpan>{moment(plantUser.dateJoined).format("MMM DD, YYYY")}</InfoSpan> </p>

                    <Settings>Settings</Settings>

                    <SnoozeButton 
                        type="button"
                        formOpen={formOpen}  
                        onClick={() => {setFormOpen(!formOpen)}}
                    >
                        Set snooze duration
                        <Span>
                            {formOpen ? <IoIosArrowUp /> : <IoIosArrowDown/>}
                        </Span>
                    </SnoozeButton>
                    {plantUser && formOpen &&
                        <form onSubmit={(e)=> {setSnoozeDuration(e)}}>
                                Snooze for 
                                <Input
                                    type="number" 
                                    placeholder="snooze for"
                                    id="snoozeDuration"
                                    name="snoozeDuration"
                                    value={snooze}
                                    onChange={(e) => {setSnooze(e.target.value)}}
                                />
                                days
                                <SaveBtn type="submit">Save</SaveBtn>
                        </form>
                    }

                    <Button type="button" onClick={() => {removeAllPlantsFromHome()}}>Remove all plants from My Home</Button>
                    <Button type="button" onClick={() => {deleteUserProfile()}}>Delete Profile</Button>
                </>
            }
            
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
const LoadingMessage = styled.p`
    font-size: 30px;
    margin: 10px;
`
const Avatar = styled.img`
    background-color: var(--color-creamAccent);
    padding: 10px;
    margin: 40px 0;
    width: 120px;
    border-radius: 50%;
`
const UserDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`
const Info = styled.span`
    color: hsl(179, 30% , 29%);
    font-weight: bold;
`
const InfoSpan = styled.span`
    color: hsl(179, 30% , 29%);
    margin-left: 10px;
`
const Settings = styled.h3`
    border-top: 1px solid lightgrey;
    padding: 20px 80px;
    margin-top: 40px;
`
const Button = styled.button`
    margin: 10px;
    font-size: 14px;
    border: 1px solid var(--color-primaryMedium);
    color:black;
    background-color: transparent;
    &:hover{
        color: #fff;
        background-color: var(--color-primaryMedium);
    }
`
const SnoozeButton = styled.button`
    margin: 10px;
    font-size: 14px;
    border: 1px solid ${props => props.formOpen ? "none": "hsl(182, 22%, 47%)"};
    color: ${props => props.formOpen ? "white": "black"};
    background-color: ${props => props.formOpen ? "hsla(182, 22% , 47%, 0.5)": "transparent"};
    &:hover{
        color: #fff;
        background-color: var(--color-primaryMedium);
    }
`
const Span = styled.span`
    margin-left: 10px;
`
const Input = styled.input`
    position: relative;
    font-size: 16px;
    width: 50px;
    height: 35px;
    padding-left: 12px;
    margin: 0 10px;
    border: 2px solid var(--color-creamAccent);
    border-radius: 40px;
    &:focus-visible {
        outline: 2px solid var(--color-creamAccent);
        border: 2px solid var(--color-creamAccent);
    }
`
const SaveBtn = styled.button`
    background-color: hsl(182, 22% , 47%);
    padding: 10px 20px;
    margin: 15px;
    z-index: 80;
    align-self: center;
`

export default Profile;