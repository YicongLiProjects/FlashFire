export default function JobTitleInput() {
    return (
        <div className="flex flex-row items-start">
            <label className="text-[30px] font-heading text-red-700">Job title</label>
            <input type="text" className="border-2 ml-3 border-red-400 text-[30px] focus:border-red-600 focus:outline-none text-orange-800 rounded-[20px]"></input>
        </div>
    );
}