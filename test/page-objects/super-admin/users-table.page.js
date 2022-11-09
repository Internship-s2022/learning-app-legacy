/* eslint-disable no-undef */
class UserTablePage {
  get headerContainer() {
    return $('<header />');
  }
  get headerlogoIconRR() {
    return $('[data-testid=header-logo-button]');
  }
  get headerTab0() {
    return $('[data-testid=tabs-header-0]');
  }
  get headerTab1() {
    return $('[data-testid=tabs-header-1]');
  }
  get layoutContainer() {
    return $('[data-testid=layout-container-div]');
  }
  get userTableTitle() {
    return $('[data-testid=layout-container-div] h1');
  }
  get userTableSubTitle() {
    return $('[data-testid=layout-container-div] h3');
  }

  get userTable() {
    return $('[data-testid=table-container-div]');
  }
  get userTableFilters() {
    return $('[data-testid=filter-container-div]');
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
}

export default new UserTablePage();
