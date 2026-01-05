export interface EmployeeGateway {
  fetchEmployeeData(id: string): Promise<{ payrollId: string }>;
}
