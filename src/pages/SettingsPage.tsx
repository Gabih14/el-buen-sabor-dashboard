import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { 
  User, 
  Users, 
  Settings, 
  CreditCard, 
  Bell, 
  Lock, 
  Mail, 
  Smartphone, 
  Save,
  Clock,
  Map,
  AlertCircle
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-serif font-bold text-gray-800">Configuración</h1>
        <p className="text-gray-600">Administra la configuración del sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Tabs sidebar */}
        <div className="md:col-span-1">
          <Card className="sticky top-20">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                  activeTab === 'profile'
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <User className="mr-3 h-5 w-5" />
                Perfil de empresa
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                  activeTab === 'users'
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Users className="mr-3 h-5 w-5" />
                Usuarios y permisos
              </button>
              <button
                onClick={() => setActiveTab('billing')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                  activeTab === 'billing'
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <CreditCard className="mr-3 h-5 w-5" />
                Facturación
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                  activeTab === 'notifications'
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Bell className="mr-3 h-5 w-5" />
                Notificaciones
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                  activeTab === 'security'
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Lock className="mr-3 h-5 w-5" />
                Seguridad
              </button>
              <button
                onClick={() => setActiveTab('business')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                  activeTab === 'business'
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Settings className="mr-3 h-5 w-5" />
                Operaciones
              </button>
            </nav>
          </Card>
        </div>

        {/* Settings content */}
        <div className="md:col-span-3 space-y-6">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <>
              <Card title="Información del restaurante">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                    <div className="flex-1">
                      <Input
                        label="Nombre del restaurante"
                        placeholder="El Buen Sabor"
                        defaultValue="El Buen Sabor"
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        label="Eslogan"
                        placeholder="El mejor sabor en cada bocado"
                        defaultValue="El mejor sabor en cada bocado"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                    <div className="flex-1">
                      <Input
                        label="Correo electrónico"
                        type="email"
                        placeholder="info@elbuensabor.com"
                        defaultValue="info@elbuensabor.com"
                        leftIcon={<Mail size={18} />}
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        label="Teléfono"
                        type="tel"
                        placeholder="(555) 123-4567"
                        defaultValue="(555) 123-4567"
                        leftIcon={<Smartphone size={18} />}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Logo del restaurante
                    </label>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-xl text-red-600 font-serif font-bold">EB</span>
                      </div>
                      <div className="ml-5">
                        <Button variant="outline" size="sm">
                          Cambiar
                        </Button>
                        <p className="mt-1 text-xs text-gray-500">
                          JPG, PNG o GIF. Máximo 1MB.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción
                    </label>
                    <textarea
                      rows={4}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Describe tu restaurante..."
                      defaultValue="El Buen Sabor es un restaurante familiar que ofrece lo mejor de la comida casera con un toque gourmet. Nuestro compromiso es brindar una experiencia culinaria excepcional a precios accesibles."
                    ></textarea>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button 
                    variant="primary"
                    icon={<Save size={18} />}
                  >
                    Guardar cambios
                  </Button>
                </div>
              </Card>

              <Card title="Dirección">
                <div className="space-y-4">
                  <div>
                    <Input
                      label="Dirección"
                      placeholder="Av. Principal 123"
                      defaultValue="Av. Principal 123"
                      leftIcon={<Map size={18} />}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                    <div className="flex-1">
                      <Input
                        label="Ciudad"
                        placeholder="Ciudad de México"
                        defaultValue="Ciudad de México"
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        label="Estado/Provincia"
                        placeholder="CDMX"
                        defaultValue="CDMX"
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        label="Código postal"
                        placeholder="12345"
                        defaultValue="12345"
                      />
                    </div>
                  </div>

                  <div>
                    <Input
                      label="País"
                      placeholder="México"
                      defaultValue="México"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button 
                    variant="primary"
                    icon={<Save size={18} />}
                  >
                    Guardar cambios
                  </Button>
                </div>
              </Card>
            </>
          )}

          {/* Business Settings */}
          {activeTab === 'business' && (
            <>
              <Card title="Horario de operación">
                <div className="space-y-4">
                  {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day) => (
                    <div key={day} className="flex items-center justify-between">
                      <div className="w-28">
                        <span className="text-sm font-medium text-gray-700">{day}</span>
                      </div>
                      <div className="flex-1 flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Clock size={16} className="text-gray-400" />
                          <select className="border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500">
                            <option>Cerrado</option>
                            <option>08:00</option>
                            <option>09:00</option>
                            <option selected={day !== 'Domingo'}>10:00</option>
                            <option>11:00</option>
                            <option>12:00</option>
                          </select>
                        </div>
                        <span>a</span>
                        <div className="flex items-center space-x-2">
                          <Clock size={16} className="text-gray-400" />
                          <select className="border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500">
                            <option>Cerrado</option>
                            <option>20:00</option>
                            <option selected={day !== 'Domingo'}>21:00</option>
                            <option>22:00</option>
                            <option>23:00</option>
                            <option>00:00</option>
                          </select>
                        </div>
                      </div>
                      <div className="ml-4">
                        <label className="inline-flex items-center">
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                            defaultChecked={day !== 'Domingo'} 
                          />
                          <span className="ml-2 text-sm text-gray-600">Abierto</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <Button 
                    variant="primary"
                    icon={<Save size={18} />}
                  >
                    Guardar cambios
                  </Button>
                </div>
              </Card>

              <Card title="Entrega y recogida">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Opciones de servicio</h4>
                    <div className="space-y-2">
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                          defaultChecked 
                        />
                        <span className="ml-2 text-sm text-gray-600">Entrega a domicilio</span>
                      </label>
                      <br />
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                          defaultChecked 
                        />
                        <span className="ml-2 text-sm text-gray-600">Recogida en restaurante</span>
                      </label>
                      <br />
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                          defaultChecked 
                        />
                        <span className="ml-2 text-sm text-gray-600">Servicio en restaurante</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Configuración de entrega</h4>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                        <div className="flex-1">
                          <Input
                            label="Radio de entrega (km)"
                            type="number"
                            defaultValue="10"
                          />
                        </div>
                        <div className="flex-1">
                          <Input
                            label="Costo de envío"
                            type="number"
                            defaultValue="5.00"
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                        <div className="flex-1">
                          <Input
                            label="Tiempo estimado de entrega (min)"
                            type="number"
                            defaultValue="30"
                          />
                        </div>
                        <div className="flex-1">
                          <Input
                            label="Pedido mínimo para entrega"
                            type="number"
                            defaultValue="15.00"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button 
                    variant="primary"
                    icon={<Save size={18} />}
                  >
                    Guardar cambios
                  </Button>
                </div>
              </Card>
            </>
          )}

          {/* Security tab content */}
          {activeTab === 'security' && (
            <Card title="Seguridad de la cuenta">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Cambiar contraseña</h4>
                  <div className="space-y-4">
                    <Input
                      label="Contraseña actual"
                      type="password"
                      leftIcon={<Lock size={18} />}
                    />
                    <Input
                      label="Nueva contraseña"
                      type="password"
                      leftIcon={<Lock size={18} />}
                      helperText="Mínimo 8 caracteres, incluyendo una letra mayúscula y un número"
                    />
                    <Input
                      label="Confirmar nueva contraseña"
                      type="password"
                      leftIcon={<Lock size={18} />}
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Verificación en dos pasos</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">
                        Agregue una capa adicional de seguridad a su cuenta mediante la verificación en dos pasos.
                      </p>
                    </div>
                    <div className="ml-4">
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">Activar</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Sesiones activas</h4>
                  <div className="border border-gray-200 rounded-md overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-800">Esta sesión</p>
                          <p className="text-sm text-gray-600">Ciudad de México, MX · Hoy, 14:32</p>
                        </div>
                        <div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            Activa ahora
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-800">Chrome en Windows</p>
                          <p className="text-sm text-gray-600">Ciudad de México, MX · Ayer, 09:15</p>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">Cerrar</Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-800">Safari en iPhone</p>
                          <p className="text-sm text-gray-600">Ciudad de México, MX · 12 Oct, 2023</p>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">Cerrar</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-md border border-amber-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-amber-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-amber-800">Información de seguridad</h3>
                    <p className="mt-2 text-sm text-amber-700">
                      No comparta su contraseña con nadie y cámbiela periódicamente para mantener su cuenta segura.
                      Recuerde cerrar todas las sesiones activas cuando utilice un dispositivo compartido.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button 
                  variant="primary"
                  icon={<Save size={18} />}
                >
                  Guardar cambios
                </Button>
              </div>
            </Card>
          )}

          {/* Other tabs can be added in a similar way */}
          {(activeTab === 'users' || activeTab === 'billing' || activeTab === 'notifications') && (
            <Card>
              <div className="p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {activeTab === 'users' && 'Gestión de usuarios y permisos'}
                  {activeTab === 'billing' && 'Configuración de facturación'}
                  {activeTab === 'notifications' && 'Configuración de notificaciones'}
                </h3>
                <p className="text-gray-500">
                  Esta sección está en desarrollo y estará disponible pronto.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;