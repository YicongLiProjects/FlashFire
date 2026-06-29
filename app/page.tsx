import AddSubmitButtons from "./components/add_submit_buttons";
import JobTitleInput from "./components/job_title_input";
import Navbar from "./components/navbar";
import SkillSelection from "./components/skills_selection";
import WageSelection from "./components/wage_unit_selection";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <div className="flex flex-col items-start mt-30 ml-2 gap-2">
        <JobTitleInput/>
        <SkillSelection/>
        <WageSelection/>
        <AddSubmitButtons/>
      </div>
    </main>
  );
}
