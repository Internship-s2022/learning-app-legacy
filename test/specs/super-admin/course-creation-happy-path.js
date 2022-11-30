/* eslint-disable no-undef */
import Layout from '../../page-objects/shared-components/layout';
import Header from '../../page-objects/shared-components/header';
import Modal from '../../page-objects/shared-components/modal';
import Tabs from '../../page-objects/shared-components/tabs';
import Stepper from '../../page-objects/shared-components/stepper';
import Table from '../../page-objects/shared-components/table';
import LogInPage from '../../page-objects/General/login.page';
import CourseTablePage from '../../page-objects/super-admin/course/course-table.page';
import AddCourseStep1Page from '../../page-objects/super-admin/course/add-course-step1.page';
import AddCourseStep2Page from '../../page-objects/super-admin/course/add-course-step2.page';
import AddCourseStep3Page from '../../page-objects/super-admin/course/add-course-step3.page';
import AddCourseStep4Page from '../../page-objects/super-admin/course/add-course-step4.page';

describe('Superadmin add Course E2E happy path', () => {
  describe('Successful login', () => {
    beforeAll('Open Browser', () => {
      browser.url('/login');
    });

    it('Login Success', async () => {
      browser.refresh();
      await LogInPage.login('super.admin@radiumrocket.com', 'Passw0rd1234');
    });
  });

  describe('Successful display of list of Courses', () => {
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

      await Header.goToCourseTablePage();
    });

    it('Verify tabs shared component', async () => {
      await expect(Tabs.tabsContainer).toBeDisplayed();
      await expect(Tabs.tab01).toBeDisplayed();
      await expect(Tabs.tab01).toBeClickable();
      await expect(Tabs.tab02).toBeDisplayed();
      await expect(Tabs.tab02).toBeClickable();
    });

    it('Verify course table page components', async () => {
      await expect(CourseTablePage.courseTablePageContainer).toBeDisplayed();
      await expect(CourseTablePage.courseTablePageTitle).toBeDisplayed();
      await expect(CourseTablePage.courseTablePageError).not.toBeDisplayed();
      await expect(CourseTablePage.courseTablePageText).toBeDisplayed();
      await expect(Table.table).toBeDisplayed();
      await expect(Table.tableContainer).toBeDisplayed();
      await expect(CourseTablePage.courseTableFilterContainer).toBeDisplayed();
      await expect(Table.tableHeaderContainer).toBeDisplayed();
      await expect(Table.tableRows).toBeDisplayed();
      await expect(Table.paginationContainer).toBeDisplayed();
    });

    it('Verify table shared component', async () => {
      await expect(Table.table).toBeDisplayed();
      await expect(Table.tableContainer).toBeDisplayed();
      await expect(CourseTablePage.courseTableFilterContainer).toBeDisplayed();
      await expect(Table.tableHeaderContainer).toBeDisplayed();
      await expect(Table.tableRows).toBeDisplayed();
      await expect(Table.paginationContainer).toBeDisplayed();
    });

    it('Verify Course table filters', async () => {
      await expect(CourseTablePage.courseNameFilter).toBeDisplayed();
      await expect(CourseTablePage.courseNameFilterLabel).toBeDisplayed();
      await expect(CourseTablePage.courseNameFilterInput).toBeDisplayed();

      await expect(CourseTablePage.statusFilter).toBeDisplayed();
      await expect(CourseTablePage.statusFilterLabel).toBeDisplayed();

      await expect(CourseTablePage.typeFilter).toBeDisplayed();
      await expect(CourseTablePage.typeFilterLabel).toBeDisplayed();
    });

    it('Verify Course table header', async () => {
      await expect(CourseTablePage.headerCheckboxColumn).toBeDisplayed();
      await expect(CourseTablePage.headerCheckboxColumn).toBeClickable();

      await expect(CourseTablePage.headerCourseNameColumn).toBeDisplayed();
      await expect(CourseTablePage.headerStatusColumn).toBeDisplayed();
      await expect(CourseTablePage.headerTypeColumn).toBeDisplayed();
      await expect(CourseTablePage.headerButtonsColumn).toBeDisplayed();
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
      await expect(Table.paginationContainer).toBeDisplayed();
      await expect(Table.paginationRowsSelect).toBeDisplayed();
      await expect(Table.paginationRowsSelectTxt).toBeDisplayed();
      await expect(Table.paginationPrevBtn).toBeDisplayed();
      await expect(Table.paginationPrevBtnTxt).toBeDisplayed();
      await expect(Table.paginationNextBtn).toBeDisplayed();
    });

    it('Verify table pagination shared component', async () => {
      await expect(Table.buttonsContainer).toBeDisplayed();
      await expect(Table.buttonsContainer).toBeClickable();
      await expect(Table.addBtn).toBeDisplayed();
      await expect(Table.addBtn).toBeClickable();
      await expect(Table.exportBtn).toBeDisplayed();
      await expect(Table.exportBtn).toBeClickable();

      await Table.goToAddCourseStep1Page();
    });
  });

  describe('Successful creation of an Course form scratch', () => {
    it('Verify layout shared component | step 1', async () => {
      await expect(Layout.layoutContainer).toBeDisplayed();
    });
    it('Verify Radium Learning header | step 1', async () => {
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
    it('Verify stepper components | step 1', async () => {
      await expect(Stepper.stepperContainer).toBeDisplayed();
      await expect(Stepper.step01).toBeDisplayed();
      await expect(Stepper.step02).toBeDisplayed();
      await expect(Stepper.step03).toBeDisplayed();
      await expect(Stepper.step04).toBeDisplayed();
      await expect(Stepper.goBackBtn).toBeDisplayed();
      await expect(Stepper.continueBtn).toBeDisplayed();
    });
    it('Add Course form complete | step 1', async () => {
      await AddCourseStep1Page.formComplete('', '', '', '', '', '');

      await Stepper.continueBtnClick();

      await expect(AddCourseStep1Page.nameTittle).toBeDisplayed();
      await expect(AddCourseStep1Page.nameText).toBeDisplayed();

      await AddCourseStep1Page.isInternalDropdown();
      await AddCourseStep1Page.dropdownOptionIntern();
      // await AddCourseStep1Page.dropdownOptionExtern();
      await AddCourseStep1Page.typeDropdown();
      await AddCourseStep1Page.dropdownOptionExpress();
      // await AddCourseStep1Page.dropdownOptionFull();

      await expect(AddCourseStep1Page.nameField).toBeDisplayed();
      await expect(AddCourseStep1Page.nameLabel).toBeDisplayed();
      await expect(AddCourseStep1Page.nameInput).toBeDisplayed();
      await expect(AddCourseStep1Page.nameErrors).toBeDisplayed();

      await expect(AddCourseStep1Page.typeTittle).toBeDisplayed();
      await expect(AddCourseStep1Page.typeText).toBeDisplayed();

      await expect(AddCourseStep1Page.isInternalField).toBeDisplayed();
      await expect(AddCourseStep1Page.isInternalLabel).toBeDisplayed();
      await expect(AddCourseStep1Page.typeField).toBeDisplayed();
      await expect(AddCourseStep1Page.typeLabel).toBeDisplayed();

      await expect(AddCourseStep1Page.inscriptionTittle).toBeDisplayed();
      await expect(AddCourseStep1Page.inscriptionText).toBeDisplayed();

      await expect(AddCourseStep1Page.inscriptionStartDateField).toBeDisplayed();
      await expect(AddCourseStep1Page.inscriptionStartDateLabel).toBeDisplayed();
      await expect(AddCourseStep1Page.inscriptionStartDateInput).toBeDisplayed();
      await expect(AddCourseStep1Page.inscriptionStartDateErrors).toBeDisplayed();

      await expect(AddCourseStep1Page.inscriptionEndDateField).toBeDisplayed();
      await expect(AddCourseStep1Page.inscriptionEndDateLabel).toBeDisplayed();
      await expect(AddCourseStep1Page.inscriptionEndDateInput).toBeDisplayed();
      await expect(AddCourseStep1Page.inscriptionEndDateErrors).toBeDisplayed();

      await expect(AddCourseStep1Page.durationTittle).toBeDisplayed();
      await expect(AddCourseStep1Page.durationText).toBeDisplayed();

      await expect(AddCourseStep1Page.startDateField).toBeDisplayed();
      await expect(AddCourseStep1Page.startDateLabel).toBeDisplayed();
      await expect(AddCourseStep1Page.startDateInput).toBeDisplayed();
      await expect(AddCourseStep1Page.startDateErrors).toBeDisplayed();

      await expect(AddCourseStep1Page.endDateField).toBeDisplayed();
      await expect(AddCourseStep1Page.endDateLabel).toBeDisplayed();
      await expect(AddCourseStep1Page.endDateInput).toBeDisplayed();
      await expect(AddCourseStep1Page.endDateErrors).toBeDisplayed();

      await expect(AddCourseStep1Page.descriptionTittle).toBeDisplayed();
      await expect(AddCourseStep1Page.descriptionText).toBeDisplayed();

      await expect(AddCourseStep1Page.descriptionField).toBeDisplayed();
      await expect(AddCourseStep1Page.descriptionLabel).toBeDisplayed();
      await expect(AddCourseStep1Page.descriptionInput).toBeDisplayed();
      await expect(AddCourseStep1Page.descriptionErrors).toBeDisplayed();

      await AddCourseStep1Page.formComplete(
        'Curso',
        '28112032',
        '29112032',
        '30112032',
        '01122032',
        'Description',
      );

      await Stepper.continueBtnClick();
    });
    it('Verify layout shared component | step 2', async () => {
      await expect(Layout.layoutContainer).toBeDisplayed();
    });
    it('Verify Radium Learning header | step 2', async () => {
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
    it('Verify stepper components | step 2', async () => {
      await expect(Stepper.stepperContainer).toBeDisplayed();
      await expect(Stepper.step01).toBeDisplayed();
      await expect(Stepper.step02).toBeDisplayed();
      await expect(Stepper.step03).toBeDisplayed();
      await expect(Stepper.step04).toBeDisplayed();
      await expect(Stepper.goBackBtn).toBeDisplayed();
      await expect(Stepper.continueBtn).toBeDisplayed();
    });
    it('Admin assignation | step 2', async () => {
      await AddCourseStep2Page.filterName('Julian');
      browser.keys('\uE007');

      await expect(AddCourseStep2Page.assignAdmin).toBeDisplayed();
      await expect(AddCourseStep2Page.assignAdminTittleContainer).toBeDisplayed();
      await expect(AddCourseStep2Page.assignAdminTittle).toBeDisplayed();
      await expect(AddCourseStep2Page.assignAdminText).toBeDisplayed();
      await expect(AddCourseStep2Page.assignAdminError).toBeDisplayed();

      await expect(AddCourseStep2Page.tableFilterTittle).toBeDisplayed();
      await expect(AddCourseStep2Page.tableFilterField).toBeDisplayed();
      await expect(AddCourseStep2Page.tableFilterLabel).toBeDisplayed();
      await expect(AddCourseStep2Page.tableFilterInput).toBeDisplayed();

      await expect(AddCourseStep2Page.headerCheckboxColumn).toBeDisplayed();
      await expect(AddCourseStep2Page.headerNameColumn).toBeDisplayed();
      await expect(AddCourseStep2Page.headerLastNameColumn).toBeDisplayed();
      await expect(AddCourseStep2Page.headerEmailColumn).toBeDisplayed();

      await expect(AddCourseStep2Page.tableContainer).toBeDisplayed();
      await expect(AddCourseStep2Page.checkbox1).toBeDisplayed();
      // await expect(AddCourseStep2Page.checkbox2).toBeDisplayed();
      // await expect(AddCourseStep2Page.checkbox3).toBeDisplayed();

      await AddCourseStep2Page.checkbox1click();

      await Stepper.continueBtnClick();
    });
    it('Verify layout shared component | step 3', async () => {
      await expect(Layout.layoutContainer).toBeDisplayed();
    });
    it('Verify Radium Learning header | step 3', async () => {
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
    it('Verify stepper components | step 3', async () => {
      await expect(Stepper.stepperContainer).toBeDisplayed();
      await expect(Stepper.step01).toBeDisplayed();
      await expect(Stepper.step02).toBeDisplayed();
      await expect(Stepper.step03).toBeDisplayed();
      await expect(Stepper.step04).toBeDisplayed();
      await expect(Stepper.goBackBtn).toBeDisplayed();
      await expect(Stepper.continueBtn).toBeDisplayed();
    });
    it('Tutor assignation | step 3', async () => {
      await AddCourseStep2Page.filterName('Franco');
      browser.keys('\uE007');

      await expect(AddCourseStep3Page.assignTutor).toBeDisplayed();
      await expect(AddCourseStep3Page.assignTutorTittleContainer).toBeDisplayed();
      await expect(AddCourseStep3Page.assignTutorTittle).toBeDisplayed();
      await expect(AddCourseStep3Page.assignTutorText).toBeDisplayed();
      await expect(AddCourseStep3Page.assignTutorError).toBeDisplayed();

      await expect(AddCourseStep3Page.tableFilterTittle).toBeDisplayed();
      await expect(AddCourseStep3Page.tableFilterField).toBeDisplayed();
      await expect(AddCourseStep3Page.tableFilterLabel).toBeDisplayed();
      await expect(AddCourseStep3Page.tableFilterInput).toBeDisplayed();

      await expect(AddCourseStep3Page.headerCheckboxColumn).toBeDisplayed();
      await expect(AddCourseStep3Page.headerNameColumn).toBeDisplayed();
      await expect(AddCourseStep3Page.headerLastNameColumn).toBeDisplayed();
      await expect(AddCourseStep3Page.headerEmailColumn).toBeDisplayed();

      await expect(AddCourseStep3Page.tableContainer).toBeDisplayed();
      await expect(AddCourseStep3Page.checkbox1).toBeDisplayed();
      // await expect(AddCourseStep3Page.checkbox2).toBeDisplayed();
      // await expect(AddCourseStep3Page.checkbox3).toBeDisplayed();

      await AddCourseStep3Page.checkbox1click();

      await Stepper.continueBtnClick();
    });
    it('Verify layout shared component | step 4', async () => {
      await expect(Layout.layoutContainer).toBeDisplayed();
    });
    it('Verify Radium Learning header | step 4', async () => {
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
    it('Verify stepper components | step 4', async () => {
      await expect(Stepper.stepperContainer).toBeDisplayed();
      await expect(Stepper.step01).toBeDisplayed();
      await expect(Stepper.step02).toBeDisplayed();
      await expect(Stepper.step03).toBeDisplayed();
      await expect(Stepper.step04).toBeDisplayed();
      await expect(Stepper.goBackBtn).toBeDisplayed();
      await expect(Stepper.continueBtn).toBeDisplayed();
    });
    it('Course confirmation | step 4', async () => {
      await expect(AddCourseStep4Page.confirmCourse).toBeDisplayed();

      await expect(AddCourseStep4Page.confirmCourseForm).toBeDisplayed();

      await expect(AddCourseStep4Page.nameField).toBeDisplayed();
      await expect(AddCourseStep4Page.nameLabel).toBeDisplayed();
      await expect(AddCourseStep4Page.nameInput).toBeDisplayed();
      // await expect(AddCourseStep4Page.nameErrors).toBeDisplayed();

      await expect(AddCourseStep4Page.descriptionField).toBeDisplayed();
      await expect(AddCourseStep4Page.descriptionLabel).toBeDisplayed();
      await expect(AddCourseStep4Page.descriptionInput).toBeDisplayed();
      // await expect(AddCourseStep4Page.descriptionErrors).toBeDisplayed();

      await AddCourseStep4Page.isInternalDropdown();
      await AddCourseStep4Page.dropdownOptionIntern();
      // await addCourseStep1Page.dropdownOptionExtern();

      await expect(AddCourseStep4Page.headerNameColumn).toBeDisplayed();
      await expect(AddCourseStep4Page.headerLastNameColumn).toBeDisplayed();
      await expect(AddCourseStep4Page.headerEmailColumn).toBeDisplayed();

      await expect(AddCourseStep4Page.tableContainer).toBeDisplayed();
      // await expect(AddCourseStep4Page.checkbox2).toBeDisplayed();
      // await expect(AddCourseStep4Page.checkbox3).toBeDisplayed();

      await AddCourseStep4Page.formComplete(' edited', ' edited');

      await Stepper.continueBtnClick();

      await expect(Modal.modalContainer).toBeDisplayed();
      await expect(Modal.modalTitle).toBeDisplayed();
      await expect(Modal.modalText).toBeDisplayed();
      await expect(Modal.modalCancelBtn).toBeDisplayed();
      await expect(Modal.modalConfirmBtn).toBeDisplayed();

      await Modal.modalConfirmBtnClick();
    });
  });
});
