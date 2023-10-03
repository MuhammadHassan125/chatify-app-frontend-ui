import React from 'react'

const Message = ({ User, message, classs }) => {
    if (User) {
        return (
            <div className={`messageBox ${classs}`}  >
                {`${User}: ${message}`}
            </div>
        )
    }
    else {


        return (
            <div className={`messageBox ${classs}`}>
                {`You: ${message}`}
            </div>
        )
    }
}

export default Message
