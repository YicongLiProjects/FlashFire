// Define a job by its title, description and id
type Job = {
    jobTitle: string;
    jobDescription: string;
    id: string;
    skillSet: string[];
}

type Action =
    | {
        type: "added";
        jobTitle: string;
        jobDescription: string;
        id: string;
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