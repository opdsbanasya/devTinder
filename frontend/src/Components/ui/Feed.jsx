import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { addFeedData } from "@/store/userFeedSlice";
import FeedCard from "./FeedCard";

const Feed = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [userIndex, setUserIndex] = useState(0);


  const getUserFeed = async () => {
    try {
      const feedData = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeedData(feedData?.data?.usersForFeed));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserFeed();
  }, []);

  return (
    <div className="w-11/12 xl:w-full h-full bg-transparent flex items-center justify-center relative flex-wrap py-2 xl:py-12">
      {feed && feed.length > userIndex ? (
        <FeedCard
          user={feed[userIndex]}
          handleUser={setUserIndex}
          index={userIndex}
          key={user?._id}
        />
      ) : (
        <h3>No user</h3>
      )}
    </div>
  );
};

export default Feed;
