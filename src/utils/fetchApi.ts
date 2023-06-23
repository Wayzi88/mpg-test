import axios from 'axios';

export const fetchApi = async (url: string) => {
  const baseUrl = 'https://api.mpg.football/api/data';
  const apiData = await axios.get(`${baseUrl}/${url}`);
  return apiData.data;
};
