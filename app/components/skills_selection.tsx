const SkillSelection = () => {
    return (
        <form className="flex flex-row items-start text-yellow-500">
            <div className="mr-3">
                <label className="mr-1">Python</label>
                <input type="checkbox" name="Python" value="Python"></input>
            </div>
            <div className="mr-3">
                <label className="mr-1">R (programming language)</label>
                <input type="checkbox" name="R" value="R"></input>
            </div>
            <div className="mr-3">
                <label className="mr-1">Spark</label>
                <input type="checkbox" name="Spark" value="Spark"></input>
            </div>
            <div className="mr-3">
                <label className="mr-1">AWS</label>
                <input type="checkbox" name="AWS" value="AWS"></input>
            </div>
            <div className="mr-3">
                <label className="mr-1">Excel</label>
                <input type="checkbox" name="Excel" value="Excel"></input>
            </div>
        </form>
    );
}

export default SkillSelection;