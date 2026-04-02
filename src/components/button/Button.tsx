import classes from './Button.module.scss';

interface ButtonProps {
    children?: string;
}

const Button = ({children}: ButtonProps) => {
    return (
        <button className={classes.button}>{children}</button>
    );
};

export default Button;