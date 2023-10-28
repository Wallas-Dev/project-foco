import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import { Outlet } from 'react-router-dom'
import '../../styles/components/app.sass'

function Initial() {
    return (
        <div className='initial'>
            <Header />
            <div className='main'>
                <NavBar />
                <Outlet />
            </div>
        </div>
    )
}

export default Initial