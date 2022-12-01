import apiClient from 'src/config/api';

const download = async (query: string, fileName: string) => {
  const response = await apiClient.get(query, { responseType: 'blob' });
  const href = URL.createObjectURL(response.data);
  const link = document.createElement('a');
  link.href = href;
  link.setAttribute('download', `${fileName}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};

const convertArrayToQuery = (_ids: string[]) => {
  const mappedString = _ids.map((e) => `includeIds=${e}&`);
  const queryString = mappedString.join('').toString().slice(0, -1);
  return queryString;
};

export { convertArrayToQuery, download };
