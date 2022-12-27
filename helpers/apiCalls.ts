import { typeText } from './helpers';

const fetchOpenAiApi = async (
  data: FormData,
  interval: NodeJS.Timer,
  element: HTMLElement
) => {
  const response = await fetch('https://wolfai-chat-bot.vercel.app/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: data.get('prompt'),
    }),
  });

  clearInterval(interval);
  element.innerHTML = ' ';

  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim(); // trims any trailing spaces/'\n'

    typeText(element, parsedData);
  } else {
    const err = await response.text();

    element.innerHTML = 'Something went wrong';
    console.log(err);
  }
  return response;
};

export default fetchOpenAiApi;
