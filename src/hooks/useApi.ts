import axios from 'axios';
import { useEffect, useState } from 'react';

const useApi = (url: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const baseUrl = 'https://api.mpg.football/api/data';

  const fetchApi = async () => {
    try {
      const apiData = await axios.get(`${baseUrl}/${url}`).then((response) => {
        return response.data;
      });

      setData(apiData);
      setIsLoading(false);
    } catch (error) {
      // TODO create alert message for user
      console.log('ERROR Unable to fetch data');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return { isLoading, data };
};

export default useApi;
