import React from 'react'

const PersonForm = (props) => {
    return (
        <form>
            <div>
                name: <input value={props.nameValue} onChange={props.nameChangeHandler} />
            </div>
            <div>
                number: <input value={props.numberValue} onChange={props.numberChangeHandler} />
            </div>
            <div>
                <button type="submit" onClick={props.clickHandler}>add</button>
            </div>
        </form>
    )
}

export default PersonForm