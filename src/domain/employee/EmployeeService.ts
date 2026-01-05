import { EmployeeRepository } from './EmployeeRepository';
import { Employee } from './Employee';
import { EmployeeQuery } from './EmployeeQuery';

export class EmployeeService {
  constructor(private readonly repository: EmployeeRepository) {}

  async createEmployee(data: {
    id: string;
    name: string;
    email: string;
  }): Promise<Employee> {
    const existing = await this.repository.findById(data.id);

    if (existing) {
      throw new Error('Employee already exists');
    }

    const employee = new Employee(data.id, data.name, data.email, true);

    await this.repository.save(employee);
    return employee;
  }

  async getEmployees(query: EmployeeQuery): Promise<Employee[]> {
    if (query.limit > 50) {
      throw new Error('Limit exceeds maximum allowed');
    }

    return this.repository.find(query);
  }

  async deactivateEmployee(id: string): Promise<void> {
    const employee = await this.repository.findById(id);

    if (!employee) {
      throw new Error('Employee not found');
    }

    employee.active = false;
    await this.repository.save(employee);
  }
}
