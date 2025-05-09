import axios from 'axios';

export async function goGet(endpoint: string) {
  const response = await axios.get(process.env.API_URI + `${endpoint}`);
  if (response.data.data) {
    const datas = {
      data: response.data.data,
    };
    return datas;
  }
}
