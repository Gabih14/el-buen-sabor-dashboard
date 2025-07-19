import React, { useEffect, useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { MenuItem } from '../../types/menuItem';
import { Supply } from '../../types/supply';
import { X, Plus, Trash2 } from 'lucide-react';
import { FlatCategory } from '../../api/categories';
import { fetchSupplies } from '../../api/supplies';
import apiClient from '../../api/apiClient';


interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Partial<MenuItem>) => Promise<MenuItem>;
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

  // Estado para manejar la imagen
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

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
    const fetchProductImages = async (productId: string) => {
      try {
        const response = await apiClient.get(`/images/byEntity`, {
          params: {
            entityId: productId,
            entityType: 'manufacturado',
          },
        });

        if (response.data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            imagenes: [response.data[0].url], // Solo una imagen por ahora
          }));
        }
      } catch (error) {
        console.error('Error al obtener imágenes del producto:', error);
      }
    };

    if (product) {
      setFormData(product);
      if (product.id) {
        fetchProductImages(product.id.toString());
      }
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

  const handleSubmit = async (e: React.FormEvent) => {
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

    // Verificar categoría válida
    const selectedCategory = categories.find(
      (cat) => cat.id === Number(formData.categoriaId)
    );

    if (!selectedCategory) {
      console.warn('La categoría seleccionada no es válida');
      alert('Selecciona una categoría válida');
      return;
    }

    // Armar objeto actualizado
    const updatedFormData: Partial<MenuItem> = {
      ...formData,
      categoria: {
        id: selectedCategory.id.toString(),
        denominacion: selectedCategory.denominacion,
      },
    };

    try {
      // Guardar el producto
      const savedProduct = await onSave(updatedFormData); // ← asegúrate que `onSave` retorne el producto guardado (con ID)

      // Subir imagen si hay
      if (imageFile && savedProduct?.id) {
        const formDataImg = new FormData();
        formDataImg.append('file', imageFile);
        formDataImg.append('entityId', savedProduct.id.toString());
        formDataImg.append('entityType', 'manufacturado'); // ← esto depende del backend

        try {
          await apiClient.post('/images/uploadToEntity', formDataImg, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } catch (error) {
          console.error('Error al subir imagen:', error);
        }
      }


      onClose();
    } catch (error) {
      console.error('Error al guardar el producto:', error);
      alert('Hubo un error al guardar el producto');
    }
  };

  //funciones para manejar la imagen
  // Funciones para manejar la imagen
  const handleImageChange = (file: File) => {
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      setImageError('Por favor selecciona solo archivos de imagen');
      return;
    }

    // Validar tamaño (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setImageError('La imagen debe ser menor a 5MB');
      return;
    }

    setImageError(null);
    setImageFile(file);

    // Crear preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleImageChange(files[0]);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageError(null);
    // Si estás editando, también limpia la imagen existente
    setFormData(prev => ({ ...prev, imagenes: [] }));
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
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Imagen del producto
            </label>

            {/* Área de carga de imagen */}
            <div className="space-y-3">
              {/* Mostrar imagen actual o preview */}
              {(imagePreview || (formData.imagenes && formData.imagenes.length > 0)) && (
                <div className="relative inline-block">
                  <img
                    src={imagePreview || formData.imagenes?.[0]}
                    alt="Vista previa del producto"
                    className="w-40 h-40 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                    onError={() => setImageError('Error al cargar la imagen')}
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                    title="Eliminar imagen"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {/* Área de drag & drop */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
        border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer
        ${isDragging
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }
      `}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageChange(e.target.files[0])}
                  className="hidden"
                  id="image-upload"
                />

                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="space-y-2">
                    <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Plus size={24} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Arrastra una imagen aquí o haz clic para seleccionar
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, JPEG hasta 5MB
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              {/* Mensaje de error */}
              {imageError && (
                <div className="text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
                  {imageError}
                </div>
              )}

              {/* Información útil */}
              {!imagePreview && (!formData.imagenes || formData.imagenes.length === 0) && (
                <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded-md">
                  💡 <strong>Tip:</strong> Una buena imagen ayuda a que tu producto se vea más atractivo para los clientes
                </div>
              )}
            </div>
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
