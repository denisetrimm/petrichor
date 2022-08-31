# plant-bb 🪴🌿

## Plant Endpoints

| Endpoint | Method | Description            |
| -------- | ------ | ---------------------- |
| `/get-plants`  | `GET`  | This endpoint returns an array of all plants. |
| `/get-plant/:plantId`  | `GET`  | This endpoint returns the plant object based on the provided `plantId`. |

## User Endpoints

| Endpoint | Method | Description            |
| -------- | ------ | ---------------------- |
| `/get-user/:userId`  | `GET`  | This endpoint returns the user object based on the provided `userId`. |
| `/login-user`  | `POST`  | This endpoint accepts data in the body and checks whether the user is new. If the user exists, it returns the user data. If the user is new, it creates a new user and returns the created user data. |
| `/delete-user/:userId`  | `DELETE`  | This endpoint deletes an existing user based on the provided `userId`. |

## plants.json
```json
[
    {
        "commonName": "",
        "botanicaName": "",
        "additionalNames": "",
        "family": "", // Araceae, Bromeliaceae, Cactus/Succulent, 
        "wateringFrequency": 7, //days - most start at 1 week
        "humidiyLevel": "", // dry, average, humid
        "sunlightRequirements": "", // bright-indirect, partial shade, low
        "soilRequirements": "", // normal, normal + peat, sandy, moist, none
        "petFriendly": "", // yes, no
        "imgSrc": ""
    }
]
```
## users.json
```json
[
    {
        "_id": "",
        "given_name": "",
        "family_name": "",
        "email": "",
        "picture": "",
        "sub": "",
        "housePlants": [ 
            {
                "_id": "",
                "plantId": "",//May need to add plantID vs unique user plant ID to add more than one
                "commonName": "",
                "nickname": "",
                "lastWatered": "",
                "wateringFrequency": "",
                "nextWatering": "",
                "room": "",
                "dateAdded": ""
            },
            {
                "_id": "",
                "commonName": "",
                "nickname": "",
                "lastWatered": "",
                "wateringFrequency": "",
                "nextWatering": "",
                "room": "",
                "dateAdded": ""
            }, 
        ],
        "home": [ "livingRoom", "tvRoom", "bedroom", "kitchen", "office", "basement", "bathroom", "other"
            // {
            //     "livingRoom": [0000, 0000, 0000],
            // },
            // {
            //     "tvRoom": [0000, 0000, 0000],
            // },
            // {
            //     "bedroom": [0000, 0000, 0000],
            // },
            // {
            //     "kitchen": [0000, 0000, 0000],
            // },
            // {
            //     "office": [0000, 0000, 0000],
            // },
            // {
            //     "basement": [0000, 0000, 0000],
            // },
            // {
            //     "bathroom": [0000, 0000, 0000],
            // },
        ],
    },
]
```
## Attribution

<a href="https://www.flaticon.com/free-icons/leaf" title="leaf icons">Leaf icons created by Freepik - Flaticon</a>