import apiClient from 'src/config/api';

const download = async (query: string, fileName: string) => {
  const response = await apiClient.get(query, { responseType: 'blob' });
  if (response.data) {
    const link = document.createElement('a');
    link.download = `${fileName}.csv`;
    document.body.appendChild(link);
    const blob = new Blob([response.data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    link.href = url;
    link.click();
    document.body.removeChild(link);
  }
};

const convertArrayToQuery = (_ids: string[], queryKey = 'includeIds') => {
  const mappedString = _ids.map((e) => `${queryKey}=${e}&`);
  const queryString = mappedString.join('').toString().slice(0, -1);
  return queryString;
};

export { convertArrayToQuery, download };
