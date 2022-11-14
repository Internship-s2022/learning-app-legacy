/* eslint-disable no-undef */
class CourseTablePage {
  get layoutContainer() {
    return $('[data-testid=list-course-container-div]');
  }
  get CourseTableTitle() {
    return $('[data-testid=list-course-container-div] h1');
  }
  get CourseTableError() {
    return $('[data-testid=list-course-container-div] h2');
  }
  get CourseTableText() {
    return $('[data-testid=list-course-container-div] h3');
  }

  get CourseTable() {
    return $('[data-testid=table-container-div]');
  }
  get CourseTableFilters() {
    return $('[data-testid=CourseFilter-container-form]');
  }
  get CourseTableRows() {
    return $$('[data-testid=table-container-div] tr');
  }
  // get CourseTableRow() {
  //   var tableContainer = $$('[data-testid=table-container-div] tr');
  //   var rows = tableContainer.length;
  //   var columnContainer = $$('[data-testid=table-container-div] tr');
  //   var rows = tableContainer.length;
  //   return $$('[data-testid=table-container-div] tr');
  // }
  get courseNameFilter() {
    return $('[data-testid=name-field]');
  }
  get courseNameFilterLabel() {
    return $('[data-testid=name-field] label');
  }
  get courseNameFilterInput() {
    return $('[data-testid=name-field] input');
  }

  get statusFilter() {
    return $('[data-testid=status-container]');
  }
  get statusFilterLabel() {
    return $('[data-testid=status-container] label');
  }
  get statusFilterInput() {
    return $('[data-testid=status-container] input');
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
  get headerCourseNameColumn() {
    return $(' [data-testid=table-head] > tr > th:nth-child(2)');
  }
  get headerStatusColumn() {
    return $(' [data-testid=table-head] > tr > th:nth-child(3)');
  }
  get headerTypeColumn() {
    return $(' [data-testid=table-head] > tr > th:nth-child(4)');
  }
  get headerButtonsColumn() {
    return $(' [data-testid=table-head] > tr > th:nth-child(5)');
  }

  get tableContainer() {
    return $('[data-testid=table-container-div]');
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

  async goToAddCoursePage() {
    await this.addCourseBtn.click();
  }
}

export default new CourseTablePage();
