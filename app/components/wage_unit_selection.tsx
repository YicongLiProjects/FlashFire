const WageSelection = ({wageOption, changeWageOption}: {wageOption: string, changeWageOption: (unit: string) => void}) => {
    return (
        <form className="flex flex-row items-start text-red-500" id="globalWageForm">
            <label className="mr-1">
                Hourly
                <input type="radio" value="hourly" name="wage_unit" className="mr-3" checked={wageOption === "hourly"} onChange={() => changeWageOption("hourly")}></input>
            </label>
            <label className="mr-1">
                Yearly
                <input type="radio" value="yearly" name="wage_unit" className="mr-3" checked={wageOption === "yearly"} onChange={() => changeWageOption("yearly")}></input>
            </label>
        </form>
    );
}

export default WageSelection;