import React, { useState, useEffect } from 'react';
import { useUser } from '../../UserContext';
import { Dialog } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import LoadingModal from '../../components/LoadingModal';
import BenefitDetail from '../../components/BenefitDetail';
import BenefitController from '../../controllers/BenefitController';
import RequestController from '../../controllers/RequestController';
import Button from '../../components/BaseButton';
import { Link } from 'react-router-dom';

const UserView = () => {
    const { user } = useUser();
    const [request, setRequest] = useState(null);
    const [benefit, setBenefit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [benefitError, setBenefitError] = useState(null);
    const [requestError, setRequestError] = useState(null);
    const [newRequestMessage, setNewRequestMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const fetchedBenefit = await BenefitController.getBenefitsByUserId(user.id);
                setBenefit(fetchedBenefit);
            } catch (error) {
                setBenefitError(error);
            }

            try {
                const fetchedRequest = await RequestController.getRequestsByUserId(user.id);
                if (fetchedRequest){
                    setRequest(fetchedRequest);
                } else {
                    console.error("Request NULO");
                }
                console.log(fetchedRequest);
            } catch (error) {
                setRequestError(error);
            }
            setLoading(false);
        };

        if (user && user.id) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [user]);

    const handleNewRequestSubmit = async (e) => {
        e.preventDefault();
        try {
            if (request) {
                await RequestController.updateRequest(request.id, { message: newRequestMessage });
                setRequest({ ...request, message: newRequestMessage });
            } else {
                const createdRequest = await RequestController.createRequest({
                    message: newRequestMessage,
                    user: { ...user }
                });
                setRequest(createdRequest);
            }
            setNewRequestMessage('');
        } catch (error) {
            setRequestError(error);
        }
    };

    const handleCloseDialog = () => {
        setBenefitError(null);
        setRequestError(null);
    };

    if (loading) {
        return <LoadingModal />;
    }

    if (benefitError || requestError) {
        const error = benefitError || requestError;
        return (
            <div className="fixed inset-0 z-10 overflow-y-auto bg-gradient-to-bl from-red-800 to-red-600">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="w-full max-w-xl p-4 bg-white rounded-lg shadow-lg">
                        <h3 className="text-2xl font-medium text-gray-900"><i className='text-red-800 fa-solid fa-circle-xmark'></i> Error | <i className="text-sky-500 fa-solid fa-envelope-open-text"></i> Generación de Solicitud</h3>
                        <div className="mt-2 text-sm text-gray-500">{error.message}</div>
                        <div className='mt-2 text-sm font-medium text-slate-900'>Nota: También puede tratarse de una solicitud no generada, en dado sea el caso, haz click en "Cerrar" para acceder a la generación de solicitud</div>
                        <div className="flex justify-end mt-4">
                            <button
                                type="button"
                                onClick={handleCloseDialog}
                                className="p-10 m-4 text-sm font-medium text-white rounded-md hover:text-slate-900 bg-gradient-to-r from-red-700 to-red-500"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto mt-4">
            {benefit && (
                <div className="mb-8">
                    <h1 className="mb-4 text-2xl font-bold">Prestación</h1>
                    <BenefitDetail benefit={benefit} />
                </div>
            )}
            
            {request ? (
                <div className="absolute top-0 left-0 flex flex-col w-screen h-screen user-requests bg-gradient-to-r from-red-800 to-red-700">
                    <Button content={<Link to="/user/profile" >Volver al Perfil</Link>} icon="fa-solid fa-user" elementContext="absolute top-4 left-4"></Button>
                    <h2 className="mx-auto my-6 text-4xl font-bold text-slate-300 bg-none plus-jakarta-sans-light">Detalles de Petición</h2>
                    <div className="flex flex-col self-center p-5 mt-4 rounded-md shadow-md bg-red-950 shadow-black">
                        <i className="self-center p-8 my-10 text-6xl text-center rounded-full shadow-md fa-solid fa-book bg-slate-950 text-slate-200 shadow-black"></i>
                        <p className='text-lg text-slate-200 plus-jakarta-sans-light'><strong className='font-medium'>Identificación de Petición</strong> #{request.id}</p>
                        <p className='mb-5 text-lg text-slate-200 plus-jakarta-sans-light'><strong className='font-medium'>Mensaje Recibido:</strong> {request.message}</p>
                        {request.user && (
                            <>
                                <p className='mb-2 plus-jakarta-sans-light text-md text-slate-200'><strong className='font-medium'>ID del Usuario:</strong> {request.user.id}</p>
                                <p className='mb-2 plus-jakarta-sans-light text-md text-slate-200'><strong className='font-medium'>Nombre del Usuario:</strong> {request.user.name} {request.user.surname}</p>
                                <p className='mb-2 plus-jakarta-sans-light text-md text-slate-200'><strong className='font-medium'>Email del Usuario:</strong> {request.user.email}</p>
                                <p className='mb-2 plus-jakarta-sans-light text-md text-slate-200'><strong className='font-medium'>Número de Identificación del Usuario:</strong> {request.user.idNumber}</p>
                                <p className='mb-2 plus-jakarta-sans-light text-md text-slate-200'><strong className='font-medium'>Sector:</strong> {request.user.sector}</p>
                                <p className='mb-2 plus-jakarta-sans-light text-md text-slate-200'><strong className='font-medium'>Ubicación:</strong> {request.user.location}</p>
                                <p className='mb-2 plus-jakarta-sans-light text-md text-slate-200'><strong className='font-medium'>Género:</strong> {request.user.gender}</p>
                                <p className='mb-2 plus-jakarta-sans-light text-md text-slate-200'><strong className='font-medium'>Edad:</strong> {request.user.age}</p>
                                <p className='mb-2 plus-jakarta-sans-light text-md text-slate-200'><strong className='font-medium'>Teléfono:</strong> {request.user.phone}</p>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <div className="absolute top-0 left-0 flex flex-col w-screen h-screen px-4 py-4 rounded-md w-90 user-request bg-gradient-to-r from-red-900 to-red-700">
                     <button
                        onClick={() => navigate('/user/profile')}
                        className="fixed z-10 px-4 py-2 font-bold text-gray-900 transition bg-gray-300 rounded focus:outline-none hover:bg-gray-950 hover:text-gray-300 plus-jakarta-sans-light"
                    >
                        <i className="mx-2 fa-solid fa-user"></i><span className='mx-2'>Ir a mí perfil</span>
                    </button>
                    <div className='flex flex-col self-center w-screen h-60 my-14'>
                        <img src="../src/assets/undraw_online_cv_re_gn0a.svg" alt="Solicitud de Mensaje" className='object-contain w-full h-full' />
                    </div>
                    <h2 className="self-center py-6 text-4xl font-bold tracking-tight text-slate-300 plus-jakarta-sans-light">Crear una petición</h2>
                    <p className='self-center w-10/12 text-center text-md text-slate-300 plus-jakarta-sans-light'>Bienvenido, usuario, esta es la sección para la creación de tu petición, desde aquí, por favor, ingresa el mensaje con los motivos y el contexto de qué necesitas por parte de nuestra empresa. Somos todo oídos, adelante. <br />En el siguiente recuadro, anote el mótivo y el contexto de la solicitud. Posteriormente recibirá una página con dicha información, esta será administrada por el encargado a la brevedad con un rechazo u aprobación dependiendo las necesidades y el justificativo.</p>
                    <p className='text-xl font-light plus-jakarta-sans-light text-slate-950'></p>
                    <form onSubmit={handleNewRequestSubmit} className="mt-4">
                        <div className="mb-4">
                            <label htmlFor="newRequestMessage" className="block mb-2 text-xl font-bold text-slate-300 plus-jakarta-sans-light">Mensaje:</label>
                            <input
                                id="newRequestMessage"
                                type="text"
                                value={newRequestMessage}
                                onChange={(e) => setNewRequestMessage(e.target.value)}
                                className="w-full px-6 py-2 text-white border border-gray-300 rounded-lg bg-gradient-to-r from-slate-950 to-slate-800 plus-jakarta-sans-light"
                                required
                                placeholder='Contenido de solicitud'
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 font-bold text-gray-900 transition bg-gray-300 rounded focus:outline-none hover:bg-gray-950 hover:text-gray-300 plus-jakarta-sans-light"
                        >
                            <i className="mx-2 fa-solid fa-inbox"></i><span className='mx-2'>Enviar Solicitud</span>
                        </button>
                    </form>
                </div>
            )}
           
        </div>
    );
};

export default UserView;
