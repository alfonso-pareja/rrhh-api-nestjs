/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Module } from '@nestjs/common';
import { EmployeeRepositoryImpl } from '../persistence/EmployeeRepositoryImpl';
import { EmployeeController } from 'src/interfaces/employee/EmployeeController';
import { EmployeeService } from 'src/domain/employee/EmployeeService';
import { CreateEmployeeUseCase } from 'src/application/employee/CreateEmployee.usecase';
import { GetEmployeesUseCase } from 'src/application/employee/GetEmployees.usecase';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [EmployeeController],
  providers: [
    {
      provide: 'EmployeeRepository',
      useClass: EmployeeRepositoryImpl,
    },
    {
      provide: EmployeeService,
      useFactory: (repo) => new EmployeeService(repo),
      inject: ['EmployeeRepository'],
    },
    {
      provide: CreateEmployeeUseCase,
      useFactory: (service) => new CreateEmployeeUseCase(service),
      inject: [EmployeeService],
    },
    {
      provide: GetEmployeesUseCase,
      useFactory: (service) => new GetEmployeesUseCase(service),
      inject: [EmployeeService],
    },
  ],
})
export class EmployeeModule {}
