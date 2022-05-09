import React, { useState } from "react";
import { dbService } from "fbase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

const Nweet = ({ nweetObj, isOwn }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want delete this nweet?");

    console.log(ok);
    if (ok) {
      await deleteDoc(NweetTextRef);
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(nweetObj, newNweet);
    await updateDoc(NweetTextRef, { text: newNweet });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          {isOwn && (
            <>
              <from onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="edit your nweet"
                  value={newNweet}
                  required
                  onChange={onChange}
                />

                <input type="submit" value="Update Nweet" />
              </from>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.getDownloadfile && (
            <img
              src={nweetObj.getDownloadfile}
              alt="my_photo"
              width="50px"
              height="50px"
            />
          )}
          {isOwn && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Nweet;
