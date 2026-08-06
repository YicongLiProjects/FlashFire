"use client";

import { useModelContext } from "../context/predictions_context";
import { useRouter } from "next/navigation";
import { useState } from "react";

// One page
function SalaryResult({jobTitle, predictions, confidence, wageUnit, index}: {jobTitle: string, predictions: [number, number][], confidence: number, wageUnit: string, index: number}) {
    return (
        <div className="flex flex-col">
            <h1 className="text-6xl font-heading">{jobTitle} salaries</h1>
            {confidence < 0.5 && <h2 className="text-red-500">Low confidence in prediction</h2>}
            <h2 className="text-4xl">{predictions[index][0]} - {predictions[index][1]} $ / {wageUnit}</h2>
        </div>
    );
}

const SalaryResults = () => {
    const [index, setIndex] = useState(0);
    const { jobList, predictionResult } = useModelContext();
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center gap-50">
            <SalaryResult jobTitle={jobList?.[index]?.jobTitle || ""} predictions={predictionResult?.predictions || [[0, 0]]} confidence={predictionResult?.confidence || 0} wageUnit={jobList?.[index]?.wageOption?.replace("ly", "") || "year"} index={index}></SalaryResult>
            <div className="flex flex-row gap-10">
                <button className="rounded border-red-600 border-1 text-5xl py-3 px-7 text-orange-500" onClick={() => setIndex((((index - 1) % (jobList?.length || 1)) + (jobList?.length || 1)) % (jobList?.length || 1))}>Prev</button>
                <button className="rounded border-red-600 border-1 text-5xl py-3 px-7 text-orange-500" onClick={() => router.push("/")}>Home</button>
                <button className="rounded border-red-600 border-1 text-5xl py-3 px-7 text-orange-500" onClick={() => setIndex((((index + 1) % (jobList?.length || 1)) + (jobList?.length || 1)) % (jobList?.length || 1))}>Next</button>
            </div>
        </div>
    );
};

export default SalaryResults;