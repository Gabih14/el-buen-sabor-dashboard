import React, { useEffect, useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { MenuItem } from '../../types/menuItem';
import { Supply } from '../../types/supply';
import { X, Plus, Trash2 } from 'lucide-react';
import { FlatCategory } from '../../api/categories';
import { fetchSupplies } from '../../api/supplies';


interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Partial<MenuItem>) => void;
  product?: MenuItem;
  categories: FlatCategory[];
}



// Función auxiliar para mostrar unidad de medida como texto
const getUnidadLabel = (unidad: string | { id: number; denominacion: string }) =>
  typeof unidad === 'string' ? unidad : unidad.denominacion;

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  product,
  categories,
}) => {
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    denominacion: '',
    descripcion: '',
    precioVenta: 0,
    categoriaId: '',
    tiempoEstimadoMinutos: 0,
    preparacion: '',
    detalles: [],
    imagenes: [],
  });
  const [supplies, setSupplies] = useState<Supply[]>([]);

  const [imageFile, setImageFile] = useState<File | null>(null);
  useEffect(() => {
    const loadSupplies = async () => {
      try {
        const data = await fetchSupplies();
        const filtered = data.filter((s) => s.esParaElaborar === true);
        setSupplies(filtered);
      } catch (error) {
        console.error('Error al cargar insumos:', error);
      }
    };

    loadSupplies();
  }, []);


  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        denominacion: '',
        descripcion: '',
        precioVenta: 0,
        categoriaId: '',
        tiempoEstimadoMinutos: 0,
        preparacion: '',
        detalles: [],
        imagenes: [],
      });
    }
    setImageFile(null);
  }, [product]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (
      !formData.denominacion?.trim() ||
      !formData.descripcion?.trim() ||
      !formData.precioVenta ||
      !formData.categoriaId
    ) {
      console.warn('Completa todos los campos obligatorios');
      alert('Completa todos los campos obligatorios');
      return;
    }

    // Verificar que la categoría seleccionada exista
    const selectedCategory = categories.find(
      (cat) => cat.id.toString() === formData.categoriaId
    );

    if (!selectedCategory) {
      console.warn('La categoría seleccionada no es válida');
      alert('Selecciona una categoría válida');
      return;
    }

    // Asignar el objeto categoría completo
    const updatedFormData = {
      ...formData,
      categoria: {
        id: selectedCategory.id.toString(),
        denominacion: selectedCategory.denominacion,
      },
    };

    // Asignar imagen si se cargó una
    if (imageFile) {
      updatedFormData.imagenes = [URL.createObjectURL(imageFile)];
    }

    onSave(updatedFormData);
    onClose();
  };

  const addIngredient = () => {
    if (supplies.length === 0) return;
    const newDetail = {
      tipo: 'INSUMO' as const,
      cantidad: 0,
      item: supplies[0],
    };
    setFormData((prev) => ({
      ...prev,
      detalles: [...(prev.detalles || []), newDetail],
    }));
  };


  const removeIngredient = (index: number) => {
    const newDetalles = [...(formData.detalles || [])];
    newDetalles.splice(index, 1);
    setFormData((prev) => ({ ...prev, detalles: newDetalles }));
  };

  const updateIngredient = (index: number, field: string, value: any) => {
    const newDetalles = [...(formData.detalles || [])];
    if (field === 'supply') {
      newDetalles[index].item = value;
    } else if (field === 'cantidad') {
      newDetalles[index].cantidad = Math.max(0, value);
    }
    setFormData((prev) => ({ ...prev, detalles: newDetalles }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-serif font-bold text-gray-800">
            {product ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          <Input
            label="Nombre del producto"
            value={formData.denominacion}
            onChange={(e) => setFormData({ ...formData, denominacion: e.target.value })}
            required
          />
          <Input
            label="Descripción"
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            required
          />
          <Input
            label="Precio de venta"
            type="number"
            step="0.01"
            value={formData.precioVenta}
            onChange={(e) =>
              setFormData({ ...formData, precioVenta: parseFloat(e.target.value) })
            }
            required
          />
          <Input
            label="Tiempo estimado (min)"
            type="number"
            value={formData.tiempoEstimadoMinutos}
            onChange={(e) =>
              setFormData({ ...formData, tiempoEstimadoMinutos: parseInt(e.target.value) })
            }
            required
          />

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <select
              className="w-full p-2 border rounded-md"
              value={formData.categoriaId}
              onChange={(e) => {
                const selectedId = e.target.value;
                const selected = categories.find(c => c.id.toString() === selectedId);
                setFormData({
                  ...formData,
                  categoriaId: selectedId,
                  categoria: selected
                    ? { id: selectedId, denominacion: selected.denominacion }
                    : undefined,
                });
              }}
              required
            >
              <option value="">Seleccionar categoría</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.denominacion}
                </option>
              ))}
            </select>

          </div>

          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Imagen del producto</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="block w-full text-sm border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Preparación */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preparación</label>
            <textarea
              className="w-full p-2 border rounded-md"
              rows={3}
              placeholder="Describe el proceso de preparación..."
              value={formData.preparacion}
              onChange={(e) => setFormData({ ...formData, preparacion: e.target.value })}
            />
          </div>

          {/* Insumos */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Insumos</label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                icon={<Plus size={16} />}
                onClick={addIngredient}
                disabled={supplies.length === 0}
              >
                Agregar insumo
              </Button>
            </div>

            {supplies.length === 0 ? (
              <p className="text-sm text-red-500 mb-4">No hay insumos disponibles para usar.</p>
            ) : (
              (formData.detalles || []).map((detalle, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <select
                    className="flex-1 p-2 border rounded-md"
                    value={(detalle.item as Supply).id}
                    onChange={(e) => {
                      const selected = supplies.find((s) => s.id === parseInt(e.target.value));
                      if (selected) updateIngredient(index, 'supply', selected);
                    }}
                  >
                    {supplies.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.denominacion} ({getUnidadLabel(s.unidadMedida)}) - stock: {s.stockActual}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    className="w-28 p-2 border rounded-md"
                    value={detalle.cantidad}
                    min={0}
                    onChange={(e) => updateIngredient(index, 'cantidad', parseInt(e.target.value))}
                    placeholder="Cantidad"
                  />
                  <span className="text-xs text-gray-500">
                    {getUnidadLabel((detalle.item as Supply).unidadMedida)}
                  </span>

                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<Trash2 size={16} />}
                    onClick={() => removeIngredient(index)}
                  />
                </div>
              ))
            )}
          </div>


          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
