
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import * as FirebaseConstants from '../constants/Firebase';


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Upload() {
  const classes = useStyles();
  const [selectedFileData, setSelectedFileData] = useState(null);
  const [selectedFile, setSelectedFile] = useState("No file selected");
  var db = firebase.firestore();

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0].name);

    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], "UTF-8");
    fileReader.onload = e => {
      setSelectedFileData(JSON.parse(e.target.result));
    };
  };

  const onClickUpload = () => {
    if (selectedFileData == null) {
      alert("No file selected for upload!");
      return;
    }
    
    var re = /(\.json)$/i;
    if (!re.exec(selectedFile)) {
      alert("Selected file is not a JSON file!");
      return;
    }

    if (window.confirm("Upload the file?")) {
      firestoreUploadHandler();
    }
  }

  const firestoreUploadHandler = () => {
    var batch = db.batch();
    for (var key in selectedFileData) {
      var element = selectedFileData[key][0];
  
      var docRef = db.collection(FirebaseConstants.INVENTORY_COLLECTION).doc(key);

      var entry = {};
      for (var field in FirebaseConstants.INVENTORY_COLLECTION_DOCUMENT_FIELDS) {
        if (element[field]) {
          entry[field] = element[field];
        }
      }

      batch.set(docRef, entry, {merge: true});
    }
    batch.commit().then(() => {
      // console.log("Uploaded to firestore!");
      alert("Upload successful!")
    })
  };

  return (
    <div className={classes.margin}>
      <h2>Upload from json file</h2>
      <div>
        <Button variant="contained"
          component="label"
          color="primary"
        >
          Select File
          <input type="file"
            hidden
            onChange={onFileChange}
          />
        </Button>
        <span> - {selectedFile}</span>
        <br/><br/>
        <Button variant="contained" color="primary" onClick={onClickUpload}>Upload</Button>
      </div>
    </div>
  );
}