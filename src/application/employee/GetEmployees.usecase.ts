import { EmployeeService } from '../../domain/employee/EmployeeService';
import { EmployeeQuery } from 'src/domain/employee/EmployeeQuery';

export class GetEmployeesUseCase {
  constructor(private readonly employeeService: EmployeeService) {}

  execute(query: EmployeeQuery) {
    return this.employeeService.getEmployees(query);
  }
}
