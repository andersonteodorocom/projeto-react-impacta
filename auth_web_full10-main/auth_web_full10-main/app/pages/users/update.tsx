import React from 'react'
import { useNavigate, useParams } from "react-router"

import * as userService from '../../services/user.service'
import MyInput from '../../components/my.input'
import type { User, Role } from "~/models"
import { useState } from "react"

export default function UserUpdatePage() {

    const navigate = useNavigate()
    const params = useParams()
    const userId = Number(params.id)

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [availableRoles, setAvailableRoles] = useState<Role[]>([])
    const [selectedRoles, setSelectedRoles] = useState<string[]>([])

    function fetchUser() {
        userService.get(userId).then(data => {
            setName(data.name)
            setUsername(data.username)
            setSelectedRoles(data.roles || [])
        }).catch(error => {
            navigate('/')
        })
    }

    function fetchAvailableRoles() {
        userService.getAvailableRoles().then(roles => {
            setAvailableRoles(roles || [])
        }).catch(error => {
            console.error(error)
        })
    }

    React.useEffect(() => {
        fetchUser()
        fetchAvailableRoles()
    }, [])

    function goBack() {
        navigate(-1)
    }

    function save() {
        if (name === '') {
            alert('Nome é obrigatório')
            return
        }

        const user: User = { id: userId, name, username, roles: selectedRoles }
        
        userService.update(user).then(result => {
            goBack()
        }).catch(error => {
            alert('Login já existe!')
            navigate('/')
        })
    }



    return (
        <div className="page">
            <header>
                <h3>Alterar Usuário</h3>
            </header>
            
            <main>
                <MyInput title="Login" value={username} change={setUsername} readOnly />
                <MyInput title="Nome" value={name} change={setName} />
                
                <div style={{ marginTop: 20 }}>
                    <h4>Roles do Usuário:</h4>
                    <select
                        multiple
                        value={selectedRoles}
                        onChange={(e) => {
                            const options = Array.from(e.target.selectedOptions, option => option.value);
                            setSelectedRoles(options);
                        }}
                        style={{
                            width: '100%',
                            height: 120,
                            fontSize: 16,
                            padding: 8,
                            border: '1px solid #ccc',
                            borderRadius: 4
                        }}
                    >
                        {availableRoles.map(role => (
                            <option key={role.id} value={role.name}>
                                {role.name} - {role.description || 'Sem descrição'}
                            </option>
                        ))}
                    </select>
                    <div style={{ fontSize: 14, color: '#666', marginTop: 5 }}>
                        Segure Ctrl (ou Cmd no Mac) para selecionar múltiplas roles
                    </div>
                </div>
            </main>

            <footer>
                <button className="gray" onClick={goBack}>Cancelar</button>
                <button className="green" onClick={save}>Salvar</button>
            </footer>
        </div>
    )
}