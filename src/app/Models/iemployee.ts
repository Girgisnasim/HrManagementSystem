export interface IEmployee {
        Id: number;
        SSN: any;
        Name: string;
        Nationality: string;
        Gender: string;
        phone: string;
        Address: string;
        Salary: any;
        HireDate: any; // Assuming DateOnly is a string representation of date in C#
        BirthDate: any; // Assuming DateOnly is a string representation of date in C#
        LeaveTime: string; // Assuming TimeSpan is a string representation of time in C#
        AttendTime: string; // Assuming TimeSpan is a string representation of time in C#
        Dept_id?: number | null; // Nullable field
        DeptName: string;
    }
    




