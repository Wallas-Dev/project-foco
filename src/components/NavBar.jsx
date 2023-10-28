import { Link } from 'react-router-dom'
import dashboard from '../assets/icons/command.svg'
import plus from '../assets/icons/plus.svg'
import settings from '../assets/icons/settings.svg'
import arrowRight from '../assets/icons/arrow-right.svg'
import arrowLeft from '../assets/icons/arrow-left.svg'
import '../styles/components/navbar.sass'
import { useState, useEffect } from 'react'

const NavBar = () => {

    function selectNav(params) {
        const navSelect = document.querySelectorAll(".nav-menu li a")
        
        navSelect.forEach(element => {
            const divisionUrl = element.href.split('/');
            const elementSelect = divisionUrl[divisionUrl.length - 1];
            if (elementSelect == params) {
                element.classList.add('select')

            } else {
                element.classList.remove('select')
            }
        });
    }

    const [srcImg, setSrcImg] = useState(arrowLeft);

    function closeMenu() {
        let nav = document.querySelector(".nav");
        let navMenu = document.querySelector(".nav-menu");
        nav.classList.toggle("active");
        navMenu.classList.toggle("none-menu");
        if (srcImg != arrowRight) {
            setSrcImg(arrowRight)
        } else {
            setSrcImg(arrowLeft)
        }
    }
    return (
        <>
            <nav className='nav'>
                <ul className='nav-menu'>
                    <li>
                        <Link onClick={() => selectNav('dashboard')} to="/dashboard">
                            <img src={dashboard} alt="Tela inicial" />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => selectNav('newBooking')} to="/newBooking">
                            <img src={plus} alt="Nova reserva" />
                            <span>Nova reserva</span>
                        </Link>
                    </li>
                    <li><Link to="/">
                        <img src={settings} alt="Configurações" />
                        <span>Configurações</span>
                    </Link></li>
                </ul>
            </nav>
            <div className='close'>
                <img onClick={closeMenu} src={srcImg} alt="" />
            </div>
        </>
    )
}


export default NavBar