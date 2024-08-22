const Button = ({title, width, height, borderRadius, background, color}) => {
    const buttonStyle = {
        width: width,
        height: height,
        color: color,
        background: background ,
        border: 'none',
        borderRadius: borderRadius,
        fontWeight: 500,
    }
    return(
        <button style={buttonStyle}> {title} </button>
    )
    
}

export default Button;

