export const SuperAdminRoutes = {
  main: { route: '/super-admin/*', label: 'Main' },
  users: { route: 'users/', label: 'USUARIOS', enabled: true },
  addUser: { route: 'add', label: 'AddUser' },
  editUser: { route: 'edit/:dni', label: 'EditUser' },
  courses: { route: 'courses/', label: 'CURSOS', enabled: true },
  addCourse: { route: 'add', label: 'AddCourse' },
  adminCourse: { route: 'admin/:courseId', label: 'AdminCourse' },
  editCourse: { route: 'edit/:id', label: 'EditCourse' },
  adminCourse: { route: 'add', label: 'AdminCourse' },
  addModule: { route: 'add', label: 'AddModule' },
  editModule: { route: 'edit', label: 'EditModule' },
  storybook: { route: 'storybook', label: 'Story Book' },
};

export const AdminRoutes = {
  main: { route: '/admin/*', label: 'Main' },
  landing: { route: 'home/', label: 'Home' },
  course: { route: 'course/:courseId', label: 'GENERAL', enabled: true },
  regForm: {
    route: 'course/:courseId/registration-form/view/:viewId',
    label: 'PUBLIC',
  },
  admissionTest: {
    route: 'course/:courseId/admission-test',
    label: 'TEST DE ADMISIÓN',
    enabled: true,
  },
  form: { route: 'course/:courseId/form', label: 'FORMULARIOS', enabled: true },
  modules: { route: 'course/:courseId/modules', label: 'MÓDULOS', enabled: true },
  addModule: { route: 'course/:courseId/module/add', label: 'AddModule' },
  postulants: { route: 'course/:courseId/postulants', label: 'POSTULANTES', enabled: true },
  students: { route: 'course/:courseId/students', label: 'ALUMNOS', enabled: true },
  groups: { route: 'course/:courseId/groups', label: 'GRUPOS', enabled: true },
  addGroup: { route: 'add', label: 'AddGroup' },
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
