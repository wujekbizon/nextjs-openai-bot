import styles from './InputForm.module.css';

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
        <img src="/send.svg" />
      </button>
    </form>
  );
};
export default InputForm;
