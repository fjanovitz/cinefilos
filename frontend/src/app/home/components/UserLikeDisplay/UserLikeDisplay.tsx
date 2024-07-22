import React from 'react';
import {Link} from "react-router-dom";

interface UserLikeDisplayProps {
    username: string;
}

const UserLikeDisplay: React.FC<UserLikeDisplayProps> = ({username}) => {
    return (
        <div style={{
            border: '1px solid black',
            padding: '10px',
            margin: '10px',
            borderRadius: '5px',
            backgroundColor: '#ccc'
        }}>
            <Link
                to={{
                    pathname: `/profile/${username}`,
                }}
                style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "bold",
                }}
            >
                {username}
            </Link>
        </div>
    );
};

export default UserLikeDisplay;