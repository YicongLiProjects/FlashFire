const SkillSelection = ({skillsSelected, changeSkillsSelected}: {skillsSelected: string[], changeSkillsSelected: (skills: string[]) => void}) => {
    return (
        <form className="flex flex-row items-start text-yellow-500" id="globalSkillsForm">
            <label className="mr-2">
                Python
                <input type="checkbox" name="Python" value="Python" onChange={(e) => {
                e.target.checked ? changeSkillsSelected([...skillsSelected, "Python"]) : changeSkillsSelected(skillsSelected.filter(skill => skill !== "Python"));
                }}></input>
            </label>
            <label className="mr-2">
                R (programming language)
                <input type="checkbox" name="R" value="R" onChange={(e) => {
                e.target.checked ? changeSkillsSelected([...skillsSelected, "R"]) : changeSkillsSelected(skillsSelected.filter(skill => skill !== "R"));
                }}></input>
            </label>
            <label className="mr-2">
                Spark
                <input type="checkbox" name="Spark" value="Spark" onChange={(e) => {
                e.target.checked ? changeSkillsSelected([...skillsSelected, "Spark"]) : changeSkillsSelected(skillsSelected.filter(skill => skill !== "Spark"));
                }}></input>
            </label>
            <label className="mr-2">
                AWS
                <input type="checkbox" name="AWS" value="AWS" onChange={(e) => {
                e.target.checked ? changeSkillsSelected([...skillsSelected, "AWS"]) : changeSkillsSelected(skillsSelected.filter(skill => skill !== "AWS"));
                }}></input>
            </label>
            <label className="mr-2">
                Excel
                <input type="checkbox" name="Excel" value="Excel" onChange={(e) => {
                e.target.checked ? changeSkillsSelected([...skillsSelected, "Excel"]) : changeSkillsSelected(skillsSelected.filter(skill => skill !== "Excel"));
                }}></input>
            </label>
        </form>
    );
}

export default SkillSelection;