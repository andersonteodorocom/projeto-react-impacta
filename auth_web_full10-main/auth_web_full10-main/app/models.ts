export interface User {

    name: string
    username: string

    id?: number
    roles?: string[]
    password?: string
    token?: string

}

export interface Role {
    id?: number
    name: string
    description?: string
}