import type { User } from "~/models"

type Props = {
    user: User
    update: (user: User) => void
    remove: (user: User) => void
}

export default function UserItem({ user, update, remove }: Props) {
    return (
        <div style={container}>
            <div>{user.id}</div>
            <div>{user.name}</div>
            <div>{user.username}</div>
            <div style={rolesContainer}>
                {user.roles && user.roles.length > 0 
                    ? user.roles.join(', ') 
                    : 'Sem roles'
                }
            </div>
            <div>
                <button style={editButton} onClick={() => update(user)}>Editar</button>
                <button style={removeButton} onClick={() => remove(user)}>Remover</button>
            </div>
        </div>
    )
}

const container: React.CSSProperties = {
    height: 60,
    fontSize: 20,
    width: '100%',
    display: 'flex',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: "space-between",
}

const editButton: React.CSSProperties = {
    color: 'cyan',
    fontSize: 16,
    marginRight: 10,
    borderRadius: 4,
    cursor: 'pointer',
    padding: '5px 10px',
    border: '1px solid cyan',
}

const removeButton: React.CSSProperties = {
    color: 'red',
    fontSize: 16,
    borderRadius: 4,
    cursor: 'pointer',
    padding: '5px 10px',
    border: '1px solid red',
}

const rolesContainer: React.CSSProperties = {
    fontSize: 16,
    color: '#666',
    maxWidth: 200,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
}