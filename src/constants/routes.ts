export const SuperAdminRoutes = {
  main: { route: '/super-admin/*', label: 'Main - Super Admin', disabled: true },
  users: { route: 'users', label: 'USUARIOS' },
  addUser: { route: 'add', label: 'AddUser', disabled: true },
  editUser: { route: 'edit/:dni', label: 'EditUser', disabled: true },
  courses: { route: 'courses', label: 'CURSOS' },
  addWithStepper: { route: 'add-with-stepper', label: 'addWithStepper', disabled: true },
  storybook: { route: 'storybook', label: 'Story Book' },
};

export const HomeRoutes = {
  main: { route: '/*', label: 'Main', disabled: true },
  home: { route: 'home', label: 'Home', disabled: true },
  login: { route: 'login', label: 'Login', disabled: true },
};

export const UserRoutes = {
  main: { route: '/user/*', label: 'Main - User', disabled: true },
  newPassword: { route: '/new-password', label: 'New Password', disabled: true },
};
