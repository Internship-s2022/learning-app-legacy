/* eslint-disable no-undef */
class UserTablePage {
  get layoutContainer() {
    return $('[data-testid=layout-container-div]');
  }
  get userTableTitle() {
    return $('[data-testid=layout-container-div] h1');
  }
  get userTableText() {
    return $('[data-testid=layout-container-div] h3');
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

  get paginationContainer() {
    return $('[data-testid=table-pagination-container]');
  }
  get paginationRowsSelect() {
    return $('[data-testid=select-row-button]');
  }
  get paginationRowsSelectTxt() {
    return $('[data-testid=table-pagination-container]');
  }
  get paginationPrevBtn() {
    return $('[data-testid=pagination-back-icon-button]');
  }
  get paginationPrevBtnTxt() {
    return $('[data-testid=table-pagination-container]');
  }
  get paginationNextBtn() {
    return $('[data-testid=next-icon-button]');
  }

  async goToAddUserPage() {
    await this.addUserBtn.click();
  }
}

export default new UserTablePage();
