'use client'
import JobTitleInput from "./components/job_title_input";
import Navbar from "./components/navbar";
import SkillSelection from "./components/skills_selection";
import WageSelection from "./components/wage_unit_selection";
import CollapsibleContainer from "./components/collapsible_container";
import { useState } from "react";

export default function Home() {
  type Job = {
    jobTitle: string;
    jobDescription: string;
    id: string;
    skillSet: string[];
  }
  const [jobList, setJobList] = useState<Job[]>([]);
  
  return (
    <main>
      <Navbar/>
      <div className="text-red-600 flex flex-row items-start gap-20 mt-10">
        <div className="flex flex-col items-start mt-5 ml-2 gap-2">
          <JobTitleInput/>
          <SkillSelection/>
          <WageSelection/>
          <button className="hover:text-yellow-500 px-15 py-4 border-red-400 border-2 rounded-xl text-4xl">Submit</button>
        </div>
        <CollapsibleContainer jobList={jobList}/>
      </div>
    </main>
  );
}
