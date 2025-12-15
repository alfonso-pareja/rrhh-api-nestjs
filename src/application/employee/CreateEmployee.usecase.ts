import { EmployeeService } from 'src/domain/employee/EmployeeService';

export class CreateEmployeeUseCase {
  constructor(private readonly employeeService: EmployeeService) {}

  execute(employee: { id: string; name: string; email: string }) {
    return this.employeeService.createEmployee(employee);
  }
}
