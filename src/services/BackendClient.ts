import { AbstractBackendClient } from "./AbstractBackendClient";

// Garantizamos que T tenga al menos un id numérico
export abstract class BackendClient<T extends { id: number }> extends AbstractBackendClient<T> {
  async getAll(): Promise<T[]> {
    const response = await fetch(`${this.baseUrl}`);
    const data = await response.json();
    return data as T[];
  }

 // En BackendClient.ts
async getById(id: number): Promise<T> {
  const response = await fetch(`${this.baseUrl}/${id}`);
  const data = await response.json();
  return data as T;
}


  // Acá aceptamos datos sin id para creación
  async post(data: Omit<T, "id">): Promise<T> {
    const response = await fetch(`${this.baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newData = await response.json();
    return newData as T;
  }

  async put(id: number, data: Partial<T>): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const updatedData = await response.json();
    return updatedData as T;
  }

  async delete(id: number): Promise<void> {
    await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });
  }
}
