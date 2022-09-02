import { useState, useEffect, createContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

    const [plantUser, setPlantUser] = useState(null);
    const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

    // USE AUTHENTICATED USER DETAILS TO RETRIEVE/CREATE USER DATA
    useEffect(() => {
        if (!isAuthenticated){
            console.log("logged out")
            setPlantUser(null)
        }
        else {
            console.log("logging in")
            fetch('/api/login-user', {
                method: "POST",
                body: JSON.stringify({given_name: user.given_name, family_name: user.family_name, email: user.email}),
                headers: {
                    Accept: "application/json",
                    "Content-Type" : "application/json"
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
                // console.log(data)
                setPlantUser(data.data)
            })
        }
        
    }, [isAuthenticated])

    // DELETE USER LOGIC - USED IN PROFILE
    const deleteUserProfile = () => {
        const text = "Are you sure? This action cannot be undone. Press OK to continue";
        if (!window.confirm(text)) {
            return
        }
        else {
            fetch(`/api/delete-user/${plantUser._id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type" : "application/json"
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
                if (data.success){
                    setPlantUser(null)
                    logout({ returnTo: window.location.origin })
                    alert("User deleted successfully")
                }
                else {
                    alert("Could not delete user. Please try again")
                }
            })
        }
    }

    const addPlantToHome = (plant) => {
        fetch('/api/add-user-plant', {
            method: "POST",
            body: JSON.stringify({_id: plantUser._id, plant: plant}),
            headers: {
                Accept: "application/json",
                "Content-Type" : "application/json"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data.data)
            if(data.success){
                setPlantUser(data.data)
                alert(`Added plant ${plant.commonName} to My Home`)
            }
        })
    }

return (
        <UserContext.Provider
            value={{
                plantUser,
                setPlantUser, 
                deleteUserProfile,
                addPlantToHome,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};