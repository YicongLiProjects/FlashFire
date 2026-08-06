"use client";
import { createContext, useContext, useState } from "react";
import { Job } from "../components/collapsible_reducer";

// A salary range has a min and a max, as well as a confidence level for prediction
export type SalaryRange = {
    predictions: [number, number][];
    confidence: number;
}

// Context for the prediction and loading state, allowing the component to be accessed from any other component
interface ModelContextType {
    jobList: Job[] | null;
    setJobList: (jobList: Job[] | null) => void;
    predictionResult: SalaryRange | null;
    setPredictionResult: (predictionResult: SalaryRange | null) => void;
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export function ModelProvider ({ children }: { children: React.ReactNode }) {
    const [predictionResult, setPredictionResult] = useState<SalaryRange | null>(null);
    const [jobList, setJobList] = useState<Job[] | null>(null);
    return (
        <ModelContext.Provider value={{ jobList, setJobList, predictionResult, setPredictionResult }}>
            {children}
        </ModelContext.Provider>
    );
}

export const useModelContext = () => useContext(ModelContext) as ModelContextType;