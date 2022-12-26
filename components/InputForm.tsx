import styles from './InputForm.module.css';
import Image from 'next/image';

type Props = {
  onHandleSubmit: React.FormEventHandler<HTMLFormElement>;
  formRef: React.MutableRefObject<HTMLFormElement | null>;
};

const InputForm = ({ onHandleSubmit, formRef }: Props) => {
  return (
    <form className={styles.form} onSubmit={onHandleSubmit} ref={formRef}>
      <textarea
        name="prompt"
        cols={1}
        rows={1}
        placeholder="Ask Codex..."
      ></textarea>
      <button>
        <Image src="/send.svg" alt="send" width={30} height={30} />
      </button>
    </form>
  );
};
export default InputForm;
