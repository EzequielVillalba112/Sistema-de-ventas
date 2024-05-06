import './formLogin.css'
import { FaUserTie } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

export default function FormLogin() {
    const navigate = useNavigate();

    const inicio = () =>{
        navigate("/rutas/vender")
    }

    return (
        <div className='form-login'>
            <div className="left-login">
            </div>
            <div className='right-login'>
                <h2>Login</h2>
                <form>
                    <div className='inputLogin userLogin'>
                        <FaUserTie color='#ffff' className='iconLogin'/>
                        <input type='text' placeholder='Nombre de usuario' />
                    </div>
                    <div className='inputLogin passwordLogin'>
                        <RiLockPasswordLine color='#ffff' className='iconLogin'/>
                        <input type='password' placeholder='Ingrese su Contraseña' />
                    </div>

                    <button className='btn_iniciar-sesion' onClick={inicio}>Iniciar sesión</button>
                </form>
            </div>
        </div>
    )
}
