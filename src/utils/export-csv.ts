import axios from 'axios';

async function download(entity: string) {
  const url = `${process.env.REACT_APP_API_URL}/${entity}/export/csv`;
  const response = await axios({
    url: url,
    method: 'GET',
    responseType: 'blob',
  });
  const href = URL.createObjectURL(response.data);
  const link = document.createElement('a');
  link.href = href;
  link.setAttribute('download', `${entity}s.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
}

export { download };
