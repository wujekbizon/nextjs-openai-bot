import Chat from '../components/Chat';
import Head from 'next/head';

const ChatPage = () => {
  return (
    <>
      <Head>
        <title>Jarvis GPT 3 Chat Bot</title>
        <meta name="description" content="Real Time GPT 3 Chat Bot" />
      </Head>
      <Chat />
    </>
  );
};
export default ChatPage;
