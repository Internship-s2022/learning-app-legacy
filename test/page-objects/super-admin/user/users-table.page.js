/* eslint-disable no-undef */
class UserTablePage {
  get userTableContainer() {
    return $('[data-testid=list-course-container-div]');
  }
  get userTableTitle() {
    return $('[data-testid=list-course-container-div] h1');
  }
  get userTableError() {
    return $('[data-testid=list-course-container-div] h2');
  }
  get userTableText() {
    return $('[data-testid=list-course-container-div] h3');
  }

  get userTable() {
    return $('[data-testid=table-container-div]');
  }
  get userTableFilters() {
    return $('[data-testid=userFilter-container-form]');
  }
  get userTableRows() {
    return $$('[data-testid=table-container-div] tr');
  }
  // get userTableRow() {
  //   var tableContainer = $$('[data-testid=table-container-div] tr');
  //   var rows = tableContainer.length;
  //   var columnContainer = $$('[data-testid=table-container-div] tr');
  //   var rows = tableContainer.length;
  //   return $$('[data-testid=table-container-div] tr');
  // }
  get nameFilter() {
    return $('[data-testid=postulant_firstName-field]');
  }
  get nameFilterLabel() {
    return $('[data-testid=postulant_firstName-field] label');
  }
  get nameFilterInput() {
    return $('[data-testid=postulant_firstName-field] input');
  }

  get lastNameFilter() {
    return $('[data-testid=postulant_lastName-field]');
  }
  get lastNameFilterLabel() {
    return $('[data-testid=postulant_lastName-field] label');
  }
  get lastNameFilterInput() {
    return $('[data-testid=postulant_lastName-field] input');
  }

  get dniFilter() {
    return $('[data-testid=postulant_dni-field]');
  }
  get dniFilterLabel() {
    return $('[data-testid=postulant_dni-field] label');
  }
  get dniFilterInput() {
    return $('[data-testid=postulant_dni-field] input');
  }

  get emailFilter() {
    return $('[data-testid=postulant_email-field]');
  }
  get emailFilterLabel() {
    return $('[data-testid=postulant_email-field] label');
  }
  get emailFilterInput() {
    return $('[data-testid=postulant_email-field] input');
  }

  get typeFilter() {
    return $('[data-testid=isInternal-container]');
  }
  get typeFilterLabel() {
    return $('[data-testid=isInternal-container] label');
  }
  get typeFilterInput() {
    return $('[data-testid=isInternal-container] input');
  }

  get buttonsContainer() {
    return $('[data-testid=shared-component-table-buttons]');
  }
  get addUserBtn() {
    return $('[data-testid=shared-component-table-addBtn]');
  }
  get exportUsersBtn() {
    return $('[data-testid=shared-component-table-expBtn]');
  }

  get tableHeaderContainer() {
    return $(' [data-testid=table-head]');
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
  get headerDniColumn() {
    return $(' [data-testid=table-head] > tr > th:nth-child(4)');
  }
  get headerEmailColumn() {
    return $(' [data-testid=table-head] > tr > th:nth-child(5)');
  }
  get headerTypeColumn() {
    return $(' [data-testid=table-head] > tr > th:nth-child(6)');
  }
  get headerButtonsColumn() {
    return $(' [data-testid=table-head] > tr > th:nth-child(7)');
  }

  get paginationContainer() {
    return $('[data-testid=pagination-container]');
  }
  get paginationRowsSelect() {
    return $('[data-testid=select-row-button]');
  }
  get paginationRowsSelectTxt() {
    return $('[data-testid=pagination-container]');
  }
  get paginationPrevBtn() {
    return $('[data-testid=pagination-back-icon-button]');
  }
  get paginationPrevBtnTxt() {
    return $('[data-testid=pagination-container]');
  }
  get paginationNextBtn() {
    return $('[data-testid=next-icon-button]');
  }

  async goToAddUserPage() {
    await this.addUserBtn.click();
  }
}

export default new UserTablePage();
