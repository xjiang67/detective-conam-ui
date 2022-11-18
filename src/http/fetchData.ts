import axios from 'axios';

type Response = {
  total: number;
  model1: number;
  model2: number;
};

type GetResponse = {
  data: Response[];
};

export async function detectFile() {
  try {
    // 👇️ const data: GetResponse
    const { data, status } = await axios.post<GetResponse>(
      'http://localhost:8888/api/v1/upload',
      'ASDASDADS', //change it to upload files 
      {
        headers: {
          'Content-Type': 'text/plain',
          "Access-Control-Allow-Origin": "*",
        },
      },
    );

    console.log(JSON.stringify(data, null, 4));

    // 👇️ "response status is: 200"
    console.log('response status is: ', status);

    // change to switch UI

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

export default detectFile();
