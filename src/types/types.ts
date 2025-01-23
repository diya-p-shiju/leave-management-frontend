export interface User {
    name: string;
    email: string;
    password: string;
    role: string;
    department: string;
}


export interface Leave{
    applicant: string;
    department: string;
    fromDate: Date;
    toDate: Date;
    reason: string;
    substituteSuggestion: {
        suggestedUser: string;
        suggestion: string;
    },
    actualLeaveDays: number;
}

