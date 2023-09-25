import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";

import { BsCardImage, BsThreeDots } from "react-icons/bs";

import { FaRetweet } from "react-icons/fa";

import { FiShare2 } from "react-icons/fi";

import { BiUserCircle } from "react-icons/bi";

import { arrayUnion, doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/config";

import { auth } from "../firebase/config";
import { FcLike } from "react-icons/fc";

import moment from "moment/moment";
import "moment/locale/tr";

const Post = ({ tweet }) => {
  const [isLiked, setIsLiked] = useState(false);

  const date = tweet.createdAt?.toDate();

  useEffect(() => {
    const found = tweet.likes.find((userId) => userId === auth.currentUser.uid);

    setIsLiked(found);
  }, [tweet]);

  const handleLike = () => {
    const tweetRef = doc(db, "tweets", tweet.id);

    updateDoc(tweetRef, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };

  return (
    <div className="flex gap-3 border-b-[0.5px] p-3 border-gray-600 space">
      <div className="rounded-full bg-blue-400 w-[70px] h-14 text-center items-center flex justify-center font-size-2">
        <h1 style={{ fontSize: "30px" }}>{tweet.user.name[0]}</h1>
      </div>

      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <p>{tweet.user.name}</p>
            <p className="text-gray-400">@{tweet.user.name.toLowerCase()}</p>
            <p className="text-gray-400">{moment(date).fromNow()}</p>
          </div>
          <div>
            <BsThreeDots />
          </div>
        </div>
        <div>
          <p>{tweet.textContent}</p>

          {tweet.imageContent && <img src={tweet.imageContent} />}
        </div>
        <div className="flex justify-between">
          <div className="p-2 rounded-full transition cursor-pointer hover:bg-gray-700">
            <BiMessageRounded />
          </div>
          <div
            className="p-2 rounded-full transition cursor-pointer hover:bg-gray-700 flex items-center gap-3"
            onClick={handleLike}
          >
            {isLiked ? <FcLike /> : <AiOutlineHeart />}
            <span>{tweet.likes.length}</span>
          </div>
          <div className="p-2 rounded-full transition cursor-pointer hover:bg-gray-700">
            <FaRetweet />
          </div>
          <div className="p-2 rounded-full transition cursor-pointer hover:bg-gray-700">
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
