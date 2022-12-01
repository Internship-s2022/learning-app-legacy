/* eslint-disable no-undef */
class AddCourseStep3Page {
  get assignTutor() {
    return $('[data-testid="assign-tutor-container-section"]');
  }
  get assignTutorTittleContainer() {
    return $('[data-testid="assign-tutor-tittle-div"]');
  }
  get assignTutorTittle() {
    return $('[data-testid="assign-tutor-tittle-div"] h1');
  }
  get assignTutorText() {
    return $('[data-testid="assign-tutor-tittle-div"] h2:nth-child(2)');
  }
  get assignTutorError() {
    return $('[data-testid="assign-tutor-tittle-div"] h3');
  }

  get tableFilterTittle() {
    return $('[data-testid="assign-tutor-tittle-div"] div > h2');
  }
  get tableFilterField() {
    return $('[data-testid=postulant_firstName-field]');
  }
  get tableFilterLabel() {
    return $('[data-testid=postulant_firstName-field] label');
  }
  get tableFilterInput() {
    return $('[data-testid=postulant_firstName-field] input');
  }

  get headerCheckboxColumn() {
    return $(' [data-testid=table-head] > tr > th:nth-child(1)');
  }
  get headerNameColumn() {
    return $(' [data-testid=table-head] > tr > th:nth-child(2)');
  }
  get headerLastNameColumn() {
    return $(' [data-testid=table-head] > tr > th:nth-child(3)');
  }
  get headerEmailColumn() {
    return $(' [data-testid=table-head] > tr > th:nth-child(4)');
  }

  get tableContainer() {
    return $(' [data-testid=table-container-div]');
  }
  get checkbox1() {
    return $(' [data-testid=row-0] span');
  }
  get checkbox2() {
    return $(' [data-testid=row-1] span');
  }
  get checkbox3() {
    return $(' [data-testid=row-2] span');
  }

  async filterNameClear(name) {
    await this.tableFilterInput.clearValue(name);
  }

  async filterName(name) {
    await this.tableFilterInput.setValue(name);
  }

  async checkbox1click() {
    await this.checkbox1.click();
  }
}

export default new AddCourseStep3Page();
