import { useState } from "react";
import { createGIF } from 'gifshot';
export default function PrivatePage(props) {
  const [image, setImage] = useState([]);
  const [progress, setProgress] = useState(0);
  const [createObjectURL, setCreateObjectURL] = useState([]);

  const uploadToClient = (event) => {
    if (event.target.files) {
      for(let file of event.target.files){
        setImage(image.push(file));
        setCreateObjectURL(arr => [...arr,URL.createObjectURL(file)]);
      }
    }
  };
  const createGif = (event) => {
    const images = createObjectURL
    const options = {
      images: images,
      gifWidth: 500,
      gifHeight: 300,
      numWorkers: 5,
      frameDuration: 0.01,
      sampleInterval: 10,
      progressCallback: e => setProgress(parseInt(e * 100))
    };

    createGIF(options, obj => {
      if (!obj.error) {
        const link = document.createElement('a');
        link.download = 'result.gif';
        link.href = obj.image;
        link.click();
        setProgress(0);
      }
    });
  }  

  return (
    <div>
      <div>
        <h4>Select Image</h4>
        <input type="file" name="myImage" multiple onChange={uploadToClient} />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={createGif}
        >
          Create Gif
        </button>
      </div>
    </div>
  );
}