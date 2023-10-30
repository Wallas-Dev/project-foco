import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import '../../styles/components/initial.sass'
import { useEffect } from 'react';

function Initial() {

    const navigate = useNavigate();

    useEffect(() =>{
        navigate('dashboard/');
    },[])
    
    return (
        <div className='initial'>
            <Header />
            <div className='main'>
                <NavBar />
                <div className='main-content'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Initial