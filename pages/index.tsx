import Home from '../components/Home';
import Head from 'next/head';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Welcome in The New Era Of AI</title>
        <meta
          name="description"
          content="With An Elegant User Interface, Communication With Advanced GPT3 Model API, And Most Importantly, The Ability To Ask The AI For Help Regarding JavaScript, React, Or Any Other Programming Language, Giving It Code And Translating It To Another Programming Language, And Much More.. This Is Jarvis Chat Bot."
        />
      </Head>
      <Home />
    </>
  );
};
export default HomePage;
