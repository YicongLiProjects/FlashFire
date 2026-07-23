import { useState } from "react";

const SkillSelection = () => {
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    return (
        <form className="flex flex-row items-start text-yellow-500" id="globalSkillsForm">
            <div className="mr-3">
                <label className="mr-1">Python</label>
                <input type="checkbox" name="Python" value="Python" onChange={(e) => {
                    e.target.checked ? setSelectedSkills([...selectedSkills, "Python"]) : setSelectedSkills(selectedSkills.filter(skill => skill !== "Python"));
                }}></input>
            </div>
            <div className="mr-3">
                <label className="mr-1">R (programming language)</label>
                <input type="checkbox" name="R" value="R" onChange={(e) => {
                    e.target.checked ? setSelectedSkills([...selectedSkills, "R"]) : setSelectedSkills(selectedSkills.filter(skill => skill !== "R"));
                }}></input>
            </div>
            <div className="mr-3">
                <label className="mr-1">Spark</label>
                <input type="checkbox" name="Spark" value="Spark" onChange={(e) => {
                    e.target.checked ? setSelectedSkills([...selectedSkills, "Spark"]) : setSelectedSkills(selectedSkills.filter(skill => skill !== "Spark"));
                }}></input>
            </div>
            <div className="mr-3">
                <label className="mr-1">AWS</label>
                <input type="checkbox" name="AWS" value="AWS" onChange={(e) => {
                    e.target.checked ? setSelectedSkills([...selectedSkills, "AWS"]) : setSelectedSkills(selectedSkills.filter(skill => skill !== "AWS"));
                }}></input>
            </div>
            <div className="mr-3">
                <label className="mr-1">Excel</label>
                <input type="checkbox" name="Excel" value="Excel" onChange={(e) => {
                    e.target.checked ? setSelectedSkills([...selectedSkills, "Excel"]) : setSelectedSkills(selectedSkills.filter(skill => skill !== "Excel"));
                }}></input>
            </div>
        </form>
    );
}

export default SkillSelection;