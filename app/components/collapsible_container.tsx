import Collapsible from './collapsible';
import { Job } from './collapsible_reducer';
import { Action } from './collapsible_reducer';

// This component is a container for collapsibles that represent jobs
const CollapsibleContainer = ({jobList, dispatch}: {jobList: Job[], dispatch: (action: Action) => void}) => {

    // Return the final container of collapsibles
    // Functional programming allows you to map over the jobs array and create elements from raw data to build the list
    return (
        <div className="flex flex-col items-start gap-3" id="collapsibleContainer">
            <h2 className="font-heading text-[30px] text-red-700">Jobs added</h2>
            {jobList.map((job) => (
                <Collapsible key={job.id} jobTitle={job.jobTitle} jobDescription={job.jobDescription} id={job.id} dispatch={dispatch} skillSet={job.skillSet} wageOption={job.wageOption}/>
            ))}
        </div>
    );
}

export default CollapsibleContainer;