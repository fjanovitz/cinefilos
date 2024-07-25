import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import UserReviewList from "../../components/UserReviewList/UserReviewList";
import HeaderUserProfile from "../../components/HeaderUserProfile/HeaderUserProfile";
import api from "/src/services/api";
import { Link, useParams } from "react-router-dom"; 
import WatchListBody from "../../components/WatchListBody";
import UserPostList from "../../components/UserPostList";

const UserProfilePage = () => {
  const { username } = useParams();
  const [selectedTab, setSelectedTab] = useState('Reviews'); 

  return (
    <div>
      <HeaderUserProfile onTabChange={setSelectedTab}/>
      <div className={styles.reviewsSection}>
        {selectedTab === 'Reviews' && <UserReviewList username={username} />}
        {selectedTab === 'Posts' && <UserPostList username={username} />}
        {selectedTab === 'WatchList' && 
          <div className={styles.watchListSection}>
            <WatchListBody />
          </div>
        }
      </div>
    </div>
  );
};
export default UserProfilePage;
