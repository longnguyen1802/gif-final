// import { useState } from "react";
// import { createGIF } from 'gifshot';
// import RangeSlider from "../components/slider/RangeSlider";
// import PBar from "../components/progressbar/ProgressBar";

// export default function PrivatePage(props) {

//   const [image, setImage] = useState([]);
//   const [progress, setProgress] = useState(0);
//   const [createObjectURL, setCreateObjectURL] = useState([]);
//   const [width,setWidth] = useState(0);
//   const [height,setHeight] = useState(0);
//   const [speed,setSpeed] = useState(1);
//   const uploadToClient = (event) => {
//     if (event.target.files) {
//       //
//       var reader = new FileReader();

//       //Read the contents of Image File.
//       reader.readAsDataURL(event.target.files[0]);
//       reader.onload = function (e) {

//         //Initiate the JavaScript Image object.
//         var image = new Image();

//         //Set the Base64 string return from FileReader as source.
//         image.src = e.target.result;

//         //Validate the File Height and Width.
//         image.onload = function () {
//           var height = this.height;
//           var width = this.width;
//           setWidth(width);
//           setHeight(height);
//         };
//       };
//       //
//       for(let file of event.target.files){
//         setImage(image.push(file));
//         setCreateObjectURL(arr => [...arr,URL.createObjectURL(file)]);
//       }
//     }
//   };
//   const createGif = (event) => {
//     const images = createObjectURL
//     const options = {
//       images: images,
//       gifWidth: width,
//       gifHeight: height,
//       numWorkers: 20,
//       interval: 0.1 + 0.05 * speed,
//       sampleInterval: 1,
//       numFrames: 1,
//       progressCallback: e => { 
//         //setProgress(parseInt(e * 100)) 
//         setProgress(parseInt(e * 100)) 
//       }
//     };

//      createGIF(options, async obj => {
//       if (!obj.error) {
//         const link = document.createElement('a');
//         link.href = obj.image;
//         //console.log(link);
//         link.download = 'result.gif';
//         link.href = obj.image;
//         link.click();
//         setProgress(0);
//       }
//     });
//   }  

//   return (
  //   <div>
  //     <div>
  //       <h4>Select Image</h4>
  //       <input type="file" name="myImage" multiple onChange={uploadToClient} />
        
  //       <RangeSlider
  //         initalValue={speed}
  //         setInitalValue={setSpeed}
  //         min={1}
  //         max={10}
  //         step={1}
  //         priceCap={1}
  //       />

  //       <button
  //         className="btn btn-primary"
  //         type="submit"
  //         onClick={createGif}
  //       >
  //         Create Gif
  //       </button>
  //       <label>Creating GIF... {progress}%</label>
  //     </div>
  //   </div>
  // );
// }
import React, { useState } from 'react';
import { createGIF } from 'gifshot';
import RangeSlider from "../components/slider/RangeSlider";
import {FadeLoader} from "react-spinners"

function App() {
  const [progress, setProgress] = useState(0);
  const [createObjectURL, setCreateObjectURL] = useState([]);
  const [width,setWidth] = useState(0);
  const [height,setHeight] = useState(0);
  const [speed,setSpeed] = useState(1);
  const [create,setCreate] = useState(false);
  const uploadToClient = async (event) => {
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
        setCreateObjectURL(arr => [...arr,URL.createObjectURL(file)]);
      }
    }
    
  };
  const createGif = async () => {
    if(width > 0 && height>0) 
    {
    setCreate(true);
    const options = {
      images: createObjectURL,
      gifWidth: width,
      gifHeight: height,
      numWorkers: 3,
      interval: 0.1 + 0.05 * speed,
      sampleInterval: 1,
      numFrames: 1,
      progressCallback:  e => { 
        setProgress(parseInt(e * 100)) 
      }
    };
 
   createGIF(options, async obj => {
      if (!obj.error) {
        const link = document.createElement('a');
        link.download = 'result.gif';
        link.href = obj.image;
        link.click();
        setProgress(0);
        setCreate(false);
      }
    });
  }
  }
 
  return (
    <div className="App">
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
      {create ? 
        <div>
          In process create gif <FadeLoader/>
        </div> 
      : <label></label>}
    </div>
  );
}
 
export default App;