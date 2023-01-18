/* eslint-disable no-undef */
class CourseTablePage {
  get courseTablePageContainer() {
    return $('[data-testid=list-course-container-div]');
  }
  get courseTablePageTitle() {
    return $('[data-testid=list-course-container-div] h1');
  }
  get courseTablePageError() {
    return $('[data-testid=list-course-container-div] h2');
  }
  get courseTablePageText() {
    return $('[data-testid=list-course-container-div] h6');
  }

  get courseTableFilterContainer() {
    return $('[data-testid= course-Filter-container-form]');
  }

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

  get typeFilter() {
    return $('[data-testid=isInternal-container]');
  }
  get typeFilterLabel() {
    return $('[data-testid=isInternal-container] label');
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

  async goToAddCoursePage() {
    await this.addCourseBtn.click();
  }
}

export default new CourseTablePage();
