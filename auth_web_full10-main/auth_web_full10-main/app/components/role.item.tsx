import type { Role } from "~/models"

type Props = {
    role: Role
    remove: (role: Role) => void
}

export default function RoleItem({ role, remove }: Props) {
    return (
        <div style={container}>
            <div>{role.id}</div>
            <div>{role.name}</div>
            <div>{role.description || '-'}</div>
            <div>
                <button style={removeButton} onClick={() => remove(role)}>Remover</button>
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

const removeButton: React.CSSProperties = {
    color: 'red',
    fontSize: 16,
    borderRadius: 4,
    cursor: 'pointer',
    padding: '5px 10px',
    border: '1px solid red',
}
