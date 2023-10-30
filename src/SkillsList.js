import React from "react";
import ListItem from "./ListItem";

const SkillsList = ({ todoList }) => (
    <ul>{todoList.map(listItem =>
        <ListItem key={listItem.id} item={listItem}/>)}
    </ul>);

export default SkillsList;