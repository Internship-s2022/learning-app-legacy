/* eslint-disable no-undef */
import layout from '../../page-objects/shared-components/layout';
import header from '../../page-objects/shared-components/header';
import modal from '../../page-objects/shared-components/modal';
import tabs from '../../page-objects/shared-components/tabs';
import loginPage from '../../page-objects/General/login.page';
import courseTablePage from '../../page-objects/super-admin/course/course-table.page';
import addCoursePage from '../../page-objects/super-admin/course/add-course.page';

describe('Superadmin add Course E2E happy path', () => {
  describe('Successful login', () => {
    beforeAll('Open Browser', () => {
      browser.url('/login');
    });

    it('Verify layout shared component', async () => {
      await expect(layout.layoutContainer).not.toBeDisplayed();
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

  describe('Successful display of list of Courses', () => {
    it('Verify layout shared component', async () => {
      await expect(layout.layoutContainer).toBeDisplayed();
    });
    it('Verify header shared component', async () => {
      await expect(header.headerContainer).toBeDisplayed();
      await expect(header.headerlogoIconRR).toBeDisplayed();
      await expect(header.headerlogoIconRR).toBeClickable();
      await expect(header.headerTab0).toBeDisplayed();
      await expect(header.headerTab0).toBeClickable();
      await expect(header.headerTab1).toBeDisplayed();
      await expect(header.headerTab1).toBeClickable();
      await expect(header.headerLogOutBtn).toBeDisplayed();
      await expect(header.headerLogOutBtn).toBeClickable();
    });

    it('Verify Course table filters', async () => {
      await expect(tabs.tabsContainer).toBeDisplayed();
      await expect(tabs.tab01).toBeDisplayed();
      await expect(tabs.tab01).toBeClickable();
      await expect(tabs.tabs02).toBeDisplayed();
      await expect(tabs.tabs02).toBeClickable();
    });

    it('Verify Course table filters', async () => {
      await expect(courseTablePage.nameFilter).toBeDisplayed();
      await expect(courseTablePage.nameFilterLabel).toBeDisplayed();
      await expect(courseTablePage.nameFilterInput).toBeDisplayed();

      await expect(courseTablePage.lastNameFilter).toBeDisplayed();
      await expect(courseTablePage.lastNameFilterLabel).toBeDisplayed();
      await expect(courseTablePage.lastNameFilterInput).toBeDisplayed();

      await expect(courseTablePage.dniFilter).toBeDisplayed();
      await expect(courseTablePage.dniFilterLabel).toBeDisplayed();
      await expect(courseTablePage.dniFilterInput).toBeDisplayed();

      await expect(courseTablePage.emailFilter).toBeDisplayed();
      await expect(courseTablePage.emailFilterLabel).toBeDisplayed();
      await expect(courseTablePage.emailFilterInput).toBeDisplayed();

      await expect(courseTablePage.typeFilter).toBeDisplayed();
      await expect(courseTablePage.typeFilterLabel).toBeDisplayed();
      await expect(courseTablePage.typeFilterInput).not.toBeDisplayed();
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

    // it('Verify Course table pagination', async () => {
    //   await expect(courseTablePage.paginationContainer).toBeDisplayed();
    //   await expect(courseTablePage.paginationRowsSelect).toBeDisplayed();
    //   await expect(courseTablePage.paginationPrevBtn).toBeDisplayed();
    //   await expect(courseTablePage.paginationNextBtn).toBeDisplayed();
    // });

    it('Verify Course table pagination', async () => {
      await expect(courseTablePage.buttonsContainer).toBeDisplayed();
      await expect(courseTablePage.buttonsContainer).toBeClickable();
      await expect(courseTablePage.addCourseBtn).toBeDisplayed();
      await expect(courseTablePage.addCourseBtn).toBeClickable();
      await expect(courseTablePage.exportCoursesBtn).toBeDisplayed();
      await expect(courseTablePage.exportCoursesBtn).toBeClickable();

      await courseTablePage.goToAddCoursePage();
    });
  });

  describe('Successful creation of an Course form scratch', () => {
    it('Verify layout shared component', async () => {
      await expect(layout.layoutContainer).toBeDisplayed();
    });

    it('Verify Radium Learning header', async () => {
      await expect(header.headerContainer).toBeDisplayed();
      await expect(header.headerlogoIconRR).toBeDisplayed();
      await expect(header.headerlogoIconRR).toBeClickable();
      await expect(header.headerTab0).toBeDisplayed();
      await expect(header.headerTab0).toBeClickable();
      await expect(header.headerTab1).toBeDisplayed();
      await expect(header.headerTab1).toBeClickable();
    });

    it('Successful dni search', async () => {
      await expect(addCoursePage.dniField).toBeDisplayed();

      await addCoursePage.dniSearch(' ');

      await expect(addCoursePage.dniLabel).toBeDisplayed();
      await expect(addCoursePage.dniInput).toBeDisplayed();
      await expect(addCoursePage.dniErrors).toBeDisplayed();

      await addCoursePage.dniSearch('37815760');
    });

    it('add Course form complete', async () => {
      await browser.refresh();
      await courseTablePage.goToAddCoursePage();
      await addCoursePage.dniSearch('37815760');
      await expect(addCoursePage.dniField).toBeDisplayed();
      await expect(addCoursePage.dniLabel).toBeDisplayed();
      await expect(addCoursePage.dniInput).toBeDisplayed();
      await expect(addCoursePage.dniErrors).toBeDisplayed();
      await expect(addCoursePage.dniBtn).toBeDisplayed();

      // await addCoursePage.formComplete('', '', '', '', '', '');

      await expect(addCoursePage.nameField).toBeDisplayed();
      await expect(addCoursePage.nameLabel).toBeDisplayed();
      await expect(addCoursePage.nameInput).toBeDisplayed();
      await expect(addCoursePage.nameErrors).toBeDisplayed();

      await expect(addCoursePage.lastNameField).toBeDisplayed();
      await expect(addCoursePage.lastNameLabel).toBeDisplayed();
      await expect(addCoursePage.lastNameInput).toBeDisplayed();
      await expect(addCoursePage.lastNameErrors).toBeDisplayed();

      await expect(addCoursePage.emailField).toBeDisplayed();
      await expect(addCoursePage.emailLabel).toBeDisplayed();
      await expect(addCoursePage.emailInput).toBeDisplayed();
      await expect(addCoursePage.emailErrors).toBeDisplayed();

      await expect(addCoursePage.birthDateField).toBeDisplayed();
      await expect(addCoursePage.birthDateLabel).toBeDisplayed();
      await expect(addCoursePage.birthDateInput).toBeDisplayed();
      await expect(addCoursePage.birthDateErrors).toBeDisplayed();

      await expect(addCoursePage.locationField).toBeDisplayed();
      await expect(addCoursePage.locationLabel).toBeDisplayed();
      await expect(addCoursePage.locationInput).toBeDisplayed();
      await expect(addCoursePage.locationErrors).toBeDisplayed();

      await expect(addCoursePage.telField).toBeDisplayed();
      await expect(addCoursePage.telLabel).toBeDisplayed();
      await expect(addCoursePage.telInput).toBeDisplayed();
      await expect(addCoursePage.telErrors).toBeDisplayed();

      await addCoursePage.formComplete(
        'Julián',
        'Demeglio',
        'julian.demeglio@radiumrocket.com',
        '12031994',
        'Rosario',
        '3412569874',
      );

      await addCoursePage.submitBtnClick();

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
