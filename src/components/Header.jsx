import logo from '../assets/layout/logo.png';
import help from '../assets/icons/help-circle.svg'
import mail from '../assets/icons/mail.svg'
import settings from '../assets/icons/settings.svg'
import arrowBottom from '../assets/icons/arrow-bottom.svg'
import foto from '../styles/img/Foto.jpg'
import '../styles/components/header.sass'

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo Foco Multimidia" />
        <div className='gap'></div>
      </div>
      <div className='info-profile'>
        <div className="info">
          <img src={help} alt="Ajuda" />
          <img src={mail} alt="Email" />
          <img src={settings} alt="Configurações" />
        </div>
        <div className='gap'></div>
        <div className="profile">
          <h3>Admin</h3>
          <img src={foto} alt="" />
          <img className='menu-profile' src={arrowBottom} alt="" />
        </div>
      </div>
    </header>
  )
}

export default Header
