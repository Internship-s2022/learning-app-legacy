/* eslint-disable no-undef */
class AdmissionTestTablePage {
  get userTablePageContainer() {
    return $('[data-testid=list-admTest-container-div]');
  }
  get userTablePageTitle() {
    return $('[data-testid=list-admTest-container-div] h1');
  }
  get userTablePageText() {
    return $('[data-testid=list-admTest-container-div] h6');
  }

  get nameFilter() {
    return $(
      '[data-testid="list-admTest-container-div"] form:nth-child(1) [data-testid="name-field"]',
    );
  }
  get nameFilterLabel() {
    return $(
      '[data-testid="list-admTest-container-div"] form:nth-child(1) [data-testid="name-field"] label',
    );
  }
  get nameFilterInput() {
    return $(
      '[data-testid="list-admTest-container-div"] form:nth-child(1) [data-testid="name-field"] input',
    );
  }

  get nameField() {
    return $(
      '[data-testid="list-admTest-container-div"] form:nth-child(2) [data-testid="name-field"]',
    );
  }
  get nameFieldLabel() {
    return $(
      '[data-testid="list-admTest-container-div"] form:nth-child(2) [data-testid="name-field"] label',
    );
  }
  get nameFieldInput() {
    return $(
      '[data-testid="list-admTest-container-div"] form:nth-child(2) [data-testid="name-field"] input',
    );
  }
  get admissionTest2() {
    return $('[data-testid="column-1"]');
  }

  get addAdmissionTestBtn() {
    return $('[data-testid="add-admission-test-button"]');
  }

  get tableHeaderContainer() {
    return $(' [data-testid=table-head]');
  }
  get headerNameColumn() {
    return $(' [data-testid=table-head] > tr > th:nth-child(1)');
  }
  get headerButtonColumn() {
    return $(' [data-testid=table-head] > tr > th:nth-child(2)');
  }

  get deleteAdmissionTest() {
    return $(' [data-testid=delete-button-0]');
  }

  async admissionTestFilter(name) {
    await this.nameFilterInput.setValue(name);
  }
  async admissionTestInput(name) {
    await this.nameFieldInput.setValue(name);
  }
  async addAdmissionTestBtnClick() {
    await this.addAdmissionTestBtn.click();
  }
  async deleteAdmissionTestClick() {
    await this.deleteAdmissionTest.click();
  }
}

export default new AdmissionTestTablePage();
