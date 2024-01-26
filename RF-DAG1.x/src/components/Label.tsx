

const Label = (props) => {
    return (
        <span>
            {
                props.isShowInput ? (
                    <input
                        type='text'
                        value={props.value}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        autoFocus
                    />
                ) : (
                    <span
                        onDoubleClick={props.handleDoubleClick}
                        style={{
                            display: 'inline-block',
                            height:  '25px',
                            minWidth: '100px'
                        }}
                    >
                        {props.value}
                    </span>
                )
            }
        </span>
    );
}

export default Label;