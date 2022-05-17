import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { getDownloadURL } from "firebase/storage";
import { ref, uploadString } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
const NweetFactory = ({ userObj }) => {
  const [filestr, setFilestr] = useState("");
  const [nweet, setNweet] = useState("");
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
          <img src={filestr} alt="imgsource" width="50px" height="50px" />
          <button onClick={onClearfilestr}>Clear</button>
        </div>
      )}
    </form>
  );
};
export default NweetFactory;
