"use client";
import { createContext, useContext, useState } from "react";

// A salary range has a min and a max, as well as a confidence level for prediction
export type SalaryRange = {
    minimumSalary: number;
    maximumSalary: number;
    confidence: number;
}

// Context for the prediction and loading state, allowing the component to be accessed from any other component
interface ModelContextType {
    predictionResult: SalaryRange | null;
    setPredictionResult: (predictionResult: SalaryRange | null) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export function ModelProvider ({ children }: { children: React.ReactNode }) {
    const [predictionResult, setPredictionResult] = useState<SalaryRange | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    return (
        <ModelContext.Provider value={{ predictionResult, setPredictionResult, loading, setLoading }}>
            {children}
        </ModelContext.Provider>
    );
}

export const useModelContext = () => useContext(ModelContext) as ModelContextType;