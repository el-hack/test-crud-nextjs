import {
    Bell,
    CircleUser,
    Home,
    LineChart,
    Menu,
    Package,
    Package2,
    Search,
    ShoppingCart,
    Users,
} from "lucide-react"
export const configApp = {
    api: {
        baseUrl: "http://localhost:3333"
    }
}

export const menu = [
    {
        label: "Dashboard",
        icon: Home,
        href: "/"
    },
    {
        label: "Clients",
        icon: Users,
        href: "/customers"
    },
]