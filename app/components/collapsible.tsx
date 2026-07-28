import {useState} from "react";

// One collapsible component representing a job and a description
export default function Collapsible({jobTitle, id, dispatch, skillSet, wageOption}: {jobTitle: string, jobDescription: string, id: string, dispatch: React.Dispatch<any>, skillSet: string[], wageOption: string}) {
    // State used to make the job title and description editable
    // On change = action to take when component is modified
    // Dispatch = function to call the reducer to update the state of the container
    const [title, setTitle] = useState(jobTitle);
    const [description, setDescription] = useState("");
    const [wage, setWage] = useState(wageOption);

    function handleChangeJob() {
        dispatch({type: "changed", id, job: {jobTitle: title, jobDescription: description, id, wageOption: wage, skillSet}});
        alert("Job updated successfully!");
    }

    function handleDeleteJob() {
        dispatch({type: "removed", id});
        alert("Job removed successfully!");
    }

    return (
        <details>
            <summary>{title}</summary>
            <div className="flex flex-row gap-2">
                <h4 className="text-orange-400 underline">Job title:</h4>
                <input className="border-2" value={title} onChange={(e) => setTitle(e.target.value)}></input>
            </div>
            <h4 className="text-orange-400 underline">Job skills (5 in total)</h4>
            <Skills id={id} skillSet={skillSet}/>
            <div className="flex flex-row gap-2">
                <h4 className="text-orange-400 underline">Wage option:</h4>
                <WageSelection id={id} wageOption={wage} changeWageOption={setWage}/>
            </div>
            <div className="flex flex-row gap-2">
                <h4 className="text-orange-400 underline">Job description:</h4>
                <textarea className="border-2 mb-3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div className="flex flex-row gap-2">
                <button className="text-red-500 hover:text-yellow-400 px-4 py-2 border-orange-400 border-2 rounded-l active:bg-gray-300" onClick={handleChangeJob}>Save</button>
                <button className="text-red-500 hover:text-yellow-400 px-4 py-2 border-orange-400 border-2 rounded-l active:bg-gray-300" onClick={handleDeleteJob}>Delete</button>
            </div>
        </details>
    );
}

// Skills selection in the collapsible
function Skills({id, skillSet}: {id: string, skillSet: string[]}) {
    // Skills state to keep track of selected skills
    // Send this to the reducer and when the collapsible is initialized
    const allSkills = ["Python", "R", "Spark", "AWS", "Excel"];
    const [skills, setSkills] = useState<string[]>(skillSet);
    // Use map function to map raw data to elements and build the checked checklist
    // Nesting input inside label allows you to click the text to check the checkbox
    return (
        <form className="flex flex-col items-start text-yellow-500" id={id}>
            {allSkills.map((skill) => (
                <div className="mr-3" key={`${id}-${skill}`}>
                    <label className="mr-1">
                        {skill}
                        <input type="checkbox" checked={skills.includes(skill)} onChange={(e) => {
                        e.target.checked ? setSkills([...skills, skill]) : setSkills(skills.filter((s) => s !== skill));
                        }}></input>
                    </label>
                </div>
            ))}
        </form>
    );
}

// Wage type selection in the collapsible
function WageSelection({id, wageOption, changeWageOption}: {id: string, wageOption: string, changeWageOption: (unit: string) => void}) {
    return (
        <form className="flex flex-row items-start text-red-400" id={id}>
            <label className="mr-1">Hourly</label>
            <input type="radio" value="hourly" name={`wage_unit_${id}`} className="mr-3" checked={wageOption === "hourly"} onChange={() => changeWageOption("hourly")}></input>
            <label className="mr-1">Yearly</label>
            <input type="radio" value="yearly" name={`wage_unit_${id}`} className="mr-3" checked={wageOption === "yearly"} onChange={() => changeWageOption("yearly")}></input>
        </form>
    )
}
