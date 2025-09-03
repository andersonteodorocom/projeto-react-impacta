import { useNavigate } from "react-router"

import { login } from '../services/auth.service'
import MyInput from "~/components/my.input"

export default function LoginPage() {

    const navigate = useNavigate()

    let username = ''
    let password = ''

    function signIn() {
        login(username, password).then(logged => {
            if (logged === true) {
                navigate('users')
            } else {
                alert('Login/senha inválido(a)!')
            }
        })
    }

    return (
        <div className="page">
            <header>
                <h3>Página de Acesso</h3>
            </header>
            
            <main>
                <MyInput title="Login" change={value => username = value} />
                <MyInput type="password" title="Senha" change={value => password = value} />
            </main>

            <footer>
                <button className="green" onClick={signIn}>Entrar</button>
            </footer>
        </div>
    )
}