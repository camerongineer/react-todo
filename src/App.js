import React, { useState } from "react";
import EducationList from "./EducationList";
import AddEducationForm from "./AddEducationForm";
import MyName from "./MyName";
import SkillsList from "./SkillsList";
import HobbiesList from "./HobbiesList";
import AddHobbiesForm from "./AddHobbiesForm";
import AddSkillsForm from "./AddSkillsForm";
import OpenAI from 'openai';


const API_KEY = ""; //Enter OPEN AI API key here

const App = () => {
    const [educationList, setEducationList] = useState([]);
    const [skillsList, setSkillsList] = useState([]);
    const [hobbiesList, setHobbiesList] = useState([]);
    const [myName, setMyName] = useState("");
    const [response, setResponse] = useState('');
    const addEducation = (newTodo) => setEducationList(prevTodoList => [...prevTodoList, newTodo]);
    const addHobbies = (newTodo) => setHobbiesList(prevTodoList => [...prevTodoList, newTodo]);
    const addSkills = (newTodo) => setSkillsList(prevTodoList => [...prevTodoList, newTodo]);
    
    
    const getCompletion = async () => {
        const openai = new OpenAI({
            apiKey: API_KEY,
            dangerouslyAllowBrowser: true, // defaults to process.env["OPENAI_API_KEY"]
        });
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: buildContent() }],
            model: 'gpt-3.5-turbo',
        });
        const res = chatCompletion.choices[0]["message"]["content"]
        console.log(res);
        setResponse(res);
    };
    
    const handleName = (event) => {
        setMyName(event.target.value);
    }
    
    const buildContent = () => {
        let content = "";
        content += `My name is ${myName}.`
        content += `My skills are ${skillsList.map(skill => skill.title).join(", ")}.`
        content += `My hobbies are ${hobbiesList.map(hobbies => hobbies.title).join(", ")}.`
        content += `My education is ${educationList.map(education => education.title).join(", ")}.`
        content += "Please create a one page resume for a software engineering job that highlights my skills."
        return content;
    };
    
    return (
        <>
            <h1>Open AI Resume Builder</h1>
            <hr/>
            <MyName value={myName} onValueChange={handleName}/>
            <p>
                <AddEducationForm onAddToDo={addEducation}/>
                <EducationList todoList={educationList}/>
            </p>
            <hr/>
            <p>
                <AddHobbiesForm onAddToDo={addHobbies}/>
                <HobbiesList todoList={hobbiesList}/>
            </p>
            <hr/>
            <p>
                <AddSkillsForm onAddToDo={addSkills}/>
                <SkillsList todoList={skillsList}/>
            </p>
            <hr/>
            <button onClick={getCompletion}>Response</button>
            <div
                dangerouslySetInnerHTML={{__html: response.replaceAll("\n", "<br/>")}}
            />
        </>
    );
};

export default App;