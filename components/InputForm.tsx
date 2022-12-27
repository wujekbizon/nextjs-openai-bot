import styles from './InputForm.module.css';
import Image from 'next/image';
import Link from 'next/link';

type InputFormProps = {
  onHandleSubmit: React.FormEventHandler<HTMLFormElement>;
  formRef: React.MutableRefObject<HTMLFormElement | null>;
};

const InputForm = ({ onHandleSubmit, formRef }: InputFormProps) => {
  return (
    <form className={styles.form} onSubmit={onHandleSubmit} ref={formRef}>
      <button>
        <Link href="/">
          <Image src="/backarrow.svg" alt="back" width={25} height={25} />
        </Link>
      </button>
      <textarea
        name="prompt"
        cols={1}
        rows={1}
        placeholder="Ask Jarvis..."
      ></textarea>
      <button className={styles.send}>
        <Image src="/send.svg" alt="send" width={30} height={30} />
      </button>
    </form>
  );
};
export default InputForm;
