import axios from "axios";

const BASE_URL = "https://api.airtable.com/v0";
const API_TOKEN = process.env.REACT_APP_AIRTABLE_API_TOKEN;
const TABLES_URL = `meta/bases/${process.env.REACT_APP_AIRTABLE_BASE_ID}/tables`;

export const fetchAirtableData = async ({ method, url, body }) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`
    };
    
    const axiosConfig = {
        method: method,
        url: `${BASE_URL}/${url}`,
        headers: headers,
        ...(body ? { data: body } : {})
    };
    
    const response = await axios(axiosConfig);
    return response.data;
};

export const getTableNames = async () => {
    const tablesRes = await fetchAirtableData({ method: "GET", url: TABLES_URL });
    
    const filteredTables = tablesRes.tables.filter(table => {
        const requiredFieldNames = ["title", "createDateTime", "description"];
        return requiredFieldNames.every(fieldName =>
            table.fields.some(field => field.name === fieldName)
        );
    });
    
    return filteredTables.map(table => {
        return {
            id: table.id,
            name: table.name
        };
    });
};

export const createNewTable = async (tableName) => {
    const airtableData = {
        name: tableName,
        fields: [
            {
                "type": "singleLineText",
                "name": "title"
            },
            {
                "type": "dateTime",
                "options": {
                    "dateFormat": {
                        "name": "local",
                        "format": "l"
                    },
                    "timeFormat": {
                        "name": "24hour",
                        "format": "HH:mm"
                    },
                    "timeZone": "client"
                },
                "name": "createDateTime"
            },
            {
                "type": "dateTime",
                "options": {
                    "dateFormat": {
                        "name": "local",
                        "format": "l"
                    },
                    "timeFormat": {
                        "name": "24hour",
                        "format": "HH:mm"
                    },
                    "timeZone": "client"
                },
                "name": "completeDateTime"
            },
            {
                "type": "singleLineText",
                "name": "description"
            }
        ]
    };
    try {
        await fetchAirtableData({ method: "POST", body: airtableData, url: TABLES_URL });
    } catch (error) {
        console.log(error.message);
    }
}