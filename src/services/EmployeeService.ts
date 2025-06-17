import { IEmployee } from "../types/IEmployee";
import { BackendClient } from "./BackendClient";

// La clase EmployeeService se encarga de interactuar con el endpoint de empleados
export class EmployeeService extends BackendClient<IEmployee> {
  constructor() {
    super("http://localhost:8080/Empleados");
  }
}
