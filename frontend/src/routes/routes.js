import Jobs from "../components/jobs";
import Users from '../components/users';
import Login from '../components/users/login';

const Rutas = [
  {
    url: "/users",
    vistaNombre: "Modulo Usuarios",
    component: Users,
  },
  {
    url: "/",
    vistaNombre: "Modulo Usuario Login",
    component: Login,
  },
  {
    url: "/jobs",
    vistaNombre: "Modulo Tareas",
    component: Jobs,
  }
];

export default Rutas;