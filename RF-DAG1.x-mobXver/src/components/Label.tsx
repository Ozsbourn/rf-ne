


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
                            minHeight: '25px',
                            height:  'fit-content',
                            minWidth: '10px',
                            width: 'fit-content',
                            maxWidth: '200px'
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