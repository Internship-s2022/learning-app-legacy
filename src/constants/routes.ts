export const SuperAdminRoutes = {
  main: { route: '/super-admin/*', label: 'Main' },
  users: { route: 'users/', label: 'USUARIOS', enabled: true },
  addUser: { route: 'add', label: 'AddUser' },
  editUser: { route: 'edit/:dni', label: 'EditUser' },
  courses: { route: 'courses/', label: 'CURSOS', enabled: true },
  addCourse: { route: 'add', label: 'AddCourse' },
  editCourse: { route: 'edit/:id', label: 'EditCourse' },
  adminCourse: { route: 'admin/:courseId', label: 'AdminCourse' },
  storybook: { route: 'storybook', label: 'Story Book' },
};

export const AdminRoutes = {
  main: { route: '/admin/*', label: 'Main' },
  landing: { route: 'home/', label: 'Home' },
  course: { route: 'course/:courseId', label: 'Course' },
  addmissionTest: { route: 'addmissionTest/:courseId', label: 'Test de admision', enabled: true },
  form: { route: 'form/:courseId', label: 'Formularios', enabled: true },
  modules: { route: 'modules/:courseId', label: 'Modulos', enabled: true },
  postulants: { route: 'postulants/:courseId', label: 'Postulantes', enabled: true },
  students: { route: 'students/:courseId', label: 'Alumnos', enabled: true },
  groups: { route: 'groups/:courseId', label: 'Grupos', enabled: true },
};

export const HomeRoutes = {
  main: { route: '/*', label: 'Main' },
  home: { route: 'home', label: 'Home' },
  login: { route: 'login', label: 'Login' },
  superAdmin: { route: '/super-admin/users', label: 'Super Admin', enabled: true },
  admin: { route: '/admin', label: 'Admin', enabled: true },
};

export const UserRoutes = {
  main: { route: '/user/*', label: 'Main - User' },
  newPassword: { route: '/new-password', label: 'New Password' },
};
