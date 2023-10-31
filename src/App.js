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
    
    const addEducation = (newEducation) => setEducationList(prevEducationList => [...prevEducationList, newEducation]);
    const addHobbies = (newHobby) => setHobbiesList(prevHobbiesList => [...prevHobbiesList, newHobby]);
    const addSkills = (newSkill) => setSkillsList(prevSkillsList => [...prevSkillsList, newSkill]);
    const handleName = (event) => {
        setMyName(event.target.value);
    };
    
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
    
    const buildContent = () => {
        let content = "";
        content += `My name is ${myName}. `;
        content += `My education is ${joinList(educationList)}. `;
        content += `My hobbies are ${joinList(hobbiesList)}. `;
        content += `My skills are ${joinList(skillsList)}. `;
        content += "Please create a one page resume for a software engineering job that highlights my skills.";
        console.log(content);
        return content;
    };
    
    const joinList = (list) => list.map(listItem => listItem.title).join(", ");
    
    return (
        <>
            <h1>Open AI Resume Builder</h1>
            <hr/>
            <MyName value={myName} onValueChange={handleName}/>
            <hr/>
            <AddAttributeForm labelText="Education" onAddAttribute={addEducation}/>
            <AttributeList attributeList={educationList}/>
            <hr/>
            <AddAttributeForm labelText="Hobbies" onAddAttribute={addHobbies}/>
            <AttributeList attributeList={hobbiesList}/>
            <hr/>
            <AddAttributeForm labelText="Skills" onAddAttribute={addSkills}/>
            <AttributeList attributeList={skillsList}/>
            <hr/>
            <button title={"generate"} type={"submit"} onClick={getCompletion}>Generate Resume</button>
            <div
                dangerouslySetInnerHTML={{ __html: response.replaceAll("\n", "<br/>") }}
            />
        </>
    );
};

export default App;