import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../UserContext';

const UserMenu = () => {
  const { user, setUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      setUser(null);
      setIsOpen(false); // Cerrar el menú al hacer logout
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
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
          className="w-64 h-screen p-4 flex flex-col justify-between rounded-bl-lg shadow-lg bg-slate-950"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ul className="space-y-2">
            <li>
              <Link
                to={`/user/profile`}
                className="block px-4 py-2 rounded hover:bg-red-900 text-slate-200 plus-jakarta-sans-light"
                onClick={() => setIsOpen(false)} // Cerrar el menú al hacer clic en un enlace
              >
                <p><i className="pr-2 fa-solid fa-user-gear"></i> Perfil</p>
              </Link>
            </li>
            <li>
              <Link
                to={'/user'}
                className="block px-4 py-2 rounded hover:bg-red-900 text-slate-200 plus-jakarta-sans-light"
                onClick={() => setIsOpen(false)} // Cerrar el menú al hacer clic en un enlace
              >
                <p><i className='pr-2 fa-solid fa-info-circle'></i> Estado</p>
              </Link>
            </li>
          </ul>

          {/* Botón de Logout en la parte inferior */}
          <button
            className="block mb-20 w-full px-4 py-2 rounded text-slate-200 hover:bg-red-900 plus-jakarta-sans-light"
            onClick={handleLogout}
          >
            <p><i className="pr-2 fa-solid fa-sign-out"></i> Salir</p>
          </button>
        </div>
      </Transition>
    </div>
  );
};

export default UserMenu;
