import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed top-3.5 right-3.5 z-10">
      <div
        className="p-4 text-white rounded-md rounded-b-none shadow-md cursor-pointer bg-gradient-to-r from-red-900 to-red-800"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <i className="fa-solid fa-ellipsis"></i>
      </div>

      <Transition
        show={isOpen}
        enter="transition-transform duration-300"
        enterFrom="translate-y-full"
        enterTo="translate-y-0"
        leave="transition-transform duration-300"
        leaveFrom="translate-y-0"
        leaveTo="translate-y-full"
      >
        <div
          className="w-64 h-screen p-4 rounded-bl-lg shadow-lg bg-slate-950"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/profile"
                className="block px-4 py-2 rounded hover:bg-red-900 text-slate-200"
                onClick={() => setIsOpen(false)} // Cerrar el menú al hacer clic en un enlace
              >
                Perfil
              </Link>
            </li>
            <li>
              <Link
                to="/admin/requests"
                className="block px-4 py-2 rounded hover:bg-red-900 text-slate-200"
                onClick={() => setIsOpen(false)} // Cerrar el menú al hacer clic en un enlace
              >
                Peticiones
              </Link>
            </li>
            <li>
              <Link
                to="/admin/benefits"
                className="block px-4 py-2 rounded text-slate-200 hover:bg-red-900"
                onClick={() => setIsOpen(false)} // Cerrar el menú al hacer clic en un enlace
              >
                Prestaciones
              </Link>
            </li>
            <li>
              <Link
                to="/admin/inventory"
                className="block px-4 py-2 rounded text-slate-200 hover:bg-red-900"
                onClick={() => setIsOpen(false)} // Cerrar el menú al hacer clic en un enlace
              >
                Inventario
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
};

export default SideMenu;
