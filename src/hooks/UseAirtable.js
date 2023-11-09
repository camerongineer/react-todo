import { useEffect, useState } from "react";
import axios from "axios";

const URL = "http://localhost";
const PORT = "3000";
const ITEMS_DIRECTORY = "items"

const useAirtable = () => {
    const fullUrl = `${URL}:${PORT}/${ITEMS_DIRECTORY}`;
    const [records, setRecords] = useState([]);
    
    useEffect(() => {
        axios.get(fullUrl)
        .then(res => setRecords(res.data ?? [])).catch(err => console.log(err));
    }, [fullUrl]);
    
    const postNewRecord = async (newRecord) => {
        await axios.post(fullUrl, { "fields": newRecord })
        .then(res => setRecords([...records, res.data])).catch(err => console.log(err));
    };
    
    return [records, postNewRecord];
};

export default useAirtable