import React from "react";
import Button from "../../components/BaseButton.jsx";
import { Link } from "react-router-dom";

export default function Header(props) {
    return(
        <>
            <section className="w-full h-screen text-sm homepage_header md:text-lg lg:h-auto">
                <div className="homepage_header__company_logo">
                    <img className="company_logo" src="src\assets\corpozulia-logo.png" alt="Logotipo de Corpozulia" />
                </div>
                <div className="w-screen my-12 md:my-6 md:w-2/5 homepage_header__titles h-721">
                    <h1 className="homepage_header__titles_emblem plus-jakarta-sans-bold">¡Bienvenido, amigo emprendedor!</h1>
                    <p className="homepage_header__titles_description plus-jakarta-sans-light">Somos la <b>Corporación Socialista</b> del Edo. Zulia, desde la localidad de todo <b>Machiques</b>, y convivimos y vivimos para ofrecerle al pueblo venezolano las herramientas necesarias para el desarrollo agrónomo y finquero de la región.</p>
                </div>
                <div className="homepage_header__options lg:my-8">
                    <Button content={<Link to="/register" >Censarme</Link>} icon="fa-solid fa-id-card-clip" />
                    <Button content={<Link to="/login" >Iniciar Sesión</Link>} icon="fa-solid fa-person-walking-arrow-right" />
                </div>
                <ul className="homepage_header__markers plus-jakarta-sans-medium">
                    <li className="homepage_header__markers_select"><a href="#about-us"><i className="fa-solid fa-circle-info"></i> Sobre Nosotros</a></li>
                    <li className="homepage_header__markers_select"><a href="#requirements"><i className="fa-solid fa-circle-info"></i> Requisitos del Servicio</a></li>
                </ul>
            </section>
        </>
    )
    
}