import axios from 'axios';
import { useEffect, useState } from 'react';

const useApi = (url: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);
  const baseUrl = 'https://api.mpg.football/api/data';

  const fetchApi = async () => {
    try {
      const apiData = await axios.get(`${baseUrl}/${url}`);
      setData(apiData.data);
      setIsLoading(false);
    } catch (error) {
      // TODO create alert message for user
      console.log('ERROR Unable to fetch data');
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchApi();
  }, []);

  return { isLoading, data, isError };
};

export default useApi;
