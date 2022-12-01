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
  admissionTest: { route: 'admissionTest/:courseId', label: 'TEST DE ADMISIÓN', enabled: true },
  form: { route: 'form/:courseId', label: 'FORMULARIOS', enabled: true },
  modules: { route: 'modules/:courseId', label: 'MÓDULOS', enabled: true },
  postulants: { route: 'postulants/:courseId', label: 'POSTULANTES', enabled: true },
  students: { route: 'students/:courseId', label: 'ALUMNOS', enabled: true },
  groups: { route: 'groups/:courseId', label: 'GRUPOS', enabled: true },
};

export const HomeRoutes = {
  main: { route: '/*', label: 'Main' },
  home: { route: 'home', label: 'Home' },
  login: { route: 'login', label: 'Login' },
  superAdmin: { route: '/super-admin/users', label: 'Super Admin' },
  admin: { route: '/admin', label: 'Admin' },
};

export const UserRoutes = {
  main: { route: '/user/*', label: 'Main - User' },
  newPassword: { route: '/new-password', label: 'New Password' },
};
