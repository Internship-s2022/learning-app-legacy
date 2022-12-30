export const generateDynamicHeadCell = (data, disablePadding: boolean) => {
  if (data?.length) {
    return data?.reduce(
      (prev = [{}], obj, index) => {
        prev[index] = {
          id: obj,
          numeric: false,
          disablePadding: disablePadding,
          label: obj,
          editable: true,
        };
        return prev;
      },
      [{}],
    );
  } else {
    return [];
  }
};
