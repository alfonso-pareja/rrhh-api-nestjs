import { Employee } from './Employee';
import { EmployeeQuery } from './EmployeeQuery';

export interface EmployeeRepository {
  save(employee: Employee): Promise<void>;
  find(query: EmployeeQuery): Promise<Employee[]>;
  findAll(): Promise<Employee[]>;
  findById(id: string): Promise<Employee | null>;
}
