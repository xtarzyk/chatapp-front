export const Router = (name, routes) => ({ name, routes })

const currentPath = window.location.pathname
const routes = new Router('routes', [
    {
        path: '/',
        name: 'root'
    },
    {
        path: `/room`,
        name: 'room'
    }
])