# Petrichor 🪴🌿

## Setup prerequisites
* An active account on MongoDB

## Getting started

### Install packages
* `cd` into the `server` folder and enter `yarn install`
* `cd` into the `client` folder and enter `yarn install`

### Set up MongoDB database
* Create new MongoDB database and collection
* Create `.env` passkey with the `MONGO_URI`
* In the project `server` folder, use node to run the `batchImport.js` file

The `plants.json` data is now available in your database.

### Spin up project

* `cd` into the `server` folder and enter `yarn start`
* `cd` into the `client` folder and enter `yarn start`

Enjoy!

---

## Plant endpoints

| Endpoint | Method | Description            |
| -------- | ------ | ---------------------- |
| `/get-plants`  | `GET`  | This endpoint returns an array of all plants. |
| `/get-plant/:plantId`  | `GET`  | This endpoint returns the plant object based on the provided `plantId`. |



## User endpoints

| Endpoint | Method | Description            |
| -------- | ------ | ---------------------- |
| `/get-user/:userId`  | `GET`  | This endpoint returns the user object based on the provided `userId`. |
| `/login-user`  | `POST`  | This endpoint accepts data in the body and checks whether the user is new. If the user exists, it returns the existing user data. If the user is new, it creates a new user and returns the created user data. |
| `/delete-user/:userId`  | `DELETE`  | This endpoint deletes an existing user based on the provided `userId`. |



## Houseplant endpoints

| Endpoint | Method | Description            |
| -------- | ------ | ---------------------- |
| `/add-user-plant`  | `POST`  | This endpoint accepts plant and user data in the body and checks if the user exists. If the user exists, it adds a new houseplant to the user and returns the updated user data. |
| `/update-single-houseplant`  | `PATCH`  | This endpoint accepts plant and user data in the body and checks if the user/houseplant exists. If they both exist, it updates the houseplant with the additional data and returns the user details. This endpoint updates the following houseplant fields: `nickname`, `lastWatered`, `wateringFrequency`, `nextWatering`, `room`. |
| `/update-plant-room`  | `PATCH`  | This endpoint accepts the houseplant `_id` and user `_id` and new `room` data in the body and checks if the user/houseplant exists. If they both exist, it updates the houseplant with the new room and returns the user details. This endpoint only updates the `room` field. |
| `/water-plant`  | `PATCH`  | This endpoint accepts the houseplant `_id` and user `_id` data in the body and checks if the user/houseplant exists. If they both exist, it sets the `lastWatered` field to the current date and updates the `nextWatering` date according to the houseplant's `wateringFrequency`.|
| `/snooze-plant`  | `PATCH`  | This endpoint accepts the houseplant `_id` and user `_id` data in the body and checks if the user/houseplant exists. If they both exist, it updates the `nextWatering` date according to the user's `snooze` value. If the plant is overdue (i.e. `nextWatering` date is in the past), it adds the snooze value to the current date.|
| `/set-snooze`  | `PATCH`  | This endpoint accepts the user `_id` and `snooze` duration data in the body and checks if the user exists. If they exist, it updates the `snooze` field according to the provided snooze duration. This value is applied to all snoozed houseplants.|
| `/delete-user-plant/:houseplant_id?_id=userId`  | `DELETE`  | This endpoint deletes an existing user houseplant based on the provided houseplant `_id`. This endpoint takes an additional `_id` query that corresponds to the user's `_id`. Note: This **does not** use the original base plant `_id` from the `plants` collection.  |
| `/delete-user-plants/:userId`  | `DELETE`  | This endpoint removes all houseplants from the user's `houseplants` array. |


---
## Features and functionality

### Without signing in:

### Discover page

![Discover](client\src\assets\screenshots\Discover-notLoggedIn.png)
 
Search, filter, and sort plants.
![Discover - Search and filter](client\src\assets\screenshots\Discover-notLoggedIn-filterSort.png)

### Plant details page
Click on a plant to see additional details and care requirements.
![Plant Details](client\src\assets\screenshots\PlantDetails-notLoggedIn.png)

### After signing in:
Note: Authentication is through Google using the Auth0 provider.

Hovering over a plant card allows you to access the quick add button.

![Discover - Quick add](client\src\assets\screenshots\Discover-loggedIn.png)

The Plant Details page allows you to enter additional details before adding the plant to your home

![Discover - Quick add form](client\src\assets\screenshots\PlantDetails-quickAddForm.png)

Existing plants of that type in your home are also listed and editable

![Discover - Quick add form](client\src\assets\screenshots\PlantDetails-homePlants.png)

---

## `plants` collection (plants.json) 

The following is an example of a single plant object.

```json
[
    {
        "_id": "", //(String) Generated by UUID
        "commonName": "", //(String) 
        "botanicaName": "", //(String) 
        "additionalNames": [""],//(Array of Strings)
        "family": "", //(String) Araceae, Bromeliaceae, Cactus/Succulent, etc., 
        "wateringFrequency": 7, //(Number) in days - most start at 7
        "humidiyLevel": "", //(String)  dry, average, humid
        "sunlightRequirements": "", //(String) bright-indirect, partial shade, low
        "soilRequirements": "", //(String)  normal, normal + peat, sandy, moist, none
        "petFriendly": "", //(String) yes, no
        "imgSrc": "", //(String) 
    }
]
```
## `users` collection (created on first login)
The following is an example of a single user object.

```json
[
    {
        "_id": "", //(String) Generated by UUID
        "dateJoined": "", //(Date String) Generated by moment.js
        "given_name": "", //(String) 
        "family_name": "", //(String) 
        "email": "", //(String) 
        "houseplants": [ 
            {
                "_id": "", //(String) New houseplant ID, Generated by UUID
                ...basePlantInfo //See plants.json for details
                "plantId": "", //(String) Global plant ID (same as Plants collection)
                "dateAdded": "", //(Date String) Generated by moment.js
                "nickname": "", //(String) 
                "lastWatered": "", //(Date String) 
                "wateringFrequency": 7,//(Number)
                "nextWatering": "", //(String) 
                "room": "", //(String) 
            }, 
            {
                "_id": ""
                ...basePlantInfo
                "plantId": "",
                "dateAdded": "", 
                "nickname": "",
                "lastWatered": "",
                "wateringFrequency": 7,
                "nextWatering": "",
                "room": ",
            }, 
        ],
        "home": { 
            "bathroom":"Bathroom",
            "basement":"Basement",
            "bedroom":"Bedroom",
            "entrance":"Entrance",
            "kitchen":"Kitchen",
            "livingRoom":"Living room",
            "office":"Office",
            "studio":"Studio",
            "tvRoom":"TV room",
            "other":"Other"
        },
        "snooze": 3,
    },
]
```
---

## Attribution

<a href="https://www.flaticon.com/free-icons/leaf" title="leaf icons">Leaf icons created by Freepik - Flaticon</a>
<br>
<a href="https://feey.ch/" title="feey">Plant images by Freepik - Unsplash</a>