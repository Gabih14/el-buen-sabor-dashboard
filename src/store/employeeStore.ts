import { create } from "zustand";
import { IEmployee } from "../types/IEmployee";
import { EmployeeService } from "../services/EmployeeService";

interface EmployeeState {
    employees: IEmployee[];
    loading: boolean;
    error: string | null;
    selected: IEmployee | null;

    // Modal control
    isModalOpen: boolean;
    modalMode: "create" | "edit" | "view";

    // Acciones
    fetchEmployees: () => Promise<void>;
    createEmployee: (employee: Omit<IEmployee, "id">) => Promise<void>;
    updateEmployee: (id: number, employee: Partial<IEmployee>) => Promise<void>;
    deleteEmployee: (id: number) => Promise<void>;
    selectEmployee: (employee: IEmployee | null) => void;
    openModal: (mode: "create" | "edit" | "view") => void;
    closeModal: () => void;
}

const service = new EmployeeService();

export const useEmployeeStore = create<EmployeeState>((set, get) => ({
    employees: [],
    loading: false,
    error: null,
    selected: null,
    isModalOpen: false,
    modalMode: "create",

    fetchEmployees: async () => {
        set({ loading: true, error: null });
        try {
            const employees = await service.getAll();
            set({ employees });
        } catch (error: any) {
            set({ error: error.message || "Error al obtener empleados" });
        } finally {
            set({ loading: false });
        }
    },

    createEmployee: async (employee) => {
        try {
            await service.post(employee);
            await get().fetchEmployees();
            get().closeModal();
        } catch (error: any) {
            set({ error: error.message || "Error al crear empleado" });
        }
    },

    updateEmployee: async (id, employee) => {
        try {
            const existing = get().employees.find(e => e.id === id);
            if (!existing) throw new Error("Empleado no encontrado");
            const updatedEmployee: IEmployee = { ...existing, ...employee, id };
            await service.put(id, updatedEmployee);
            await get().fetchEmployees();
            get().closeModal();
        } catch (error: any) {
            set({ error: error.message || "Error al actualizar empleado" });
        }
    },

    deleteEmployee: async (id) => {
        try {
            await service.delete(id);
            await get().fetchEmployees();
        } catch (error: any) {
            set({ error: error.message || "Error al eliminar empleado" });
        }
    },

    selectEmployee: (employee) => set({ selected: employee }),
    openModal: (mode) => set({ isModalOpen: true, modalMode: mode }),
    closeModal: () => set({ isModalOpen: false, selected: null }),
}));
