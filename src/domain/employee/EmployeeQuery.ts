export interface EmployeeQuery {
  active?: boolean;
  name?: string;
  page: number;
  limit: number;
}
