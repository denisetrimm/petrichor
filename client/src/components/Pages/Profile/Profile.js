import styled from "styled-components";
import { IoIosArrowDown} from "react-icons/io";
import { IoIosArrowUp} from "react-icons/io";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";
import moment from 'moment';
import BackArrow from "../../UI/BackArrow";

const Profile = () => {
    const { user, isAuthenticated, isLoading, logout} = useAuth0();
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
                <p>Loading...</p>
            }
            {isAuthenticated && user && plantUser &&
                <>
                <h1>Profile</h1>
                <Avatar src={user.picture} alt="Profile"/>
                <p>{user.given_name} {user.family_name}</p>
                <p>{user.email}</p>
                <p>Caring for {plantUser.houseplants.length} plants</p>
                <p>Joined: {moment(plantUser.dateJoined).format("MMM DD, YYYY")}</p>
                <br></br> {/*REMOVE*/}
                <h3>Settings</h3>

                <button type="button" onClick={() => {setFormOpen(!formOpen)}}>
                    Set snooze duration
                    <Span>
                        {formOpen ? <IoIosArrowUp /> : <IoIosArrowDown/>}
                    </Span>
                </button>
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
                <button type="button" onClick={() => {removeAllPlantsFromHome()}}>Remove all plants from My Home</button>
                <button type="button" onClick={() => {deleteUserProfile()}}>Delete Profile</button>
                </>
            }
            
        </>
    );
}

const Avatar = styled.img`
    background-color: var(--color-creamAccent);
    padding: 10px;
    margin: 10px 0;
    width: 120px;
    border-radius: 50%;
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