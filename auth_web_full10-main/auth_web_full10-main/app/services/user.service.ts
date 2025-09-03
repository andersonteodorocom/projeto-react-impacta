import type { User, Role } from "~/models"
import { getLoggedUser } from "./auth.service"

const URL_BASE = 'http://localhost:3030/users'

export async function getList() {
    const user = getLoggedUser()

    const response = await fetch(URL_BASE, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${user?.token}`
        }
    })

    if (response.status === 200) {
        const data: User[] = await response.json()
        return data
    }

    throw Error(response.statusText)
}

export async function create(user: User) {
    const logged = getLoggedUser()

    const response = await fetch(URL_BASE, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${logged?.token}`
        },
        body: JSON.stringify(user)
    })

    if (response.status === 201) {
        return true
    } else if (response.status === 400) {
        return false
    } else {
        return null
    }
}

export async function get(id: number) {
    const logged = getLoggedUser()

    const response = await fetch(`${URL_BASE}/${id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${logged?.token}`
        }
    })

    if (response.status === 200) {
        return await response.json()
    } else {
        throw Error(response.statusText)
    }
}

export async function update(user: User) {
    const logged = getLoggedUser()

    const response = await fetch(`${URL_BASE}/${user.id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${logged?.token}`
        },
        body: JSON.stringify(user)
    })

    if (response.status !== 200) {
        throw Error(response.statusText)
    }
}

export async function remove(id: number) {
    const logged = getLoggedUser()

    const response = await fetch(`${URL_BASE}/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${logged?.token}`
        }
    })

    if (response.status === 200) {
        return await response.json()
    } else {
        return null
    }
}

export async function getAvailableRoles() {
    const logged = getLoggedUser()

    const response = await fetch('http://localhost:3030/roles', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${logged?.token}`
        }
    })

    if (response.status === 200) {
        const data: Role[] = await response.json()
        return data
    }

    throw Error(response.statusText)
}
