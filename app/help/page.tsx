"use client";

import { useRouter } from "next/navigation";

function HelpSection({title, content}: {title: string, content: string}) {
    return (
        <details className="text-red-500">
            <summary className="text-2xl font-heading">{title}</summary>
            <p>{content}</p>
        </details>
    );
}
export default function Help() {
    const router = useRouter();
    return (
        <div className="flex flex-col gap-20 ml-2">
            <div className="flex flex-row gap-5 mt-5">
                <button className="text-4xl border-red-400 border-1 text-orange-500 rounded-xl px-7 py-3 hover:text-red-600" onClick={() => router.back()}>Go back</button>
                <h1 className="text-6xl font-heading text-red-600">Help</h1>
            </div>
            <div className="gap-10">
                <HelpSection title="What is FlashFire?" content="FlashFire is a job salary prediction tool specifically tailored for data science professionals.
                        You can input your job title, select relevant skills and specify the wage unit.
                        A machine learning model trained on historical salary data will then predict the expected salary range for your job.">
                </HelpSection>
                <HelpSection title="How to use the tool" content="To use FlashFire, enter the job title in the input field, select the relevant skills from the checklist and choose the wage unit 
                        from the radio box (yearly or hourly) and finish by clicking the Add button. You can always edit it later by clicking on the collapsible under
                        Jobs added section. Over there, you can even add a job description if you need to! Once you are finished adding all the jobs, just click the 
                        giant Submit button to send the job list to the server. When you get your predictions, you can click previous or next to view the salary range for each job you added.
                        The first job will always be the one at the top of the Job added section. To go back to the main menu and restart, just click the Home button on the results page.">
                </HelpSection>
                <HelpSection title="Information on the machine learning model" content="The model used in FlashFire is a linear multi-regression model trained on the Kaggle dataset Data science job salary prediction Glassdoor. 
                        You can find the dataset here: https://www.kaggle.com/code/fahadrehman07/data-science-job-salary-prediction-glassdoor.
                        It contains 741 data points containing various information such as job title, company name, location, skills required, minimum and maximum salaries and more.">
                </HelpSection>
            </div>
        </div>
    );
}