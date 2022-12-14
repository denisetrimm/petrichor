import { useState, useEffect, createContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

    const [plantUser, setPlantUser] = useState(null);
    const { user, isAuthenticated, logout } = useAuth0();

    // ________________________________________________
    // 
    // USER FETCHES
    // ________________________________________________

    // USE AUTHENTICATED USER DETAILS TO RETRIEVE/CREATE USER DATA
    useEffect(() => {
        if (!isAuthenticated){
            setPlantUser(null)
        }
        else {
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
                if (data.success){
                    setPlantUser(data.data)
                }
                else{
                    alert(data.message)
                }
            })
        }
        
    }, [isAuthenticated])

    // DELETE USER LOGIC - USED IN PROFILE PAGE
    const deleteUserProfile = () => {
        const text = "Are you sure? This action cannot be undone. Press OK to continue.";
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
                    alert("User deleted successfully.")
                }
                else {
                    alert("Could not delete user. Please try again.")
                }
            })
        }
    }

    // ________________________________________________
    // 
    // HOUSEPLANT FETCHES
    // ________________________________________________

    // ADD SINGLE HOUSEPLANT - USED IN DISCOVER PAGE
    // .post("/api/add-user-plant", addPlantToHome)
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
            if(data.success){
                setPlantUser(data.data)
                alert(`Added ${plant.nickname || plant.commonName} to My Home.`)
            }
            else{
                alert(data.message)
            }
        })
    }

        // UPDATES THE ROOM FOR A SPECIFIED HOUSEPLANT
        // .patch("/api/update-plant-room", updatePlantRoom)
        const updatePlantRoom = (plant, room) => {
            fetch('/api/update-plant-room', {
                method: "PATCH",
                body: JSON.stringify({_id: plantUser._id, plant: plant, room: room}),
                headers: {
                    Accept: "application/json",
                    "Content-Type" : "application/json"
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
                if(data.success){
                    setPlantUser(data.data)
                    alert(`Added ${plant.nickname || plant.commonName} to ${plantUser.home[room]}.`)
                }
                else{
                    alert(data.message)
                }
            })
        }


        // UPDATES THE DETAILS FOR A SPECIFIED HOUSEPLANT
        // .patch("/api/update-single-houseplant", updateSingleHouseplant)
        const updateSingleHouseplant = (plant) => {
            fetch('/api/update-single-houseplant', {
                method: "PATCH",
                body: JSON.stringify({_id: plantUser._id, plant: plant}),
                headers: {
                    Accept: "application/json",
                    "Content-Type" : "application/json"
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
                if(data.success){
                    setPlantUser(data.data)
                    alert(`Updated ${plant.nickname ? plant.nickname : plant.commonName}`)
                }
                else{
                    alert(data.message)
                }
            })
        }

        // WATERS A SPECIFIED HOUSEPLANT
        // .patch("/api/water-plant", waterPlant)
        const waterSinglePlant = (plant) => {
            fetch('/api/water-plant', {
                method: "PATCH",
                body: JSON.stringify({_id: plantUser._id, plant: plant}),
                headers: {
                    Accept: "application/json",
                    "Content-Type" : "application/json"
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
                if(data.success){
                    setPlantUser(data.data)
                    alert(`Watered ${plant.nickname ? plant.nickname : plant.commonName}`)
                }
                else{
                    alert(data.message)
                }
            })
        }


        // WATERS MULTIPLE HOUSEPLANTS
        // .patch("/api/water-multiple-plants", waterMultiplePlants)
        const waterMultiplePlants = (plantArray) => {
            
            Promise.all(plantArray.forEach(plant => {
                fetch('/api/water-plant', {
                    method: "PATCH",
                    body: JSON.stringify({_id: plantUser._id, plant: plant}),
                    headers: {
                        Accept: "application/json",
                        "Content-Type" : "application/json"
                    }
                })
                .then((res)=>res.json())
                .then((data)=>{
                    if(data.success){
                        console.log(`Watered ${plant.commonName}`)
                        setPlantUser(data.data)
                    }
                    else{
                        alert(data.message)
                    }
                })
            }))
            .then(alert(`Watered overdue plants`))
            
        }

        // SNOOZE A SPECIFIED HOUSEPLANT
        const snoozeSinglePlant = (plant) => {

            fetch('/api/snooze-plant', {
                method: "PATCH",
                body: JSON.stringify({_id: plantUser._id, plant: plant, snooze: plantUser.snooze}),
                headers: {
                    Accept: "application/json",
                    "Content-Type" : "application/json"
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
                if(data.success){
                    setPlantUser(data.data)
                    alert(`Snoozed ${plant.nickname ? plant.nickname : plant.commonName} for ${plantUser.snooze} days`)
                }
                else{
                    alert(data.message)
                }
            })
            
        }
        // SET GLOBAL SNOOZE DURATION
        const updateSnooze = (snoozeDuration) => {
            fetch('/api/set-snooze', {
                method: "PATCH",
                body: JSON.stringify({_id: plantUser._id, snooze: snoozeDuration}),
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
                    alert(`Snooze set to ${snoozeDuration} days`)
                }
                else{
                    alert(data.message)
                }
            })
        }

        // // DELETES A SPECIFIED HOUSEPLANT
        // .delete("/api/delete-user-plant/:houseplant_Id", removePlantFromHome)
        const removePlantFromHome = (plant) => {
            const text = "Are you sure? This action cannot be undone. Press OK to continue.";
            if (!window.confirm(text)) {
                return
            }
            else {
                fetch(`/api/delete-user-plant/${plant._id}?_id=${plantUser._id}`, {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        "Content-Type" : "application/json"
                    }
                })
                .then((res)=>res.json())
                .then((data)=>{
                    if (data.success){
                        setPlantUser(data.data)
                        alert("Plant deleted successfully.")
                    }
                    else {
                        alert("Could not delete plant. Please try again.")
                    }
                })
            }
        }
        // // DELETES ALL HOUSEPLANTS FOR USER
        // .delete("/api/delete-user-plants/:userId", removeAllPlantsFromHome)
        const removeAllPlantsFromHome = () => {
            const text = "Are you sure? This action cannot be undone. Press OK to continue.";
            if (!window.confirm(text)) {
                return
            }
            else {
                fetch(`/api/delete-user-plants/${plantUser._id}`, {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        "Content-Type" : "application/json"
                    }
                })
                .then((res)=>res.json())
                .then((data)=>{
                    if (data.success){
                        setPlantUser(data.data)
                        alert("Removed all plants from your home.")
                    }
                    else {
                        alert("Could not delete plants. Please try again.")
                    }
                })
            }
        }

return (
        <UserContext.Provider
            value={{
                plantUser,
                setPlantUser, 
                deleteUserProfile,
                addPlantToHome,
                waterSinglePlant,
                waterMultiplePlants,
                snoozeSinglePlant,
                updateSnooze,
                updatePlantRoom,
                updateSingleHouseplant,
                removePlantFromHome,
                removeAllPlantsFromHome
            }}
        >
            {children}
        </UserContext.Provider>
    );
};