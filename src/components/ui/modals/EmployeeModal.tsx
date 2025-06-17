import { useState, useEffect } from "react";
import { useEmployeeStore } from "../../../store/employeeStore";

interface EmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const EmployeeModal: React.FC<EmployeeModalProps> = ({
    isOpen,
    onClose,
}) => {
    const {
        modalMode,
        selected,
        createEmployee,
        updateEmployee,
        fetchEmployees,
    } = useEmployeeStore();

    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        email: "",
        dni: ""
    });

    useEffect(() => {
        if (modalMode === "edit" && selected) {
            setForm({
                nombre: selected.nombre || "",
                apellido: selected.apellido || "",
                email: selected.email || "",
                dni: selected.dni || "",
            });
        } else {
            setForm({ nombre: "", apellido: "", email: "", dni: "" });
        }
    }, [modalMode, selected]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (modalMode === "create") {
            await createEmployee(form);
        } else if (modalMode === "edit" && selected?.id) {
            await updateEmployee(selected.id, form);
        }

        await fetchEmployees();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">
                    {modalMode === "edit" ? "Editar Empleado" : "Nuevo Empleado"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="nombre"
                        placeholder="Nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    <input
                        name="apellido"
                        placeholder="Apellido"
                        value={form.apellido}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 rounded"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            {modalMode === "edit" ? "Guardar cambios" : "Crear"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
