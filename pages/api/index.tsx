import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import Cors from 'cors';

// Initializing the cors middleware
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Run the middleware
  await runMiddleware(req, res, cors);

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
  if (req.method === 'GET') {
    res.status(200).json({ message: 'This is Codex AI' });
  }

  if (req.method === 'OPTIONS') {
    return res.status(200).send('ok');
  }
};
export default handler;
