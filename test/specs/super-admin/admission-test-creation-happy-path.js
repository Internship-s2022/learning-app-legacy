/* eslint-disable no-undef */
import Layout from '../../page-objects/shared-components/layout';
import Header from '../../page-objects/shared-components/header';
import Modal from '../../page-objects/shared-components/modal';
import Tabs from '../../page-objects/shared-components/tabs';
import Stepper from '../../page-objects/shared-components/stepper';
import Table from '../../page-objects/shared-components/table';
import LogInPage from '../../page-objects/General/login.page';
import AdmissionTestTablePage from '../../page-objects/super-admin/admission-test/admission-test-table.page';

describe('Superadmin add Admission Test E2E happy path', () => {
  describe('Successful login', () => {
    beforeAll('Open Browser', () => {
      browser.url('/login');
    });

    it('Login Success', async () => {
      await LogInPage.login('super.admin@radiumrocket.com', 'Passw0rd1234');
    });
  });

  describe('Successful display of list of Admission Test', () => {
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

      await Tabs.goToTab02();
    });

    it('Verify table shared component', async () => {
      await expect(AdmissionTestTablePage.nameFilter).toBeDisplayed();
      await expect(AdmissionTestTablePage.addAdmissionTestBtn).toBeDisplayed();

      await expect(Table.table).toBeDisplayed();
      await expect(Table.tableContainer).toBeDisplayed();
      await expect(Table.tableHeaderContainer).toBeDisplayed();
      await expect(Table.tableRows).toBeDisplayed();
      await expect(Table.paginationContainer).toBeDisplayed();
      await expect(AdmissionTestTablePage.headerNameColumn).toBeDisplayed();
      await expect(AdmissionTestTablePage.headerButtonColumn).toBeDisplayed();

      await AdmissionTestTablePage.admissionTestFilter('Ingles');
      await expect(AdmissionTestTablePage.admissionTest2).not.toBeDisplayed();
      browser.keys('\uE007');
    });

    it('Add admission test', async () => {
      await browser.refresh();
      await Tabs.goToTab02();

      await AdmissionTestTablePage.admissionTestInput('HTML');
      await AdmissionTestTablePage.addAdmissionTestBtnClick();

      await AdmissionTestTablePage.admissionTestFilter('HTML');
      await expect(AdmissionTestTablePage.admissionTest2).not.toBeDisplayed();
      browser.keys('\uE007');
    });

    it('Delete admission test', async () => {
      await browser.refresh();
      await Tabs.goToTab02();

      await AdmissionTestTablePage.admissionTestFilter('HTML');
      browser.keys('\uE007');
      await AdmissionTestTablePage.deleteAdmissionTestClick();

      await expect(Modal.modalContainer).toBeDisplayed();
      await expect(Modal.modalTitle).toBeDisplayed();
      await expect(Modal.modalText).toBeDisplayed();
      await expect(Modal.modalCancelBtn).toBeDisplayed();
      await expect(Modal.modalConfirmBtn).toBeDisplayed();

      await Modal.modalConfirmBtnClick();
    });
  });
});
