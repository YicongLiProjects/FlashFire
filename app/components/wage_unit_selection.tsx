const WageSelection = () => {
    return (
        <form className="flex flex-row items-start text-red-500">
            <label className="mr-1">Hourly</label>
            <input type="radio" value="hourly" name="wage_unit" className="mr-3"></input>
            <label className="mr-1">Yearly</label>
            <input type="radio" value="yearly" name="wage_unit" className="mr-3"></input>
        </form>
    );
}

export default WageSelection;