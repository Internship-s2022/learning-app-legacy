/* eslint-disable no-undef */
import loginPage from '../../page-objects/login.page';
import userTablePage from '../../page-objects/super-admin/users-table.page';

describe('Successful login', () => {
  beforeAll('Open Browser', () => {
    browser.url('/login');
  });
  it('Verify Radium Learning Logo', async () => {
    await expect(loginPage.logoContainer).toBeDisplayed();
    await expect(loginPage.logoIconRR).toBeDisplayed();
    await expect(loginPage.logoTextRR).toBeDisplayed();
  });
  it('Verify welcome messages', async () => {
    await expect(loginPage.WelcomeMsgContainer).toBeDisplayed();
    await expect(loginPage.WelcomeMsgTittle).toBeDisplayed();
    await expect(loginPage.WelcomeMsgText).toBeDisplayed();
  });
  it('Verify login fields', async () => {
    await loginPage.login('@mail.com', '');

    await expect(loginPage.EmailField).toBeDisplayed();
    await expect(loginPage.EmailLabel).toBeDisplayed();
    await expect(loginPage.EmailInput).toBeDisplayed();
    await expect(loginPage.EmailError).toBeDisplayed();

    await expect(loginPage.PasswordField).toBeDisplayed();
    await expect(loginPage.PasswordLabel).toBeDisplayed();
    await expect(loginPage.PasswordInput).toBeDisplayed();
    await expect(loginPage.PasswordError).toBeDisplayed();
  });
  it('Verify Buttons', async () => {
    await expect(loginPage.LogInBtn).toBeDisplayed();
    await expect(loginPage.LogInBtn).toBeClickable();
    await expect(loginPage.ForgotPassword).toBeDisplayed();
    await expect(loginPage.ForgotPassword).toBeClickable();
  });

  it('Login Success', async () => {
    browser.refresh();
    await loginPage.login('super.admin@radiumrocket.com', 'Passw0rd1234');
  });
});

describe('Successful display of list of users', () => {
  it('Verify Users Table Page header', async () => {
    await expect(userTablePage.layoutContainer).toBeDisplayed();
  });
  it('Verify Radium Learning header', async () => {
    await expect(userTablePage.headerContainer).toBeDisplayed();
    await expect(userTablePage.headerlogoIconRR).toBeDisplayed();
    await expect(userTablePage.headerlogoIconRR).toBeClickable();
    await expect(userTablePage.headerTab0).toBeDisplayed();
    await expect(userTablePage.headerTab0).toBeClickable();
    await expect(userTablePage.headerTab1).toBeDisplayed();
    await expect(userTablePage.headerTab1).toBeClickable();
  });

  it('Verify User table filters', async () => {
    await expect(userTablePage.nameFilter).toBeDisplayed();
    await expect(userTablePage.nameFilterLabel).toBeDisplayed();
    await expect(userTablePage.nameFilterInput).toBeDisplayed();

    await expect(userTablePage.lastNameFilter).toBeDisplayed();
    await expect(userTablePage.lastNameFilterLabel).toBeDisplayed();
    await expect(userTablePage.lastNameFilterInput).toBeDisplayed();

    await expect(userTablePage.dniFilter).toBeDisplayed();
    await expect(userTablePage.dniFilterLabel).toBeDisplayed();
    await expect(userTablePage.dniFilterInput).toBeDisplayed();

    await expect(userTablePage.emailFilter).toBeDisplayed();
    await expect(userTablePage.emailFilterLabel).toBeDisplayed();
    await expect(userTablePage.emailFilterInput).toBeDisplayed();

    await expect(userTablePage.typeFilter).toBeDisplayed();
    await expect(userTablePage.typeFilterLabel).toBeDisplayed();
    await expect(userTablePage.typeFilterInput).not.toBeDisplayed();
  });

  it('get content from table cell', async () => {
    const tableContainer = await $$('[data-testid=table-container-div] tr');
    const rows = tableContainer.length;
    let counter = 0;
    for (let i = 0; i < rows; i++) {
      const rowSelector = `[data-testid=row-${i}]`;
      // console.log(`infoselect: ${rowSelector}`);
      const row = await $(rowSelector);
      const columns = await $$(`${rowSelector} td `);

      for (let j = 0; j < columns.length; j++) {
        const column = await $(`${rowSelector} > td:nth-child(${j}) > p`);
        // console.log(`all info of the row: ${i} column: ${j}`);
        console.log(`info 1: ${JSON.stringify(column.getText(), null, 3)}`);
        const columnText = column.getText().then((res) => {
          console.log('response', res);
        });

        console.log(`info 2: ${columnText}`);
      }
      //hacer objeto para pasar la tabla
    }
  });

  it('Verify User table pagination', async () => {
    await expect(userTablePage.paginationContainer).toBeDisplayed();
    await expect(userTablePage.paginationRowsSelect).toBeDisplayed();
    await expect(userTablePage.paginationPrevBtn).toBeDisplayed();
    await expect(userTablePage.paginationNextBtn).toBeDisplayed();

    await expect(userTablePage.lastNameFilter).toBeDisplayed();
    await expect(userTablePage.lastNameFilterLabel).toBeDisplayed();
    await expect(userTablePage.lastNameFilterInput).toBeDisplayed();

    await expect(userTablePage.dniFilter).toBeDisplayed();
    await expect(userTablePage.dniFilterLabel).toBeDisplayed();
    await expect(userTablePage.dniFilterInput).toBeDisplayed();

    await expect(userTablePage.emailFilter).toBeDisplayed();
    await expect(userTablePage.emailFilterLabel).toBeDisplayed();
    await expect(userTablePage.emailFilterInput).toBeDisplayed();

    await expect(userTablePage.typeFilter).toBeDisplayed();
    await expect(userTablePage.typeFilterLabel).toBeDisplayed();
    await expect(userTablePage.typeFilterInput).not.toBeDisplayed();
  });
});
