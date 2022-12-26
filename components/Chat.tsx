import styles from './Chat.module.css';
import InputForm from './InputForm';
import { useRef, useEffect, useCallback } from 'react';
import { generateUniqueId, chatStripe, typeText } from '../helpers';

let loadInterval: NodeJS.Timer;

function loader(element: HTMLElement) {
  element.textContent = '';

  loadInterval = setInterval(() => {
    // Update the text content of the loading indicator
    element.textContent += '.';

    // If the loading indicator has reached three dots, reset it
    if (element.textContent === '....') {
      element.textContent = '';
    }
  }, 300);
}

const Chat = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const chatContainerRef = useRef<HTMLElement | null>(null);

  const keyPressHandler = (e: any) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    formRef.current?.addEventListener('keydown', keyPressHandler);

    return () => {
      formRef.current?.addEventListener('keydown', keyPressHandler);
    };
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();

      if (!formRef.current) {
        return;
      }

      const data = new FormData(formRef.current);

      if (!chatContainerRef.current) {
        return;
      }
      // user's chatstripe
      chatContainerRef.current.innerHTML += chatStripe(
        false,
        data.get('prompt'),
        ''
      );

      // to clear the textarea input
      formRef.current?.reset();

      // bot's chatstripe
      const uniqueId = generateUniqueId();
      chatContainerRef.current.innerHTML += chatStripe(true, ' ', uniqueId);

      // to focus scroll to the bottom
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;

      // specific message div
      const messageDiv = document.getElementById(uniqueId);

      if (!messageDiv) {
        return;
      }
      // messageDiv.innerHTML = '...';
      loader(messageDiv);

      const response = await fetch('https://wolfai-chat-bot.vercel.app/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: data.get('prompt'),
        }),
      });

      clearInterval(loadInterval);
      messageDiv.innerHTML = ' ';

      if (response.ok) {
        const data = await response.json();
        const parsedData = data.bot.trim(); // trims any trailing spaces/'\n'

        typeText(messageDiv, parsedData);
      } else {
        const err = await response.text();

        messageDiv.innerHTML = 'Something went wrong';
        console.log(err);
      }
    },
    []
  );

  return (
    <>
      <section
        className={styles.chat_container}
        ref={chatContainerRef}
      ></section>
      <InputForm formRef={formRef} onHandleSubmit={handleSubmit} />
    </>
  );
};
export default Chat;
