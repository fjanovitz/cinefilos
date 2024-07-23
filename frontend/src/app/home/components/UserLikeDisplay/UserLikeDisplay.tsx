import React from 'react';
import {Link} from "react-router-dom";

interface UserLikeDisplayProps {
    username: string;
}

const UserLikeDisplay: React.FC<UserLikeDisplayProps> = ({username}) => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            height: '40px',
            padding: '35px',
            backgroundColor: '#fff',
            fontSize: '20px'
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