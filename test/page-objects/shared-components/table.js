/* eslint-disable no-undef */
class Table {
  get table() {
    return $('[data-testid=table-container-div]');
  }
  get tableHeaderContainer() {
    return $(' [data-testid=table-head]');
  }
  get tableContainer() {
    return $('[data-testid=table-container-div]');
  }
  get tableRows() {
    return $$('[data-testid=table-container-div] tr');
  }

  // Filters and column names are selected on the particular table.page of the entity

  get buttonsContainer() {
    return $('[data-testid=shared-component-table-buttons]');
  }
  get addBtn() {
    return $('[data-testid=shared-component-table-addBtn]');
  }
  get exportBtn() {
    return $('[data-testid=shared-component-table-expBtn]');
  }

  get paginationContainer() {
    return $('[data-testid=pagination-container]');
  }
  get paginationRowsSelect() {
    return $('[data-testid=pagination-selector]');
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
    return $('[data-testid=pagination-next-icon-button]');
  }

  async goToAddCourseStep1Page() {
    await this.addBtn.click();
  }

  async goToAddUserPage() {
    await this.addBtn.click();
  }
}

export default new Table();
