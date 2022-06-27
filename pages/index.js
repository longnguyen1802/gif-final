import { useState } from "react";
import { createGIF } from 'gifshot';
import RangeSlider from "../components/RangeSlider";

export default function PrivatePage(props) {
  const [image, setImage] = useState([]);
  const [progress, setProgress] = useState(0);
  const [createObjectURL, setCreateObjectURL] = useState([]);
  const [width,setWidth] = useState(0);
  const [height,setHeight] = useState(0);
  const [speed,setSpeed] = useState(1);
  const uploadToClient = (event) => {
    if (event.target.files) {
      //
      var reader = new FileReader();

      //Read the contents of Image File.
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function (e) {

        //Initiate the JavaScript Image object.
        var image = new Image();

        //Set the Base64 string return from FileReader as source.
        image.src = e.target.result;

        //Validate the File Height and Width.
        image.onload = function () {
          var height = this.height;
          var width = this.width;
          setWidth(width);
          setHeight(height);
        };
      };
      //
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
      gifWidth: width,
      gifHeight: height,
      numWorkers: 2,
      frameDuration: speed,
      sampleInterval: 10,
      numFrames: 10,
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
        
        <RangeSlider
          initalValue={speed}
          setInitalValue={setSpeed}
          min={1}
          max={10}
          step={1}
          priceCap={1}
        />

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