export const SuperAdminRoutes = {
  main: { route: '/super-admin/*', label: 'Main' },
  users: { route: 'users/', label: 'USUARIOS', enabled: true },
  addUser: { route: 'add', label: 'AddUser' },
  editUser: { route: 'edit/:dni', label: 'EditUser' },
  courses: { route: 'courses/', label: 'CURSOS', enabled: true },
  addCourse: { route: 'add', label: 'AddCourse' },
  editCourse: { route: 'edit/:id', label: 'EditCourse' },
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
