import './button.scss';

const ButtonTypesClasses = {
  google: 'google-sign-in',
  inverted: 'inverted',
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button className={`button-container ${ButtonTypesClasses[buttonType] || ''}`} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
