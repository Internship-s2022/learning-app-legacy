export const SuperAdminRoutes = {
  main: { route: '/super-admin/*', label: 'Main', disabled: true },
  users: { route: 'users/', label: 'USUARIOS' },
  addUser: { route: 'add', label: 'AddUser', disabled: true },
  editUser: { route: 'edit/:dni', label: 'EditUser', disabled: true },
  courses: { route: 'courses', label: 'CURSOS', enabled: true },
  addCourse: { route: 'add', label: 'AddCourse', disabled: true },
  addWithStepper: { route: 'addWithStepper', label: 'AddCourse', disabled: true },
  editCourse: { route: 'edit/:id', label: 'EditCourse', disabled: true },
  storybook: { route: 'storybook', label: 'Story Book' },
};

export const HomeRoutes = {
  main: { route: '/*', label: 'Main' },
  home: { route: 'home', label: 'Home' },
  login: { route: 'login', label: 'Login' },
  superAdmin: { route: '/super-admin/users', label: 'Super Admin', enabled: true },
};

export const UserRoutes = {
  main: { route: '/user/*', label: 'Main - User' },
  newPassword: { route: '/new-password', label: 'New Password' },
};
