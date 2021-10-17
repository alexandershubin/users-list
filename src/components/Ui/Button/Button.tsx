const Button = (props: any) => {
    const {handleClick, children, className, dataAttr, type, disabled} = props;
    return (
        <button className={className} disabled={disabled} type={type} data-filter={dataAttr} onClick={handleClick}>
            {children}
        </button>
    );
};

export default Button;
