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
                "commonName": "",
                "nickname": "",
                "lastWatered": "",
                "wateringFrequency": "",
                "nextWatering": "",
                "room": ""
            },
            {
                "_id": "",
                "commonName": "",
                "nickname": "",
                "lastWatered": "",
                "wateringFrequency": "",
                "nextWatering": "",
                "room": ""
            }, 
        ],
        "home": [
            {
                "livingRoom": [0000, 0000, 0000],
            },
            {
                "tvRoom": [0000, 0000, 0000],
            },
            {
                "bedroom": [0000, 0000, 0000],
            },
            {
                "kitchen": [0000, 0000, 0000],
            },
            {
                "office": [0000, 0000, 0000],
            },
            {
                "basement": [0000, 0000, 0000],
            },
            {
                "bathroom": [0000, 0000, 0000],
            },
        ],
    },
]
```
