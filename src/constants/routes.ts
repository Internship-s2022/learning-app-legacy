export const SuperAdminRoutes = {
  main: { route: '/super-admin/*', label: 'Main', disabled: true },
  users: { route: 'users', label: 'Users' },
  addUser: { route: 'add', label: 'AddUser', disabled: true },
  courses: { route: 'courses', label: 'Courses' },
  storybook: { route: 'storybook', label: 'Story Book' },
};

export const HomeRoutes = {
  main: { route: '/*', label: 'Main', disabled: true },
  home: { route: 'home', label: 'Home', disabled: true },
  login: { route: 'login', label: 'Login', disabled: true },
};
