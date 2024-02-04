import React from "react";
import { useSearchParams } from "react-router-dom";
import { createNewTable } from "../utils/fetchAirtableData";
import RedirectCreate from "./RedirectCreate";
import RequestCreate from "./RequestCreate";

const CreateContainer = () => {
    const [params] = useSearchParams();
    const tableName = params?.get("t");
    
    const handleCreateClicked = async (newName) => {
        await createNewTable(newName.trim())
        window.location.href = `/list/${newName}`;
    }
    
    if (!tableName?.trim().length) return <RequestCreate onCreateClicked={handleCreateClicked}/>
    
    return <RedirectCreate
        tableName={tableName}
        onCreateClicked={handleCreateClicked
    }/>;
};

export default CreateContainer;