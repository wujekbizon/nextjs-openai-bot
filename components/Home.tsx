import styles from './Home.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
  return (
    <main className={styles.home}>
      <section className={styles.wrapper}>
        <h1 className={styles.gradient__text}> the new Era of AI</h1>
        <Image src="/ai.png" alt="ai" width={700} height={700} priority />
        <button>
          <Link href="/chat">OpenAI Jarvis</Link>
        </button>
      </section>
    </main>
  );
};
export default Home;
