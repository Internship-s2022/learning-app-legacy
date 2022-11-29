/* eslint-disable no-undef */
class addCourseStep3Page {
  get confirmCourse() {
    return $('[data-testid="confirmation-course-container-section"]');
  }

  get confirmCourseForm() {
    return $('[data-testid="confirmation-course-container-form"]');
  }

  get nameField() {
    return $('[data-testid=name-field]');
  }
  get nameLabel() {
    return $('[data-testid=name-field] label');
  }
  get nameInput() {
    return $('[data-testid=name-field] input');
  }
  get nameErrors() {
    return $('[data-testid=name-field] p');
  }

  get descriptionField() {
    return $('[data-testid=description-field]');
  }
  get descriptionLabel() {
    return $('[data-testid=description-field] label');
  }
  get descriptionInput() {
    return $('[data-testid=description-field] textarea');
  }
  get descriptionErrors() {
    return $('[data-testid=description-field] p');
  }

  get isInternalField() {
    return $('[data-testid=isInternal-container]');
  }
  get isInternalLabel() {
    return $('[data-testid=isInternal-container] label');
  }
  get isInternalInput() {
    return $('[data-testid=isInternal-container]');
  }

  get isInternalOptionIntern() {
    return $('[data-testid=dropdown-option-true]');
  }
  get isInternalOptionExtern() {
    return $('[data-testid=dropdown-option-false]');
  }

  get tableContainer() {
    return $(' [data-testid=table-container-div]');
  }
  get headerNameColumn() {
    return $(' [data-testid=table-head] > tr > th:nth-child(1)');
  }
  get headerLastNameColumn() {
    return $(' [data-testid=table-head] > tr > th:nth-child(2)');
  }
  get headerEmailColumn() {
    return $(' [data-testid=table-head] > tr > th:nth-child(3)');
  }

  async formComplete(name, description) {
    await this.nameInput.setValue(name);
    await this.descriptionInput.setValue(description);
    browser.pause(2000);
  }

  async isInternalDropdown() {
    await this.isInternalInput.click();
    browser.pause(3000);
  }
  async dropdownOptionIntern() {
    await this.isInternalOptionIntern.click();
  }
  async dropdownOptionExtern() {
    await this.isInternalOptionExtern.click();
  }
}

export default new addCourseStep3Page();
