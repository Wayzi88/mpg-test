import axios from 'axios';

export const fetchApi = async (url: string) => {
  const baseUrl = 'https://api.mpg.football/api/data';

  try {
    const apiData = await axios.get(`${baseUrl}/${url}`);
    return apiData.data;
  } catch (error) {
    // TODO create alert message for user
    console.log('ERROR Unable to fetch data');
    return error;
  }
};
