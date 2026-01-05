import { EmployeeRepository } from '../../domain/employee/EmployeeRepository';
import { Employee } from '../../domain/employee/Employee';
import { EmployeeQuery } from 'src/domain/employee/EmployeeQuery';

export class EmployeeRepositoryImpl implements EmployeeRepository {
  private employees: Employee[] = [];

  async save(employee: Employee): Promise<void> {
    await new Promise<void>((resolve) => {
      this.employees.push(employee);
      resolve();
    });
  }

  async find(query: EmployeeQuery): Promise<Employee[]> {
    let result = [...this.employees];

    if (query.active !== undefined) {
      result = result.filter((e) => e.active === query.active);
    }

    if (query.name) {
      const qName = query.name.toLowerCase();
      result = result.filter((e) => e.name.toLowerCase().includes(qName));
    }

    const start = (query.page - 1) * query.limit;
    const end = start + query.limit;

    return Promise.resolve(result.slice(start, end));
  }

  async findAll(): Promise<Employee[]> {
    return Promise.resolve(this.employees);
  }

  async findById(id: string): Promise<Employee | null> {
    return Promise.resolve(this.employees.find((e) => e.id === id) ?? null);
  }
}
