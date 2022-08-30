import {useState} from "react";

const useFetch = () => {

    const [status, setStatus] = useState("loading");
    const [error, setError] = useState(null);

    const sendRequest = (requestConfigObj, dataFunction) => {

        setError(null);

        fetch(requestConfigObj.url, {
                method: requestConfigObj.method ? requestConfigObj.method : "GET",
                headers: requestConfigObj.headers ? requestConfigObj.headers : {},
                body: requestConfigObj.body? JSON.stringify(requestConfigObj.body) : null,
                }
        )
        .then(res => {
            if(res.ok){
                return res.json();
            }
            throw new Error("Something went wrong!");
        })
        .then(data => {
            dataFunction(data);
            setStatus("idle");
        })
        .catch((err) => {
            setError(true);
            return Promise.reject()
        });
    }

    return {
        status,
        error,
        sendRequest
    }
}

export default useFetch;