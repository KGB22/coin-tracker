import PropTypes from "prop-types";

import styles from "./Button.module.css";

function Button({ text, reset }) {
  return (
    <button onClick={reset} className={styles.btn}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
