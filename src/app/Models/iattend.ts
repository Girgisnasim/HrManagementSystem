export interface IAttend {
    id: number;
    date: string;
    leaveTime: string;
    attendTime: string;
    emp_id: number;
    employee: any; // You can define a more specific type for this if needed
    hR_id: number;
    hRs: any; // You can define a more specific type for this if needed
}
