/* eslint-disable no-undef */
import layout from '../../page-objects/shared-components/layout';
import header from '../../page-objects/shared-components/header';
import modal from '../../page-objects/shared-components/modal';
import tabs from '../../page-objects/shared-components/tabs';
import table from '../../page-objects/shared-components/table';
import logInPage from '../../page-objects/General/login.page';
import courseTablePage from '../../page-objects/super-admin/course/course-table.page';
import addCoursePage from '../../page-objects/super-admin/course/add-course.page';

describe('Superadmin add Course E2E happy path', () => {
  describe('Successful login', () => {
    beforeAll('Open Browser', () => {
      browser.url('/login');
    });

    it('Login Success', async () => {
      browser.refresh();
      await logInPage.login('super.admin@radiumrocket.com', 'Passw0rd1234');
    });
  });

  describe('Successful display of list of Courses', () => {
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

      await header.goToCourseTablePage();
    });

    it('Verify tabs shared component', async () => {
      await expect(tabs.TabsContainer).toBeDisplayed();
      await expect(tabs.tab01).toBeDisplayed();
      await expect(tabs.tab01).toBeClickable();
      await expect(tabs.tab02).toBeDisplayed();
      await expect(tabs.tab02).toBeClickable();
    });

    it('Verify course table page components', async () => {
      await expect(courseTablePage.courseTablePageContainer).toBeDisplayed();
      await expect(courseTablePage.courseTablePageTitle).toBeDisplayed();
      await expect(courseTablePage.courseTablePageError).not.toBeDisplayed();
      await expect(courseTablePage.courseTablePageText).not.toBeDisplayed();
      //remove the .not when the description of the Course page is added.
      await expect(table.table).toBeDisplayed();
      await expect(table.tableContainer).toBeDisplayed();
      await expect(courseTablePage.courseTableFilterContainer).toBeDisplayed();
      await expect(table.tableHeaderContainer).toBeDisplayed();
      await expect(table.tableRows).toBeDisplayed();
      await expect(table.paginationContainer).toBeDisplayed();
    });

    it('Verify table shared component', async () => {
      await expect(table.table).toBeDisplayed();
      await expect(table.tableContainer).toBeDisplayed();
      await expect(courseTablePage.courseTableFilterContainer).toBeDisplayed();
      await expect(table.tableHeaderContainer).toBeDisplayed();
      await expect(table.tableRows).toBeDisplayed();
      await expect(table.paginationContainer).toBeDisplayed();
    });

    it('Verify Course table filters', async () => {
      await expect(courseTablePage.courseNameFilter).toBeDisplayed();
      await expect(courseTablePage.courseNameFilterLabel).toBeDisplayed();
      await expect(courseTablePage.courseNameFilterInput).toBeDisplayed();

      await expect(courseTablePage.statusFilter).toBeDisplayed();
      await expect(courseTablePage.statusFilterLabel).toBeDisplayed();

      await expect(courseTablePage.typeFilter).toBeDisplayed();
      await expect(courseTablePage.typeFilterLabel).toBeDisplayed();
    });

    it('Verify Course table header', async () => {
      await expect(courseTablePage.headerCheckboxColumn).toBeDisplayed();
      await expect(courseTablePage.headerCheckboxColumn).toBeClickable();

      await expect(courseTablePage.headerCourseNameColumn).toBeDisplayed();
      await expect(courseTablePage.headerStatusColumn).toBeDisplayed();
      await expect(courseTablePage.headerTypeColumn).toBeDisplayed();
      await expect(courseTablePage.headerButtonsColumn).toBeDisplayed();
    });

    //   // it('get content from table cell', async () => {
    //   //   browser.pause(8000);
    //   //   const tableContainer = await $$('[data-testid=table-container-div] tr');
    //   //   const rows = tableContainer.length;
    //   //   let counter = 0;
    //   //   for (let i = 0; i < rows; i++) {
    //   //     const rowSelector = `[data-testid=row-${i}]`;
    //   //     // console.log(`infoselect: ${rowSelector}`);
    //   //     const row = await $(rowSelector);
    //   //     const columns = await $$(`${rowSelector} td `);

    //   //     for (let j = 0; j < columns.length; j++) {
    //   //       const column = await $(`${rowSelector} > [data-testid=column-${j}] > p`);
    //   //       // console.log(`all info of the row: ${i} column: ${j}`);
    //   //       console.log(`info 1: ${JSON.stringify(column.getText(), null, 3)}`);
    //   //       const columnText = column.getText().then((res) => {
    //   //         console.log('response', res);
    //   //       });

    //   //       console.log(`info 2: ${columnText}`);
    //   //     }
    //   //     //hacer objeto para pasar la tabla
    //   //   }
    //   // });

    it('Verify Course table pagination', async () => {
      await expect(table.paginationContainer).toBeDisplayed();
      await expect(table.paginationRowsSelect).toBeDisplayed();
      await expect(table.paginationRowsSelectTxt).toBeDisplayed();
      await expect(table.paginationPrevBtn).toBeDisplayed();
      await expect(table.paginationPrevBtnTxt).toBeDisplayed();
      await expect(table.paginationNextBtn).toBeDisplayed();
    });

    it('Verify table pagination shared component', async () => {
      await expect(table.buttonsContainer).toBeDisplayed();
      await expect(table.buttonsContainer).toBeClickable();
      await expect(table.addBtn).toBeDisplayed();
      await expect(table.addBtn).toBeClickable();
      await expect(table.exportBtn).toBeDisplayed();
      await expect(table.exportBtn).toBeClickable();

      await table.goToAddCoursePage();
    });
  });

  describe('Successful creation of an Course form scratch', () => {
    //   it('Verify layout shared component', async () => {
    //     await expect(layout.layoutContainer).toBeDisplayed();
    //   });
    //   it('Verify Radium Learning header', async () => {
    //     await expect(header.headerContainer).toBeDisplayed();
    //     await expect(header.headerLogoIconRR).toBeDisplayed();
    //     await expect(header.headerLogoIconRR).toBeClickable();
    //     await expect(header.headerTab0).toBeDisplayed();
    //     await expect(header.headerTab0).toBeClickable();
    //     await expect(header.headerTab1).toBeDisplayed();
    //     await expect(header.headerTab1).toBeClickable();
    //   });
    //   it('Successful dni search', async () => {
    //     await expect(addCoursePage.dniField).toBeDisplayed();
    //     await addCoursePage.dniSearch(' ');
    //     await expect(addCoursePage.dniLabel).toBeDisplayed();
    //     await expect(addCoursePage.dniInput).toBeDisplayed();
    //     await expect(addCoursePage.dniErrors).toBeDisplayed();
    //     await addCoursePage.dniSearch('37815760');
    //   });
    //   it('add Course form complete', async () => {
    //     await browser.refresh();
    //     await courseTablePage.goToAddCoursePage();
    //     await addCoursePage.dniSearch('37815760');
    //     await expect(addCoursePage.dniField).toBeDisplayed();
    //     await expect(addCoursePage.dniLabel).toBeDisplayed();
    //     await expect(addCoursePage.dniInput).toBeDisplayed();
    //     await expect(addCoursePage.dniErrors).toBeDisplayed();
    //     await expect(addCoursePage.dniBtn).toBeDisplayed();
    //     // await addCoursePage.formComplete('', '', '', '', '', '');
    //     await expect(addCoursePage.nameField).toBeDisplayed();
    //     await expect(addCoursePage.nameLabel).toBeDisplayed();
    //     await expect(addCoursePage.nameInput).toBeDisplayed();
    //     await expect(addCoursePage.nameErrors).toBeDisplayed();
    //     await expect(addCoursePage.lastNameField).toBeDisplayed();
    //     await expect(addCoursePage.lastNameLabel).toBeDisplayed();
    //     await expect(addCoursePage.lastNameInput).toBeDisplayed();
    //     await expect(addCoursePage.lastNameErrors).toBeDisplayed();
    //     await expect(addCoursePage.emailField).toBeDisplayed();
    //     await expect(addCoursePage.emailLabel).toBeDisplayed();
    //     await expect(addCoursePage.emailInput).toBeDisplayed();
    //     await expect(addCoursePage.emailErrors).toBeDisplayed();
    //     await expect(addCoursePage.birthDateField).toBeDisplayed();
    //     await expect(addCoursePage.birthDateLabel).toBeDisplayed();
    //     await expect(addCoursePage.birthDateInput).toBeDisplayed();
    //     await expect(addCoursePage.birthDateErrors).toBeDisplayed();
    //     await expect(addCoursePage.locationField).toBeDisplayed();
    //     await expect(addCoursePage.locationLabel).toBeDisplayed();
    //     await expect(addCoursePage.locationInput).toBeDisplayed();
    //     await expect(addCoursePage.locationErrors).toBeDisplayed();
    //     await expect(addCoursePage.telField).toBeDisplayed();
    //     await expect(addCoursePage.telLabel).toBeDisplayed();
    //     await expect(addCoursePage.telInput).toBeDisplayed();
    //     await expect(addCoursePage.telErrors).toBeDisplayed();
    //     await addCoursePage.formComplete(
    //       'Julián',
    //       'Demeglio',
    //       'julian.demeglio@radiumrocket.com',
    //       '12031994',
    //       'Rosario',
    //       '3412569874',
    //     );
    //     await addCoursePage.submitBtnClick();
    //     await expect(modal.modalContainer).toBeDisplayed();
    //     await expect(modal.modalTitle).toBeDisplayed();
    //     await expect(modal.modalText).toBeDisplayed();
    //     await expect(modal.modalCancelBtn).toBeDisplayed();
    //     await expect(modal.modalConfirmBtn).toBeDisplayed();
    //     await modal.modalConfirmBtnClick();
    //   });
    //   it('Error modal | should not pass after running the seeders', async () => {
    //     await expect(modal.modalContainer).toBeDisplayed();
    //     await expect(modal.modalTitle).toBeDisplayed();
    //     await expect(modal.modalText).toBeDisplayed();
    //     await expect(modal.modalContinueBtn).toBeDisplayed();
    //     await modal.modalContinueBtnClick();
    //   });
  });
});
