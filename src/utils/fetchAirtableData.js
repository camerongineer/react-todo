import axios from "axios";

const BASE_URL = "https://api.airtable.com/v0";
const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
const API_TOKEN = process.env.REACT_APP_AIRTABLE_API_TOKEN;
const AIRTABLE_URL = `${BASE_URL}/${BASE_ID}/`;

export const fetchAirtableData = async ({ method, url, body }) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`
    };
    
    const axiosConfig = {
        method: method,
        url: `${AIRTABLE_URL}${url ?? ""}`,
        headers: headers,
        ...(body ? { data: body } : {})
    };
    
    try {
        const response = await axios(axiosConfig);
        return response.data;
    } catch (error) {
        throw new Error(`Error: ${error.response ? error.response.status : "Unknown"}`);
    }
};