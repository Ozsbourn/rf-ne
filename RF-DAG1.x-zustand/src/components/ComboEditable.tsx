


const ComboEditable = (props: any) => {
    return (
        <span className="comboeditable">
            {
                props.isShowInput ? (
                    <select
                        className="select"
                        value={props.value}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        autoFocus
                    >
                        <option value="">Choose type</option>
                        <option value="person">Person</option>
                        <option value="soft-sys">Software system</option>
                        <option value="container">Container</option>
                        <option value="component">Component</option>
                    </select>
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

export default ComboEditable;