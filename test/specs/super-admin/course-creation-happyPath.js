/* eslint-disable no-undef */
import layout from '../../page-objects/shared-components/layout';
import header from '../../page-objects/shared-components/header';
import modal from '../../page-objects/shared-components/modal';
import tabs from '../../page-objects/shared-components/tabs';
import stepper from '../../page-objects/shared-components/stepper';
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
      await expect(courseTablePage.courseTablePageText).toBeDisplayed();
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
    it('Verify stepper components', async () => {
      await expect(stepper.stepperContainer).toBeDisplayed();
      await expect(stepper.step01).toBeDisplayed();
      await expect(stepper.step02).toBeDisplayed();
      await expect(stepper.step03).toBeDisplayed();
      await expect(stepper.step04).toBeDisplayed();
      await expect(stepper.goBackBtn).toBeDisplayed();
      await expect(stepper.ContinueBtn).toBeDisplayed();
    });
    it('add Course form complete', async () => {
      await addCoursePage.formComplete('', '', '', '', '', '');

      await expect(addCoursePage.nameTittle).toBeDisplayed();
      await expect(addCoursePage.nameText).toBeDisplayed();

      await expect(addCoursePage.nameField).toBeDisplayed();
      await expect(addCoursePage.nameLabel).toBeDisplayed();
      await expect(addCoursePage.nameInput).toBeDisplayed();
      await expect(addCoursePage.nameErrors).toBeDisplayed();

      await expect(addCoursePage.typeTittle).toBeDisplayed();
      await expect(addCoursePage.typeText).toBeDisplayed();

      await expect(addCoursePage.isInternalField).toBeDisplayed();
      await expect(addCoursePage.isInternalLabel).toBeDisplayed();
      await expect(addCoursePage.typeField).toBeDisplayed();
      await expect(addCoursePage.typeLabel).toBeDisplayed();

      await expect(addCoursePage.inscriptionTittle).toBeDisplayed();
      await expect(addCoursePage.inscriptionText).toBeDisplayed();

      await expect(addCoursePage.inscriptionStartDateField).toBeDisplayed();
      await expect(addCoursePage.inscriptionStartDateLabel).toBeDisplayed();
      await expect(addCoursePage.inscriptionStartDateInput).toBeDisplayed();
      await expect(addCoursePage.inscriptionStartDateErrors).toBeDisplayed();

      await expect(addCoursePage.inscriptionEndDateField).toBeDisplayed();
      await expect(addCoursePage.inscriptionEndDateLabel).toBeDisplayed();
      await expect(addCoursePage.inscriptionEndDateInput).toBeDisplayed();
      await expect(addCoursePage.inscriptionEndDateErrors).toBeDisplayed();

      await expect(addCoursePage.durationTittle).toBeDisplayed();
      await expect(addCoursePage.durationText).toBeDisplayed();

      await expect(addCoursePage.startDateField).toBeDisplayed();
      await expect(addCoursePage.startDateLabel).toBeDisplayed();
      await expect(addCoursePage.startDateInput).toBeDisplayed();
      await expect(addCoursePage.startDateErrors).toBeDisplayed();

      await expect(addCoursePage.endDateField).toBeDisplayed();
      await expect(addCoursePage.endDateLabel).toBeDisplayed();
      await expect(addCoursePage.endDateInput).toBeDisplayed();
      await expect(addCoursePage.endDateErrors).toBeDisplayed();

      await expect(addCoursePage.descriptionTittle).toBeDisplayed();
      await expect(addCoursePage.descriptionText).toBeDisplayed();

      await expect(addCoursePage.descriptionField).toBeDisplayed();
      await expect(addCoursePage.descriptionLabel).toBeDisplayed();
      await expect(addCoursePage.descriptionInput).toBeDisplayed();
      await expect(addCoursePage.descriptionErrors).toBeDisplayed();
    });
    //   it('Error modal | should not pass after running the seeders', async () => {
    //     await expect(modal.modalContainer).toBeDisplayed();
    //     await expect(modal.modalTitle).toBeDisplayed();
    //     await expect(modal.modalText).toBeDisplayed();
    //     await expect(modal.modalContinueBtn).toBeDisplayed();
    //     await modal.modalContinueBtnClick();
    //   });
  });
});
