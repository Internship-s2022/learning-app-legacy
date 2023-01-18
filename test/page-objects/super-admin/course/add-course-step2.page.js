/* eslint-disable no-undef */
class AddCourseStep2Page {
  get assignAdmin() {
    return $('[data-testid="assign-admin-container-div"]');
  }
  get assignAdminTittleContainer() {
    return $('[data-testid="assign-admin-tittle-div"]');
  }
  get assignAdminTittle() {
    return $('[data-testid="assign-admin-tittle-div"] h1');
  }
  get assignAdminText() {
    return $('[data-testid="assign-admin-tittle-div"] h6:nth-child(2)');
  }
  get assignAdminError() {
    return $('[data-testid="assign-admin-tittle-div"] h6');
  }

  get tableFilterTittle() {
    return $('[data-testid="assign-admin-tittle-div"] h6:nth-child(4)');
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

export default new AddCourseStep2Page();
