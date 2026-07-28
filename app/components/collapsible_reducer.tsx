// Define a job by its title, description and id
export type Job = {
    jobTitle: string;
    jobDescription: string;
    id: string;
    wageOption: string;
    skillSet: string[];
}

// Types of possible actions that can be performed on a job
export type Action =
    | {
        type: "added";
        jobTitle: string;
        jobDescription: string;
        id: string;
        wageOption: string;
        skillSet: string[];
    }
    | {
        type: "removed";
        id: string;
    }
    | {
        type: "changed";
        id: string;
        job: Job;
    }
// Reducer function to manage the state of job collapsibles
// 3 cases: add, remove, edit 
export default function collapsibleReducer(jobs: Job[], action: Action): Job[] {
    switch (action.type) {
        case 'added': {
            return [...jobs, {
                jobTitle: action.jobTitle,
                jobDescription: action.jobDescription,
                id: action.id,
                wageOption: action.wageOption,
                skillSet: action.skillSet
            }];
        }
        case 'removed': {
            return jobs.filter((job: Job) => job.id !== action.id);
        }
        case 'changed': {
            return jobs.map(j => 
                j.id === action.id ? {
                    ...j,
                    jobTitle: action.job.jobTitle,
                    jobDescription: action.job.jobDescription,
                    skillSet: action.job.skillSet
                } : j
            );
        }
        default: {
            throw new Error('Action is of unknown type.');
        }
    }
}