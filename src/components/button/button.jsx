import { PropTypes } from "prop-types";

function Button({ title, icons }) {
  return <button>{title}{icons}</button>;
}

Button.propTypes = {
  title: PropTypes.string,
  icons: PropTypes.string,
};

export default Button;
