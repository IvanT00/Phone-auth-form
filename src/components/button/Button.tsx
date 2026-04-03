import classes from './Button.module.scss';

interface ButtonProps {
    children?: string,
    onClick: () => void,
}

const Button = ({children, onClick}: ButtonProps) => {

    return (
        <button onClick={onClick} className={classes.button}>{children}</button>
    );
};

export default Button;