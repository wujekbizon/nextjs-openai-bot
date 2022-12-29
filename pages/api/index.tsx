import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import Cors from 'cors';
import runMiddleware from '../../helpers/middleware';

// Initializing the cors middleware
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Run the middleware
  await runMiddleware(req, res, cors);

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ message: 'OK' });
  }

  if (req.method === 'GET') {
    res.status(200).json({ message: 'This is Jarvis AI' });
  }

  if (req.method === 'POST') {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    try {
      const { prompt } = req.body;

      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 0,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });

      res.status(200).json({
        bot: response.data.choices[0].text,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        console.log(error);
      }
    }
  }
};
export default handler;
