import { useNavigate } from "react-router"

import * as roleService from '../../services/role.service'
import MyInput from '../../components/my.input'
import type { Role } from "~/models"

export default function RoleCreatePage() {

    const navigate = useNavigate()

    let name = ''
    let description = ''

    function goBack() {
        navigate(-1)
    }

    function save() {
        if (name === '') {
            alert('Nome é obrigatório')
            return
        }

        const role: Role = { name, description }
        
        roleService.create(role).then(result => {
            if (result === true) goBack()
            else if (result === false) alert('Nome da role já existe!')
            else navigate('/')
        })
    }

    return (
        <div className="page">
            <header>
                <h3>Nova Role</h3>
            </header>
            
            <main>
                <MyInput title="Nome" change={value => name = value} />
                <MyInput title="Descrição" change={value => description = value} />
            </main>

            <footer>
                <button className="gray" onClick={goBack}>Cancelar</button>
                <button className="green" onClick={save}>Salvar</button>
            </footer>
        </div>
    )
}
