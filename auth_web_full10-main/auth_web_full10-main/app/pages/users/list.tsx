import React from 'react'
import { NavLink, useNavigate } from "react-router"

import UserItem from '../../components/user.item'

import type { User } from '~/models'
import * as userService from "~/services/user.service"

export default function ListUserPage() {

    const navigate = useNavigate()

    const [users, setUsers] = React.useState<User[]>([])

    function fetchUsers() {
        userService.getList().then(list => {
            setUsers(list ? list : [])
        }).catch(error => {
            console.error(error)
            navigate('/')
        })
    }

    React.useEffect(() => {
        fetchUsers()
    }, [])

    function update(user: User) {
        navigate(`/users/${user.id}`)
    }

    function remove(user: User) {
        userService.remove(user.id!).then(result => {
            if (result === true) {
                fetchUsers()
            } else if (result === false) {
                alert('Usuário não encontrado!')
            } else {
                navigate('/')
            }
        })
    }

    return (
        <div className="page">
            <header>
                <h3>Listagem de Usuários</h3>
            </header>
            
            <main style={{ alignItems: 'flex-start' }}>
                <NavLink to='/users/create'>Adicionar Usuário</NavLink>
                <br />
                <NavLink to='/roles'>Gerenciar Roles</NavLink>
                <br />
                
                {/* Cabeçalho das colunas */}
                <div style={headerContainer}>
                    <div>ID</div>
                    <div>Nome</div>
                    <div>Login</div>
                    <div>Roles</div>
                    <div>Ações</div>
                </div>
                
                { users.map(user => (
                    <UserItem key={user.id} user={user} update={update} remove={remove} />
                ) )}
            </main>

            <footer>
                Temos {users.length} cadastrados
            </footer>
        </div>
    )
}

const headerContainer: React.CSSProperties = {
    height: 40,
    fontSize: 16,
    fontWeight: 'bold',
    width: '100%',
    display: 'flex',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: "space-between",
}