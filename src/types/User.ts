export interface User {
    id: string
    name: string
    role: "employer" | "specialist" | "admin"
    createdAt: string
}