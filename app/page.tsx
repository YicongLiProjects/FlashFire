'use client'
import JobTitleInput from "./components/job_title_input";
import Navbar from "./components/navbar";
import SkillSelection from "./components/skills_selection";
import WageSelection from "./components/wage_unit_selection";
import CollapsibleContainer from "./components/collapsible_container";
import collapsibleReducer from "./components/collapsible_reducer";
import { useState, useReducer } from "react";
import { useRouter } from 'next/navigation';
import { useModelContext } from "./context/predictions_context";

export default function Home() {
  const [wageUnit, setWageUnit] = useState("yearly");
  const [skillsList, setSkillsList] = useState<string[]>([]);
  const [jobTitle, setJobTitle] = useState("");
  const [jobList, dispatch] = useReducer(collapsibleReducer, []);
  const [jobAdded, setJobAdded] = useState(false);
  const router = useRouter();
  const { setJobList, setPredictionResult } = useModelContext();

  // Adds a job to the job list on the client end
  function handleAddJob() {
    dispatch({
      type: "added",
      jobTitle: !jobTitle.trim() ? "Untitled": jobTitle,
      jobDescription: "",
      wageOption: wageUnit,
      id: crypto.randomUUID(),
      skillSet: skillsList
    });
    setJobAdded(true);
    setTimeout(() => setJobAdded(false), 2000);
  }

  // Sends the job list to the machine learning model for salary prediction
  async function submitJobs() {
    // Transform the job list to only include job title and skill set to input to the model
    const jobs = jobList.map((job) => ({
      jobTitle: job.jobTitle,
      skillSet: job.skillSet,
      wageOption: job.wageOption
    }));
    setJobList(jobList);
      const response = await fetch('http://localhost:8000/predict_salary', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(jobs)
      });
      const data = await response.json();
      if (!response.ok) {
        console.log("Error: " + data.error);
        return;
      }
      setPredictionResult(data);
      router.push('/salary_results');
  }

  return (
    <main>
      <Navbar/>
      <div className="text-red-600 flex flex-row items-start gap-20 mt-10">
        <div className="flex flex-col items-start mt-5 ml-2 gap-2">
          {jobAdded && <h5>Job added successfully!</h5>}
          <JobTitleInput jobName={jobTitle} changeJobName={setJobTitle}/>
          <SkillSelection skillsSelected={skillsList} changeSkillsSelected={setSkillsList} />
          <WageSelection wageOption={wageUnit} changeWageOption={setWageUnit}/>
          <div className="flex flex-row">
            <button className="text-red-600 hover:text-yellow-500 px-15 py-2 border-red-400 border-2 rounded-xl active:bg-gray-300 text-2xl mr-2" onClick={handleAddJob}>Add</button>
            <button className="hover:text-yellow-500 px-15 py-4 border-red-400 border-2 rounded-xl text-4xl" onClick={submitJobs}>Submit</button>
          </div>
        </div>
        <CollapsibleContainer jobList={jobList} dispatch={dispatch}/>
      </div>
    </main>
  );
}
