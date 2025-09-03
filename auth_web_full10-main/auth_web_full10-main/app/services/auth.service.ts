import type { User } from "~/models"

const LOGGED_KEY = 'AUTH@loggedUser'
const URL_BASE = 'http://localhost:3030/auth/login'

function setLoggedUser(user: User) {
    localStorage.setItem(LOGGED_KEY, JSON.stringify(user))
}

export function getLoggedUser() {
    const json = localStorage.getItem(LOGGED_KEY)
    if (json) return JSON.parse(json) as User
    return null
}

export function logout() {
    localStorage.removeItem(LOGGED_KEY)
}

export async function login(username: string, password: string) {
    const response = await fetch(URL_BASE, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })

    const data: User = await response.json()

    if (data.token && data.token !== '') {
        setLoggedUser(data)
        return true
    }

    return false
}