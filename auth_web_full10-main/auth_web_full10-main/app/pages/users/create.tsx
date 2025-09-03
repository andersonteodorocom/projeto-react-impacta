import { useNavigate } from "react-router"

import * as userService from '../../services/user.service'
import MyInput from '../../components/my.input'
import type { User } from "~/models"

export default function UserCreatePage() {

    const navigate = useNavigate()

    let name = ''
    let username = ''
    let password = ''
    let confirmPass = ''

    function goBack() {
        navigate(-1)
    }

    function save() {
        if (name === '') {
            alert('Nome é obrigatório')
            return
        }
        if (username === '') {
            alert('Login é obrigatório')
            return
        }
        if (password === '') {
            alert('Senha é obrigatória')
            return
        }
        if (password !== confirmPass) {
            alert('Senha não confere')
            return
        }

        const user: User = { name, username, password }
        
        userService.create(user).then(result => {
            if (result === true) goBack()
            else if (result === false) alert('Login já existe!')
            else navigate('/')
        })
    }

    return (
        <div className="page">
            <header>
                <h3>Novo Usuário</h3>
            </header>
            
            <main>
                <MyInput title="Nome" change={value => name = value} />
                <MyInput title="Login" change={value => username = value} />
                <MyInput type="password" title="Senha" change={value => password = value} />
                <MyInput type="password" title="Confirmar Senha" change={value => confirmPass = value} />
            </main>

            <footer>
                <button className="gray" onClick={goBack}>Cancelar</button>
                <button className="green" onClick={save}>Salvar</button>
            </footer>
        </div>
    )
}