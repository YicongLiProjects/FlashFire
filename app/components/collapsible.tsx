import {useState} from "react";

export default function Collapsible({jobTitle, id, dispatch, skillSet}: {jobTitle: string, jobDescription: string, id: string, dispatch: React.Dispatch<any>, skillSet: string[]}) {
    // State used to make the job title and description editable
    // On change = action to take when component is modified
    // Dispatch = function to call the reducer to update the state of the container
    const [title, setTitle] = useState(jobTitle);
    const [description, setDescription] = useState("");
    return (
        <details>
            <summary>{title}</summary>
            <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <Skills id={id} skillSet={skillSet}/>
            <WageSelection id={id}/>
            <div className="flex flex-row gap-2">
                <button className="text-red-500 hover:text-yellow-400 px-4 py-2 border-orange-400 border-2 rounded-l" onClick={() => dispatch({type: "SAVE", payload: {id, title, description}})}>Save</button>
                <button className="text-red-500 hover:text-yellow-400 px-4 py-2 border-orange-400 border-2 rounded-l" onClick={() => dispatch({type: "DELETE", payload: {id}})}>Delete</button>
            </div>
        </details>
    );
}

// Skills selection in the collapsible
function Skills({id, skillSet}: {id: string, skillSet: string[]}) {
    // Skills state to keep track of selected skills
    // Send this to the reducer and when the collapsible is initialized
    const [skills, setSkills] = useState<string[]>(skillSet);
    return (
        <form className="flex flex-col items-start text-yellow-500" id={id}>
            <div className="mr-3">
                <label className="mr-1">Python</label>
                <input type="checkbox" name="Python" value="Python" onChange={(e) => {
                    if (e.target.checked) {
                        setSkills([...skills, "Python"]);
                    } else {
                        setSkills(skills.filter((skill) => skill !== "Python"));
                    }
                }}></input>
            </div>
            <div className="mr-3">
                <label className="mr-1">R (programming language)</label>
                <input type="checkbox" name="R" value="R" onChange={(e) => {
                    if (e.target.checked) {
                        setSkills([...skills, "R"]);
                    } else {
                        setSkills(skills.filter((skill) => skill !== "R"));
                    }
                }}></input>
            </div>
            <div className="mr-3">
                <label className="mr-1">Spark</label>
                <input type="checkbox" name="Spark" value="Spark" onChange={(e) => {
                    if (e.target.checked) {
                        setSkills([...skills, "Spark"]);
                    } else {
                        setSkills(skills.filter((skill) => skill !== "Spark"));
                    }
                }}></input>
            </div>
            <div className="mr-3">
                <label className="mr-1">AWS</label>
                <input type="checkbox" name="AWS" value="AWS" onChange={(e) => {
                    if (e.target.checked) {
                        setSkills([...skills, "AWS"]);
                    } else {
                        setSkills(skills.filter((skill) => skill !== "AWS"));
                    }
                }}></input>
            </div>
            <div className="mr-3">
                <label className="mr-1">Excel</label>
                <input type="checkbox" name="Excel" value="Excel" onChange={(e) => {
                    if (e.target.checked) {
                        setSkills([...skills, "Excel"]);
                    } else {
                        setSkills(skills.filter((skill) => skill !== "Excel"));
                    }
                }}></input>
            </div>
        </form>
    );
}

function WageSelection({id}: {id: string}) {
    return (
        <form className="flex flex-row items-start text-red-400" id={id}>
            <label className="mr-1">Hourly</label>
            <input type="radio" value="hourly" name="wage_unit" className="mr-3"></input>
            <label className="mr-1">Yearly</label>
            <input type="radio" value="yearly" name="wage_unit" className="mr-3"></input>
        </form>
    )
}
