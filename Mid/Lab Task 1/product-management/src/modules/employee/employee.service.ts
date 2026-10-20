import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Employee } from "./entities/employee.entity";
import { Repository } from "typeorm";
import { CreateEmployeeDto, UpdateEmployeeDto } from "./dto/employee.dto";


@Injectable()
export class EmployeeService {
    constructor(@InjectRepository(Employee) private readonly employeeRepository: Repository<Employee>,) { }

    async getEmployees() {
        try {
            const employees = this.employeeRepository.find();
            return employees;
        } catch (error) {
            throw error;
        }
    }

    async getEmployeesById(id: string) {
        try {
            const employee = await this.employeeRepository.findOne(
                { where: { id } }
            );

            if (!employee) {
                throw new NotFoundException("Employee not found!");
            }

            return employee;
        } catch (error) {
            throw error;
        }
    }

    async createEmployee(dto: CreateEmployeeDto) {
        try {
            const response = await this.employeeRepository.create(dto);
            return await this.employeeRepository.save(response);
        } catch (error) {
            throw error;
        }
    }

    async updateEmployee(id: string, dto: UpdateEmployeeDto) {
        try {

            console.log("id", id)
            if (!id) {
                throw new NotFoundException("Employee id is empty!");
            }
            const employee = await this.employeeRepository.findOne(
                {
                    where: { id }
                }
            )

            if (!employee) {
                throw new NotFoundException("Employee not found!");
            }

            Object.assign(employee, dto);

            const { id: uid, ...rest } = employee;

            return await this.employeeRepository.update({ id }, rest);

        } catch (error) {
            throw error;
        }
    }

    async deleteEmployee(id: string) {
        try {

            const employee = await this.employeeRepository.findOne({
                where: { id }
            });

            if (!employee) {
                throw new NotFoundException("Employee not found!");
            }

            return await this.employeeRepository.delete({ id: id });

        } catch (error) {
            throw error;
        }
    }
}