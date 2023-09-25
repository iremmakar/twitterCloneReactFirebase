import React, { useEffect, useState } from "react";
import TweetForm from "./TweetForm";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { db } from "../firebase/config";
import Post from "./Post";

const Main = () => {
  const tweetsCol = collection(db, "tweets");

  const [tweets, setTweets] = useState(null);

  useEffect(() => {
    const queryOptions = query(tweetsCol, orderBy("createdAt", "desc"));

    onSnapshot(queryOptions, (snapshot) => {
      const liveTweets = [];
      snapshot.forEach((doc) => liveTweets.push({ ...doc.data(), id: doc.id }));
      setTweets(liveTweets);
    });
  }, []);

  return (
    <div className="col-span-4 md:col-span-3 border border-gray-800">
      <header className="font-bold p-4 border border-gray-700">Anasayfa</header>
      <TweetForm />

      {!tweets && (
        <div className="text-center mt-[200px]">
          {" "}
          <p>Loading ...</p>
        </div>
      )}

      {tweets && tweets.map((tweet) => <Post tweet={tweet} />)}
    </div>
  );
};

export default Main;
