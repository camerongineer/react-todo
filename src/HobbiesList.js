import React from "react";
import ListItem from "./ListItem";

const HobbiesList = ({ todoList }) => (
    <ul>{todoList.map(listItem =>
        <ListItem key={listItem.id} item={listItem}/>)}
    </ul>);

export default HobbiesList;