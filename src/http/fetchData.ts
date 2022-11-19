import axios from 'axios';

export type Response = {
  total: number;
  GPT3ADA: number;
  SupportVectorMachine: number;
  NaiveBayes:number;
};

export type GetResponse = {
  data: Response[];
};

export async function detectFile(content: string) {
  try {
    // 👇️ const data: GetResponse
    const { data, status } = await axios.post<GetResponse>(
      'http://localhost:8888/api/v1/upload',
      content, //change it to upload files 
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

export default detectFile;
