export default function AddSubmitButtons() {
    return (
        <div className="flex flex-row items-start">
            <button className="text-red-600 hover:text-yellow-500 px-4 py-2 border-red-400 border-2 rounded-xl">Add</button>
            <button className="text-red-600 hover:text-yellow-500 px-10 py-2 border-red-400 border-2 ml-3 rounded-xl">Submit</button>
        </div>
    );
}