import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import { getDownloadURL } from "firebase/storage";
import Nweet from "components/Nweet";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadString } from "firebase/storage";
const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [filestr, setFilestr] = useState("");
  useEffect(() => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    let getDownloadfile = "";
    if (filestr !== "") {
      const fileRef = ref(storageService, `${userObj.uid} /${uuidv4()}`);
      const uploadfile = await uploadString(fileRef, filestr, "data_url");
      getDownloadfile = await getDownloadURL(uploadfile.ref);
    }
    const nweetObj = {
      text: nweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
      getDownloadfile,
    };
    await addDoc(collection(dbService, "nweets"), nweetObj);

    setNweet("");
    setFilestr("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setFilestr(result);
    };

    reader.readAsDataURL(theFile);
  };
  const onClearfilestr = () => {
    setFilestr(null);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="what's on your mind"
          maxLength={120}
        />
        <input type="file" accept="image/*" value="" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {filestr && (
          <div>
            <img src={filestr} width="50px" height="50px" />
            <button onClick={onClearfilestr}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwn={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
