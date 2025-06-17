import { useEffect } from "react";
import { useEmployeeStore } from "../store/employeeStore";
import { EmployeeModal } from "../components/ui/modals/EmployeeModal"; // Asegúrate que este modal soporte `mode` y `selected`
import { IEmployee } from "../types/IEmployee";
import Layout from "../components/layout/Layout";

const EmployeesPage = () => {
  const {
    employees,
    fetchEmployees,
    deleteEmployee,
    selectEmployee,
    openModal,
    isModalOpen,
    closeModal,
  } = useEmployeeStore();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAdd = () => {
    selectEmployee(null);
    openModal("create");
  };

  

  const handleEdit = (employee: IEmployee) => {
    selectEmployee(employee);
    openModal("edit");
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Seguro que querés eliminar este empleado?")) {
      await deleteEmployee(id);
    }
  };

  return (
    <Layout>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Empleados</h1>
      <button
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
        onClick={handleAdd}
      >
        + Nuevo Empleado
      </button>

      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Apellido</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td className="p-2 border">{emp.nombre}</td>
              <td className="p-2 border">{emp.apellido}</td>
              <td className="p-2 border">{emp.email}</td>
              <td className="p-2 border space-x-2">
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                  onClick={() => handleEdit(emp)}
                >
                  Editar
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleDelete(emp.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EmployeeModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
    </Layout>
  );
};
export default EmployeesPage;