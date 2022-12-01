/* eslint-disable no-undef */
import Layout from '../../page-objects/shared-components/layout';
import Header from '../../page-objects/shared-components/header';
import Modal from '../../page-objects/shared-components/modal';
import Table from '../../page-objects/shared-components/table';
import LogInPage from '../../page-objects/General/login.page';
import UserTablePage from '../../page-objects/super-admin/user/users-Table.page';
import AddUserPage from '../../page-objects/super-admin/user/add-user.page';

describe('Superadmin add User E2E happy path', () => {
  describe('Successful login', () => {
    beforeAll('Open Browser', () => {
      browser.url('/login');
    });

    it('Login Success', async () => {
      browser.refresh();
      await LogInPage.login('super.admin@radiumrocket.com', 'Passw0rd1234');
    });
  });

  describe('Successful display of list of users', () => {
    it('Verify layout shared component', async () => {
      await expect(Layout.layoutContainer).toBeDisplayed();
    });

    it('Verify header shared component', async () => {
      await expect(Header.headerContainer).toBeDisplayed();
      await expect(Header.headerLogoIconRR).toBeDisplayed();
      await expect(Header.headerLogoIconRR).toBeClickable();
      await expect(Header.headerTab0).toBeDisplayed();
      await expect(Header.headerTab0).toBeClickable();
      await expect(Header.headerTab1).toBeDisplayed();
      await expect(Header.headerTab1).toBeClickable();
      await expect(Header.headerLogOutBtn).toBeDisplayed();
      await expect(Header.headerLogOutBtn).toBeClickable();
    });

    it('Verify user table page components', async () => {
      await expect(UserTablePage.userTablePageContainer).toBeDisplayed();
      await expect(UserTablePage.userTablePageTitle).toBeDisplayed();
      await expect(UserTablePage.userTablePageError).not.toBeDisplayed();
      await expect(UserTablePage.userTablePageText).toBeDisplayed();
      await expect(Table.table).toBeDisplayed();
      await expect(Table.tableContainer).toBeDisplayed();
      await expect(UserTablePage.userTableFilterContainer).toBeDisplayed();
      await expect(Table.tableHeaderContainer).toBeDisplayed();
      await expect(Table.tableRows).toBeDisplayed();
      await expect(Table.paginationContainer).toBeDisplayed();
    });

    it('Verify User table filters', async () => {
      await expect(UserTablePage.nameFilter).toBeDisplayed();
      await expect(UserTablePage.nameFilterLabel).toBeDisplayed();
      await expect(UserTablePage.nameFilterInput).toBeDisplayed();

      await expect(UserTablePage.lastNameFilter).toBeDisplayed();
      await expect(UserTablePage.lastNameFilterLabel).toBeDisplayed();
      await expect(UserTablePage.lastNameFilterInput).toBeDisplayed();

      await expect(UserTablePage.dniFilter).toBeDisplayed();
      await expect(UserTablePage.dniFilterLabel).toBeDisplayed();
      await expect(UserTablePage.dniFilterInput).toBeDisplayed();

      await expect(UserTablePage.emailFilter).toBeDisplayed();
      await expect(UserTablePage.emailFilterLabel).toBeDisplayed();
      await expect(UserTablePage.emailFilterInput).toBeDisplayed();

      await expect(UserTablePage.typeFilter).toBeDisplayed();
      await expect(UserTablePage.typeFilterLabel).toBeDisplayed();
      await expect(UserTablePage.typeFilterInput).not.toBeDisplayed();
    });

    it('Verify User table header', async () => {
      await expect(UserTablePage.headerCheckboxColumn).toBeDisplayed();
      await expect(UserTablePage.headerCheckboxColumn).toBeClickable();

      await expect(UserTablePage.headerNameColumn).toBeDisplayed();
      await expect(UserTablePage.headerLastNameColumn).toBeDisplayed();
      await expect(UserTablePage.headerDniColumn).toBeDisplayed();
      await expect(UserTablePage.headerEmailColumn).toBeDisplayed();
      await expect(UserTablePage.headerTypeColumn).toBeDisplayed();
      await expect(UserTablePage.headerButtonsColumn).toBeDisplayed();
    });

    // it('get content from table cell', async () => {
    //   browser.pause(8000);
    //   const tableContainer = await $$('[data-testid=table-container-div] tr');
    //   const rows = tableContainer.length;
    //   let counter = 0;
    //   for (let i = 0; i < rows; i++) {
    //     const rowSelector = `[data-testid=row-${i}]`;
    //     // console.log(`infoselect: ${rowSelector}`);
    //     const row = await $(rowSelector);
    //     const columns = await $$(`${rowSelector} td `);

    //     for (let j = 0; j < columns.length; j++) {
    //       const column = await $(`${rowSelector} > [data-testid=column-${j}] > p`);
    //       // console.log(`all info of the row: ${i} column: ${j}`);
    //       console.log(`info 1: ${JSON.stringify(column.getText(), null, 3)}`);
    //       const columnText = column.getText().then((res) => {
    //         console.log('response', res);
    //       });

    //       console.log(`info 2: ${columnText}`);
    //     }
    //     //hacer objeto para pasar la tabla
    //   }
    // });

    it('Verify table pagination shared component', async () => {
      await expect(Table.buttonsContainer).toBeDisplayed();
      await expect(Table.buttonsContainer).toBeClickable();
      await expect(Table.addBtn).toBeDisplayed();
      await expect(Table.addBtn).toBeClickable();
      await expect(Table.exportBtn).toBeDisplayed();
      await expect(Table.exportBtn).toBeClickable();

      await Table.goToAddUserPage();
    });
  });

  describe('Successful creation of an User form scratch', () => {
    it('Verify layout shared component', async () => {
      await expect(Layout.layoutContainer).toBeDisplayed();
    });

    it('Verify Radium Learning header', async () => {
      await expect(Header.headerContainer).toBeDisplayed();
      await expect(Header.headerLogoIconRR).toBeDisplayed();
      await expect(Header.headerLogoIconRR).toBeClickable();
      await expect(Header.headerTab0).toBeDisplayed();
      await expect(Header.headerTab0).toBeClickable();
      await expect(Header.headerTab1).toBeDisplayed();
      await expect(Header.headerTab1).toBeClickable();
      await expect(Header.headerLogOutBtn).toBeDisplayed();
      await expect(Header.headerLogOutBtn).toBeClickable();
    });

    it('Successful dni search', async () => {
      await expect(AddUserPage.dniField).toBeDisplayed();

      await AddUserPage.dniSearch(' ');

      await expect(AddUserPage.dniLabel).toBeDisplayed();
      await expect(AddUserPage.dniInput).toBeDisplayed();
      await expect(AddUserPage.dniErrors).toBeDisplayed();

      await AddUserPage.dniSearch('37815760');
    });

    it('add User form complete', async () => {
      await browser.refresh();

      await AddUserPage.dniSearch('37815760');
      await expect(AddUserPage.dniField).toBeDisplayed();
      await expect(AddUserPage.dniLabel).toBeDisplayed();
      await expect(AddUserPage.dniInput).toBeDisplayed();
      await expect(AddUserPage.dniErrors).toBeDisplayed();
      await expect(AddUserPage.dniBtn).toBeDisplayed();

      await AddUserPage.formComplete('', '', '', '', '', '');

      await expect(AddUserPage.nameField).toBeDisplayed();
      await expect(AddUserPage.nameLabel).toBeDisplayed();
      await expect(AddUserPage.nameInput).toBeDisplayed();
      await expect(AddUserPage.nameErrors).toBeDisplayed();

      await expect(AddUserPage.lastNameField).toBeDisplayed();
      await expect(AddUserPage.lastNameLabel).toBeDisplayed();
      await expect(AddUserPage.lastNameInput).toBeDisplayed();
      await expect(AddUserPage.lastNameErrors).toBeDisplayed();

      await expect(AddUserPage.emailField).toBeDisplayed();
      await expect(AddUserPage.emailLabel).toBeDisplayed();
      await expect(AddUserPage.emailInput).toBeDisplayed();
      await expect(AddUserPage.emailErrors).toBeDisplayed();

      await expect(AddUserPage.birthDateField).toBeDisplayed();
      await expect(AddUserPage.birthDateLabel).toBeDisplayed();
      await expect(AddUserPage.birthDateInput).toBeDisplayed();
      await expect(AddUserPage.birthDateErrors).toBeDisplayed();

      await expect(AddUserPage.locationField).toBeDisplayed();
      await expect(AddUserPage.locationLabel).toBeDisplayed();
      await expect(AddUserPage.locationInput).toBeDisplayed();
      await expect(AddUserPage.locationErrors).toBeDisplayed();

      await expect(AddUserPage.telField).toBeDisplayed();
      await expect(AddUserPage.telLabel).toBeDisplayed();
      await expect(AddUserPage.telInput).toBeDisplayed();
      await expect(AddUserPage.telErrors).toBeDisplayed();

      await AddUserPage.formComplete(
        'Julián',
        'Demeglio',
        'julian.demeglio@radiumrocket.com',
        '12031994',
        'Rosario',
        '3412569874',
      );

      await AddUserPage.submitBtnClick();

      await expect(Modal.modalContainer).toBeDisplayed();
      await expect(Modal.modalTitle).toBeDisplayed();
      await expect(Modal.modalText).toBeDisplayed();
      await expect(Modal.modalCancelBtn).toBeDisplayed();
      await expect(Modal.modalConfirmBtn).toBeDisplayed();

      await Modal.modalConfirmBtnClick();
    });
    it('Error modal | should not pass after running the seeders', async () => {
      await expect(Modal.modalContainer).toBeDisplayed();
      await expect(Modal.modalTitle).toBeDisplayed();
      await expect(Modal.modalText).toBeDisplayed();
      await expect(Modal.modalContinueBtn).toBeDisplayed();

      await Modal.modalContinueBtnClick();
    });
  });
});
