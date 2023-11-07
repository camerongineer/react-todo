import { useEffect, useState } from "react";
import axios from "axios";

const AIRTABLE_URL = "https://api.airtable.com/v0";
const API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
const SORT_BY_LAST_MODIFIED_TIME = "?sort%5B0%5D%5Bfield%5D=lastModifiedTime&sort%5B0%5D%5Bdirection%5D=asc"

const useAirtableState = (tableName) => {
    const fullUrl = `${AIRTABLE_URL}/${BASE_ID}/${tableName}${SORT_BY_LAST_MODIFIED_TIME}`;
    const [records, setRecords] = useState([]);
    
    useEffect(() => {
        axios.get(fullUrl, {
            headers: {
                "Authorization": `Bearer ${API_KEY}`
            }
        }).then(res => setRecords(res.data["records"] ?? [])).catch(err => console.log(err));
    }, [fullUrl, tableName]);
    
    const postNewRecord = async (newRecord) => {
        await axios.post(fullUrl, { "fields": newRecord }, {
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            }
        }).then(res => setRecords([...records, res.data])).catch(err => console.log(err));
    };
    
    return [records, postNewRecord];
};

export default useAirtableState
