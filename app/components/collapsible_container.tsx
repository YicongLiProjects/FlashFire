import {useReducer} from 'react';
import collapsibleReducer from './collapsible_reducer';
import Collapsible from './collapsible';

type Job = {
    jobTitle: string;
    jobDescription: string;
    id: string;
    skillSet: string[];
}
const CollapsibleContainer = ({jobList}: {jobList: Job[]}) => {
    // Initialize the state of the container of collapsibles to an empty container
    const [jobs, dispatch] = useReducer(collapsibleReducer, jobList);

    // Adds a job to the container of collapsibles
    function addJob(jobTitle: string, jobDescription: string, id: string, skillSet: string[]) {
        dispatch({type: 'added', jobTitle, jobDescription, id, skillSet});
    }

    const handleAddClick = (jobTitle: string, jobDescription: string, id: string, skillSet: string[]) => {
        addJob(jobTitle, jobDescription, id, skillSet);
        // Checks each box in the skills selections that were selected when the collapsible is created
        const skillsForm = document.getElementById("globalSkillsForm") as HTMLFormElement;
        const skillsCheckBoxes = skillsForm.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
        skillsCheckBoxes.forEach((cb) => {
            if (skillSet.includes(cb.value)) {
                cb.checked = true;
            }
        });
    }

    // Return the final container of collapsibles
    // Functional programming allows you to map over the jobs array and create elements from raw data to build the list
    return (
        <div className="flex flex-col items-start gap-3" id="collapsibleContainer">
            <h2 className="font-heading text-[30px] text-red-700">Jobs added</h2>
            {jobs.map((job) => (
                <Collapsible jobTitle={job.jobTitle} jobDescription={job.jobDescription} id={job.id} dispatch={dispatch} skillSet={job.skillSet}/>
            ))}
            <button className="text-red-600 hover:text-yellow-500 px-4 py-2 border-red-400 border-2 rounded-xl" onClick={() => handleAddClick}>Add</button>
        </div>
    );
}

export default CollapsibleContainer;