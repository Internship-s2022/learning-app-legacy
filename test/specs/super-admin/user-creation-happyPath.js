/* eslint-disable no-undef */
import layout from '../../page-objects/shared-components/layout';
import header from '../../page-objects/shared-components/header';
import modal from '../../page-objects/shared-components/modal';
import table from '../../page-objects/shared-components/table';
import logInPage from '../../page-objects/General/login.page';
import userTablePage from '../../page-objects/super-admin/user/users-table.page';
import addUserPage from '../../page-objects/super-admin/user/add-user.page';

describe('Superadmin add User E2E happy path', () => {
  describe('Successful login', () => {
    beforeAll('Open Browser', () => {
      browser.url('/login');
    });

    it('Login Success', async () => {
      browser.refresh();
      await logInPage.login('super.admin@radiumrocket.com', 'Passw0rd1234');
    });
  });

  describe('Successful display of list of users', () => {
    it('Verify layout shared component', async () => {
      await expect(layout.layoutContainer).toBeDisplayed();
    });

    it('Verify header shared component', async () => {
      await expect(header.headerContainer).toBeDisplayed();
      await expect(header.headerLogoIconRR).toBeDisplayed();
      await expect(header.headerLogoIconRR).toBeClickable();
      await expect(header.headerTab0).toBeDisplayed();
      await expect(header.headerTab0).toBeClickable();
      await expect(header.headerTab1).toBeDisplayed();
      await expect(header.headerTab1).toBeClickable();
      await expect(header.headerLogOutBtn).toBeDisplayed();
      await expect(header.headerLogOutBtn).toBeClickable();
    });

    it('Verify user table page components', async () => {
      await expect(userTablePage.userTablePageContainer).toBeDisplayed();
      await expect(userTablePage.userTablePageTitle).toBeDisplayed();
      await expect(userTablePage.userTablePageError).not.toBeDisplayed();
      await expect(userTablePage.userTablePageText).toBeDisplayed();
      await expect(table.table).toBeDisplayed();
      await expect(table.tableContainer).toBeDisplayed();
      await expect(userTablePage.userTableFilterContainer).toBeDisplayed();
      await expect(table.tableHeaderContainer).toBeDisplayed();
      await expect(table.tableRows).toBeDisplayed();
      await expect(table.paginationContainer).toBeDisplayed();
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

    it('Verify User table header', async () => {
      await expect(userTablePage.headerCheckboxColumn).toBeDisplayed();
      await expect(userTablePage.headerCheckboxColumn).toBeClickable();

      await expect(userTablePage.headerNameColumn).toBeDisplayed();
      await expect(userTablePage.headerLastNameColumn).toBeDisplayed();
      await expect(userTablePage.headerDniColumn).toBeDisplayed();
      await expect(userTablePage.headerEmailColumn).toBeDisplayed();
      await expect(userTablePage.headerTypeColumn).toBeDisplayed();
      await expect(userTablePage.headerButtonsColumn).toBeDisplayed();
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
      await expect(table.buttonsContainer).toBeDisplayed();
      await expect(table.buttonsContainer).toBeClickable();
      await expect(table.addBtn).toBeDisplayed();
      await expect(table.addBtn).toBeClickable();
      await expect(table.exportBtn).toBeDisplayed();
      await expect(table.exportBtn).toBeClickable();

      await table.goToAddUserPage();
    });
  });

  describe('Successful creation of an User form scratch', () => {
    it('Verify layout shared component', async () => {
      await expect(layout.layoutContainer).toBeDisplayed();
    });

    it('Verify Radium Learning header', async () => {
      await expect(header.headerContainer).toBeDisplayed();
      await expect(header.headerLogoIconRR).toBeDisplayed();
      await expect(header.headerLogoIconRR).toBeClickable();
      await expect(header.headerTab0).toBeDisplayed();
      await expect(header.headerTab0).toBeClickable();
      await expect(header.headerTab1).toBeDisplayed();
      await expect(header.headerTab1).toBeClickable();
      await expect(header.headerLogOutBtn).toBeDisplayed();
      await expect(header.headerLogOutBtn).toBeClickable();
    });

    it('Successful dni search', async () => {
      await expect(addUserPage.dniField).toBeDisplayed();

      await addUserPage.dniSearch(' ');

      await expect(addUserPage.dniLabel).toBeDisplayed();
      await expect(addUserPage.dniInput).toBeDisplayed();
      await expect(addUserPage.dniErrors).toBeDisplayed();

      await addUserPage.dniSearch('37815760');
    });

    it('add User form complete', async () => {
      await browser.refresh();
      await addUserPage.dniSearch('37815760');
      await expect(addUserPage.dniField).toBeDisplayed();
      await expect(addUserPage.dniLabel).toBeDisplayed();
      await expect(addUserPage.dniInput).toBeDisplayed();
      await expect(addUserPage.dniErrors).toBeDisplayed();
      await expect(addUserPage.dniBtn).toBeDisplayed();

      // await addUserPage.formComplete('', '', '', '', '', '');

      await expect(addUserPage.nameField).toBeDisplayed();
      await expect(addUserPage.nameLabel).toBeDisplayed();
      await expect(addUserPage.nameInput).toBeDisplayed();
      await expect(addUserPage.nameErrors).toBeDisplayed();

      await expect(addUserPage.lastNameField).toBeDisplayed();
      await expect(addUserPage.lastNameLabel).toBeDisplayed();
      await expect(addUserPage.lastNameInput).toBeDisplayed();
      await expect(addUserPage.lastNameErrors).toBeDisplayed();

      await expect(addUserPage.emailField).toBeDisplayed();
      await expect(addUserPage.emailLabel).toBeDisplayed();
      await expect(addUserPage.emailInput).toBeDisplayed();
      await expect(addUserPage.emailErrors).toBeDisplayed();

      await expect(addUserPage.birthDateField).toBeDisplayed();
      await expect(addUserPage.birthDateLabel).toBeDisplayed();
      await expect(addUserPage.birthDateInput).toBeDisplayed();
      await expect(addUserPage.birthDateErrors).toBeDisplayed();

      await expect(addUserPage.locationField).toBeDisplayed();
      await expect(addUserPage.locationLabel).toBeDisplayed();
      await expect(addUserPage.locationInput).toBeDisplayed();
      await expect(addUserPage.locationErrors).toBeDisplayed();

      await expect(addUserPage.telField).toBeDisplayed();
      await expect(addUserPage.telLabel).toBeDisplayed();
      await expect(addUserPage.telInput).toBeDisplayed();
      await expect(addUserPage.telErrors).toBeDisplayed();

      await addUserPage.formComplete(
        'Julián',
        'Demeglio',
        'julian.demeglio@radiumrocket.com',
        '12031994',
        'Rosario',
        '3412569874',
      );

      await addUserPage.submitBtnClick();

      await expect(modal.modalContainer).toBeDisplayed();
      await expect(modal.modalTitle).toBeDisplayed();
      await expect(modal.modalText).toBeDisplayed();
      await expect(modal.modalCancelBtn).toBeDisplayed();
      await expect(modal.modalConfirmBtn).toBeDisplayed();

      await modal.modalConfirmBtnClick();
    });
    it('Error modal | should not pass after running the seeders', async () => {
      await expect(modal.modalContainer).toBeDisplayed();
      await expect(modal.modalTitle).toBeDisplayed();
      await expect(modal.modalText).toBeDisplayed();
      await expect(modal.modalContinueBtn).toBeDisplayed();

      await modal.modalContinueBtnClick();
    });
  });
});
