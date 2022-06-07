import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
const Nweet = ({ nweetObj, isOwn }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want delete this nweet?");

    console.log(ok);
    if (ok) {
      await deleteDoc(NweetTextRef);
      const deleteFile = ref(storageService, nweetObj.getDownloadfile);
      await deleteObject(deleteFile);
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
    <div className="nweet">
      {editing ? (
        <>
          {isOwn && (
            <>
              <from onSubmit={onSubmit} className="nweetEdit">
                <input
                  type="text"
                  placeholder="edit your nweet"
                  value={newNweet}
                  required
                  onChange={onChange}
                />

                <input type="submit" value="Update Nweet" className="formBtn" />
              </from>
              <button onClick={toggleEditing} className="formBtn">
                Cancel
              </button>
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
            <div className="Nweet_Btn">
              <button className="Nweet_Delete" onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button className="Nweet_Edit" onClick={toggleEditing}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Nweet;
