import React, { useState } from "react";
import MyName from "./MyName";
import OpenAI from "openai";
import AddAttributeForm from "./AddAttributeForm";
import AttributeList from "./AttributeList";

const API_KEY = ""; //Enter OPENAI API key here

const App = () => {
    const [educationList, setEducationList] = useState([]);
    const [skillsList, setSkillsList] = useState([]);
    const [hobbiesList, setHobbiesList] = useState([]);
    const [myName, setMyName] = useState("");
    const [response, setResponse] = useState("");
    const addEducation = (newTodo) => setEducationList(prevTodoList => [...prevTodoList, newTodo]);
    const addHobbies = (newTodo) => setHobbiesList(prevTodoList => [...prevTodoList, newTodo]);
    const addSkills = (newTodo) => setSkillsList(prevTodoList => [...prevTodoList, newTodo]);
    
    const getCompletion = async () => {
        const openai = new OpenAI({
            apiKey: API_KEY,
            dangerouslyAllowBrowser: true // defaults to process.env["OPENAI_API_KEY"]
        });
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: "user", content: buildContent() }],
            model: "gpt-3.5-turbo"
        });
        const res = chatCompletion.choices[0]["message"]["content"];
        console.log(res);
        setResponse(res);
    };
    
    const handleName = (event) => {
        setMyName(event.target.value);
    };
    
    const buildContent = () => {
        let content = "";
        content += `My name is ${myName}.`;
        content += `My education is ${educationList.map(education => education.title).join(", ")}. `;
        content += `My hobbies are ${hobbiesList.map(hobbies => hobbies.title).join(", ")}. `;
        content += `My skills are ${skillsList.map(skill => skill.title).join(", ")}. `;
        content += "Please create a one page resume for a software engineering job that highlights my skills.";
        console.log(content);
        return content;
    };
    
    return (
        <>
            <h1>Open AI Resume Builder</h1>
            <hr/>
            <MyName value={myName} onValueChange={handleName}/>
            <p>
                <AddAttributeForm label="Education" onAddAttribute={addEducation}/>
                <AttributeList attributeList={educationList}/>
            </p>
            <hr/>
            <p>
                <AddAttributeForm label="Hobbies" onAddAttribute={addHobbies}/>
                <AttributeList attributeList={hobbiesList}/>
            </p>
            <hr/>
            <p>
                <AddAttributeForm label="Skills" onAddAttribute={addSkills}/>
                <AttributeList attributeList={skillsList}/>
            </p>
            <hr/>
            <button onClick={getCompletion}>Response</button>
            <div
                dangerouslySetInnerHTML={{ __html: response.replaceAll("\n", "<br/>") }}
            />
        </>
    );
};

export default App;