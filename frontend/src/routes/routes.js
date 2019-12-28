import Jobs from "../components/jobs";
import Users from '../components/users'

const Rutas = [
  {
    url: "/users",
    vistaNombre: "Modulo Usuarios",
    component: Users,
  },
  {
    url: "/jobs",
    vistaNombre: "Modulo Tareas",
    component: Jobs,
  }
];

export default Rutas;