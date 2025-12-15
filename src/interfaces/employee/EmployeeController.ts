import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { CreateEmployeeUseCase } from '../../application/employee/CreateEmployee.usecase';
import { CreateEmployeeDto } from './CreateEmployeeDto';
import { GetEmployeesUseCase } from 'src/application/employee/GetEmployees.usecase';

@Controller('employees')
export class EmployeeController {
  constructor(
    private readonly createEmployeeUseCase: CreateEmployeeUseCase,
    private readonly getEmployeesUseCase: GetEmployeesUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateEmployeeDto) {
    await this.createEmployeeUseCase.execute(body);
    return { status: 'created' };
  }

  @Get()
  async getAll(
    @Query('active') active?: string,
    @Query('name') name?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.getEmployeesUseCase.execute({
      active: active ? active === 'true' : undefined,
      name,
      page: Number(page),
      limit: Number(limit),
    });
  }
}
