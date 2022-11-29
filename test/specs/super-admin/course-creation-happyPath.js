/* eslint-disable no-undef */
import layout from '../../page-objects/shared-components/layout';
import header from '../../page-objects/shared-components/header';
import modal from '../../page-objects/shared-components/modal';
import tabs from '../../page-objects/shared-components/tabs';
import stepper from '../../page-objects/shared-components/stepper';
import table from '../../page-objects/shared-components/table';
import logInPage from '../../page-objects/General/login.page';
import courseTablePage from '../../page-objects/super-admin/course/course-table.page';
import addCourseStep1Page from '../../page-objects/super-admin/course/add-course-step1.page';
import addCourseStep2Page from '../../page-objects/super-admin/course/add-course-step2.page';
import addCourseStep3Page from '../../page-objects/super-admin/course/add-course-step3.page';
import addCourseStep4Page from '../../page-objects/super-admin/course/add-course-step4.page';

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

      await table.goToAddCourseStep1Page();
    });
  });

  describe('Successful creation of an Course form scratch', () => {
    it('Verify layout shared component | step 1', async () => {
      await expect(layout.layoutContainer).toBeDisplayed();
    });
    it('Verify Radium Learning header | step 1', async () => {
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
    it('Verify stepper components | step 1', async () => {
      await expect(stepper.stepperContainer).toBeDisplayed();
      await expect(stepper.step01).toBeDisplayed();
      await expect(stepper.step02).toBeDisplayed();
      await expect(stepper.step03).toBeDisplayed();
      await expect(stepper.step04).toBeDisplayed();
      await expect(stepper.goBackBtn).toBeDisplayed();
      await expect(stepper.continueBtn).toBeDisplayed();
    });
    it('Add Course form complete | step 1', async () => {
      await addCourseStep1Page.formComplete('', '', '', '', '', '');

      await stepper.continueBtnClick();

      await expect(addCourseStep1Page.nameTittle).toBeDisplayed();
      await expect(addCourseStep1Page.nameText).toBeDisplayed();

      await addCourseStep1Page.isInternalDropdown();
      await addCourseStep1Page.dropdownOptionIntern();
      // await addCourseStep1Page.dropdownOptionExtern();
      await addCourseStep1Page.typeDropdown();
      await addCourseStep1Page.dropdownOptionExpress();
      // await addCourseStep1Page.dropdownOptionFull();

      await expect(addCourseStep1Page.nameField).toBeDisplayed();
      await expect(addCourseStep1Page.nameLabel).toBeDisplayed();
      await expect(addCourseStep1Page.nameInput).toBeDisplayed();
      await expect(addCourseStep1Page.nameErrors).toBeDisplayed();

      await expect(addCourseStep1Page.typeTittle).toBeDisplayed();
      await expect(addCourseStep1Page.typeText).toBeDisplayed();

      await expect(addCourseStep1Page.isInternalField).toBeDisplayed();
      await expect(addCourseStep1Page.isInternalLabel).toBeDisplayed();
      await expect(addCourseStep1Page.typeField).toBeDisplayed();
      await expect(addCourseStep1Page.typeLabel).toBeDisplayed();

      await expect(addCourseStep1Page.inscriptionTittle).toBeDisplayed();
      await expect(addCourseStep1Page.inscriptionText).toBeDisplayed();

      await expect(addCourseStep1Page.inscriptionStartDateField).toBeDisplayed();
      await expect(addCourseStep1Page.inscriptionStartDateLabel).toBeDisplayed();
      await expect(addCourseStep1Page.inscriptionStartDateInput).toBeDisplayed();
      await expect(addCourseStep1Page.inscriptionStartDateErrors).toBeDisplayed();

      await expect(addCourseStep1Page.inscriptionEndDateField).toBeDisplayed();
      await expect(addCourseStep1Page.inscriptionEndDateLabel).toBeDisplayed();
      await expect(addCourseStep1Page.inscriptionEndDateInput).toBeDisplayed();
      await expect(addCourseStep1Page.inscriptionEndDateErrors).toBeDisplayed();

      await expect(addCourseStep1Page.durationTittle).toBeDisplayed();
      await expect(addCourseStep1Page.durationText).toBeDisplayed();

      await expect(addCourseStep1Page.startDateField).toBeDisplayed();
      await expect(addCourseStep1Page.startDateLabel).toBeDisplayed();
      await expect(addCourseStep1Page.startDateInput).toBeDisplayed();
      await expect(addCourseStep1Page.startDateErrors).toBeDisplayed();

      await expect(addCourseStep1Page.endDateField).toBeDisplayed();
      await expect(addCourseStep1Page.endDateLabel).toBeDisplayed();
      await expect(addCourseStep1Page.endDateInput).toBeDisplayed();
      await expect(addCourseStep1Page.endDateErrors).toBeDisplayed();

      await expect(addCourseStep1Page.descriptionTittle).toBeDisplayed();
      await expect(addCourseStep1Page.descriptionText).toBeDisplayed();

      await expect(addCourseStep1Page.descriptionField).toBeDisplayed();
      await expect(addCourseStep1Page.descriptionLabel).toBeDisplayed();
      await expect(addCourseStep1Page.descriptionInput).toBeDisplayed();
      await expect(addCourseStep1Page.descriptionErrors).toBeDisplayed();

      await addCourseStep1Page.formComplete(
        'Curso',
        '28112032',
        '29112032',
        '30112032',
        '01122032',
        'Description',
      );

      await stepper.continueBtnClick();
    });
    it('Verify layout shared component | step 2', async () => {
      await expect(layout.layoutContainer).toBeDisplayed();
    });
    it('Verify Radium Learning header | step 2', async () => {
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
    it('Verify stepper components | step 2', async () => {
      await expect(stepper.stepperContainer).toBeDisplayed();
      await expect(stepper.step01).toBeDisplayed();
      await expect(stepper.step02).toBeDisplayed();
      await expect(stepper.step03).toBeDisplayed();
      await expect(stepper.step04).toBeDisplayed();
      await expect(stepper.goBackBtn).toBeDisplayed();
      await expect(stepper.continueBtn).toBeDisplayed();
    });
    it('Admin assignation | step 2', async () => {
      await addCourseStep2Page.filterName('Julian');
      browser.keys('\uE007');

      await expect(addCourseStep2Page.assignAdmin).toBeDisplayed();
      await expect(addCourseStep2Page.assignAdminTittleContainer).toBeDisplayed();
      await expect(addCourseStep2Page.assignAdminTittle).toBeDisplayed();
      await expect(addCourseStep2Page.assignAdminText).toBeDisplayed();
      await expect(addCourseStep2Page.assignAdminError).toBeDisplayed();

      await expect(addCourseStep2Page.tableFilterTittle).toBeDisplayed();
      await expect(addCourseStep2Page.tableFilterField).toBeDisplayed();
      await expect(addCourseStep2Page.tableFilterLabel).toBeDisplayed();
      await expect(addCourseStep2Page.tableFilterInput).toBeDisplayed();

      await expect(addCourseStep2Page.headerCheckboxColumn).toBeDisplayed();
      await expect(addCourseStep2Page.headerNameColumn).toBeDisplayed();
      await expect(addCourseStep2Page.headerLastNameColumn).toBeDisplayed();
      await expect(addCourseStep2Page.headerEmailColumn).toBeDisplayed();

      await expect(addCourseStep2Page.tableContainer).toBeDisplayed();
      await expect(addCourseStep2Page.checkbox1).toBeDisplayed();
      // await expect(addCourseStep2Page.checkbox2).toBeDisplayed();
      // await expect(addCourseStep2Page.checkbox3).toBeDisplayed();

      await addCourseStep2Page.checkbox1click();

      await stepper.continueBtnClick();
    });
    it('Verify layout shared component | step 3', async () => {
      await expect(layout.layoutContainer).toBeDisplayed();
    });
    it('Verify Radium Learning header | step 3', async () => {
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
    it('Verify stepper components | step 3', async () => {
      await expect(stepper.stepperContainer).toBeDisplayed();
      await expect(stepper.step01).toBeDisplayed();
      await expect(stepper.step02).toBeDisplayed();
      await expect(stepper.step03).toBeDisplayed();
      await expect(stepper.step04).toBeDisplayed();
      await expect(stepper.goBackBtn).toBeDisplayed();
      await expect(stepper.continueBtn).toBeDisplayed();
    });
    it('Tutor assignation | step 3', async () => {
      await addCourseStep3Page.filterName('Franco');
      browser.keys('\uE007');

      await expect(addCourseStep3Page.assignTutor).toBeDisplayed();
      await expect(addCourseStep3Page.assignTutorTittleContainer).toBeDisplayed();
      await expect(addCourseStep3Page.assignTutorTittle).toBeDisplayed();
      await expect(addCourseStep3Page.assignTutorText).toBeDisplayed();
      await expect(addCourseStep3Page.assignTutorError).toBeDisplayed();

      await expect(addCourseStep3Page.tableFilterTittle).toBeDisplayed();
      await expect(addCourseStep3Page.tableFilterField).toBeDisplayed();
      await expect(addCourseStep3Page.tableFilterLabel).toBeDisplayed();
      await expect(addCourseStep3Page.tableFilterInput).toBeDisplayed();

      await expect(addCourseStep3Page.headerCheckboxColumn).toBeDisplayed();
      await expect(addCourseStep3Page.headerNameColumn).toBeDisplayed();
      await expect(addCourseStep3Page.headerLastNameColumn).toBeDisplayed();
      await expect(addCourseStep3Page.headerEmailColumn).toBeDisplayed();

      await expect(addCourseStep3Page.tableContainer).toBeDisplayed();
      await expect(addCourseStep3Page.checkbox1).toBeDisplayed();
      // await expect(addCourseStep3Page.checkbox2).toBeDisplayed();
      // await expect(addCourseStep3Page.checkbox3).toBeDisplayed();

      await addCourseStep3Page.checkbox1click();

      await stepper.continueBtnClick();
    });
    it('Verify layout shared component | step 4', async () => {
      await expect(layout.layoutContainer).toBeDisplayed();
    });
    it('Verify Radium Learning header | step 4', async () => {
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
    it('Verify stepper components | step 4', async () => {
      await expect(stepper.stepperContainer).toBeDisplayed();
      await expect(stepper.step01).toBeDisplayed();
      await expect(stepper.step02).toBeDisplayed();
      await expect(stepper.step03).toBeDisplayed();
      await expect(stepper.step04).toBeDisplayed();
      await expect(stepper.goBackBtn).toBeDisplayed();
      await expect(stepper.continueBtn).toBeDisplayed();
    });
    it('Course confirmation | step 4', async () => {
      await expect(addCourseStep4Page.confirmCourse).toBeDisplayed();

      await expect(addCourseStep4Page.confirmCourseForm).toBeDisplayed();

      await expect(addCourseStep4Page.nameField).toBeDisplayed();
      await expect(addCourseStep4Page.nameLabel).toBeDisplayed();
      await expect(addCourseStep4Page.nameInput).toBeDisplayed();
      // await expect(addCourseStep4Page.nameErrors).toBeDisplayed();

      await expect(addCourseStep4Page.descriptionField).toBeDisplayed();
      await expect(addCourseStep4Page.descriptionLabel).toBeDisplayed();
      await expect(addCourseStep4Page.descriptionInput).toBeDisplayed();
      // await expect(addCourseStep4Page.descriptionErrors).toBeDisplayed();

      await addCourseStep4Page.isInternalDropdown();
      await addCourseStep4Page.dropdownOptionIntern();
      // await addCourseStep1Page.dropdownOptionExtern();

      await expect(addCourseStep4Page.headerNameColumn).toBeDisplayed();
      await expect(addCourseStep4Page.headerLastNameColumn).toBeDisplayed();
      await expect(addCourseStep4Page.headerEmailColumn).toBeDisplayed();

      await expect(addCourseStep4Page.tableContainer).toBeDisplayed();
      // await expect(addCourseStep4Page.checkbox2).toBeDisplayed();
      // await expect(addCourseStep4Page.checkbox3).toBeDisplayed();

      await addCourseStep4Page.formComplete(' edited', ' edited');

      await stepper.continueBtnClick();

      await expect(modal.modalContainer).toBeDisplayed();
      await expect(modal.modalTitle).toBeDisplayed();
      await expect(modal.modalText).toBeDisplayed();
      await expect(modal.modalCancelBtn).toBeDisplayed();
      await expect(modal.modalConfirmBtn).toBeDisplayed();

      await modal.modalConfirmBtnClick();
    });
  });
});
