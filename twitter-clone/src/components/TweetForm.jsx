import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React from "react";

import { BiUserCircle } from "react-icons/bi";

import { BsCardImage } from "react-icons/bs";

import { db, storage } from "../firebase/config";

import { auth } from "../firebase/config";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const TweetForm = () => {
  const tweetCol = collection(db, "tweets");

  const uploadImage = async (image) => {
    if (!image) return null;

    const storageRef = ref(storage, `${new Date().getTime()}${image.name}`);

    const url = await uploadBytes(storageRef, image).then((response) =>
      getDownloadURL(response.ref)
    );

    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];

    const url = await uploadImage(imageContent);

    addDoc(tweetCol, {
      textContent,
      imageContent: url,
      createdAt: serverTimestamp(),
      user: {
        id: auth.currentUser.uid,
        name: "esma",
        picture: "url",
      },
      likes: [],
    });

    e.target[0].value = "";
    e.target[1].value = null;
  };

  return (
    <form
      className="flex gap-3 p-4 border-b-2 border-gray-900"
      onSubmit={handleSubmit}
    >
      <BiUserCircle
        style={{ fontSize: "40px" }}
        className="rounded-full w-14"
      />
      <div className="w-full">
        <input
          type="text"
          className="w-full text-gray-400 outline-none bg-black place placeholder:text-lg"
          placeholder="Neler oluyor?"
        />
        <div className="flex justify-between">
          <div className="hover:bg-gray-400 p-4 cursor-pointer rounded-full">
            <label htmlFor="file-inp">
              <BsCardImage />
            </label>
            <input type="file" id="file-inp" className="hidden" />
          </div>

          <button className="bg-blue-600 px-4 rounded-full transition hover:bg-blue-400">
            Tweetle
          </button>
        </div>
      </div>
    </form>
  );
};

export default TweetForm;
