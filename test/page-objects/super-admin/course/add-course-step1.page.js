/* eslint-disable no-undef */
class AddCourseStep1Page {
  get addCourse() {
    return $('[data-testid="add-course-container-section"]');
  }
  get addCourseForm() {
    return $('[data-testid="add-course-container-form"]');
  }

  get nameTittle() {
    return $('[data-testid="course-name-text"] h2');
  }
  get nameText() {
    return $('[data-testid="course-name-text"] h6');
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

  get typeTittle() {
    return $('[data-testid="course-type-text"] h2');
  }
  get typeText() {
    return $('[data-testid="course-type-text"] h6');
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

  get typeField() {
    return $('[data-testid=type-container]');
  }
  get typeLabel() {
    return $('[data-testid=type-container] label');
  }
  get typeInput() {
    return $('[data-testid=type-container]');
  }

  get typeOptionExpress() {
    return $('[data-testid=dropdown-option-EXPRESS]');
  }
  get typeOptionFull() {
    return $('[data-testid=dropdown-option-FULL]');
  }

  get inscriptionTittle() {
    return $('[data-testid="course-inscription-text"] h2');
  }
  get inscriptionText() {
    return $('[data-testid="course-inscription-text"] h6');
  }
  get inscriptionStartDateField() {
    return $('[data-testid=inscriptionStartDate-field]');
  }
  get inscriptionStartDateLabel() {
    return $('[data-testid=inscriptionStartDate-field] label');
  }
  get inscriptionStartDateInput() {
    return $('[data-testid=inscriptionStartDate-field] input');
  }
  get inscriptionStartDateErrors() {
    return $('[data-testid=inscriptionStartDate-field] p');
  }

  get inscriptionEndDateField() {
    return $('[data-testid=inscriptionEndDate-field]');
  }
  get inscriptionEndDateLabel() {
    return $('[data-testid=inscriptionEndDate-field] label');
  }
  get inscriptionEndDateInput() {
    return $('[data-testid=inscriptionEndDate-field] input');
  }
  get inscriptionEndDateErrors() {
    return $('[data-testid=inscriptionEndDate-field] p');
  }

  get durationTittle() {
    return $('[data-testid="course-duration-text"] h2');
  }
  get durationText() {
    return $('[data-testid="course-duration-text"] h6');
  }

  get startDateField() {
    return $('[data-testid=startDate-field]');
  }
  get startDateLabel() {
    return $('[data-testid=startDate-field] label');
  }
  get startDateInput() {
    return $('[data-testid=startDate-field] input');
  }
  get startDateErrors() {
    return $('[data-testid=startDate-field] p');
  }

  get endDateField() {
    return $('[data-testid=endDate-field]');
  }
  get endDateLabel() {
    return $('[data-testid=endDate-field] label');
  }
  get endDateInput() {
    return $('[data-testid=endDate-field] input');
  }
  get endDateErrors() {
    return $('[data-testid=endDate-field] p');
  }

  get descriptionTittle() {
    return $('[data-testid="course-description-text"] h2');
  }
  get descriptionText() {
    return $('[data-testid="course-description-text"] h6');
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

  async typeDropdown() {
    await this.typeInput.click();
    browser.pause(3000);
  }
  async dropdownOptionExpress() {
    await this.typeOptionExpress.click();
  }
  async dropdownOptionFull() {
    await this.typeOptionFull.click();
  }

  async dniSearch(dni) {
    await this.dniInput.setValue(dni);
    await this.dniBtn.click();
    browser.pause(20000);
  }
  async dniClear(dni) {
    await this.dniInput.clearValue(dni);
  }

  async formComplete(
    name,
    inscriptionStartDate,
    inscriptionEndDate,
    startDate,
    endDate,
    description,
  ) {
    await this.nameInput.setValue(name);
    await this.inscriptionStartDateInput.setValue(inscriptionStartDate);
    await this.inscriptionEndDateInput.setValue(inscriptionEndDate);
    await this.startDateInput.setValue(startDate);
    await this.endDateInput.setValue(endDate);
    await this.descriptionInput.setValue(description);
    browser.pause(2000);
  }
}

export default new AddCourseStep1Page();
