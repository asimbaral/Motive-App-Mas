import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import React, {useEffect} from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const MotivLogo  = require('../../assets/MotivLogo.png');
import Canvas, {Image as CanvasImage} from 'react-native-canvas';
import { get, update } from 'firebase/database';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from "expo-media-library";
// import MotivLogo from '../../assets/MotivLogo.png';
export default function Share(props) {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [loadCanvas, setLoadCanvas] = React.useState(true);

  const createImage = async (canvas) => {
    const ctx = canvas.getContext('2d');
    canvas.height = 600;
    ctx.fillStyle = 'white';
    // ctx.strokeStyle = "black";
    ctx.fillRect(0,0,300,600);
    let info = props.route.params;
    let updateInfo = props.route.params.timeline[props.route.params.timeline.length-1];
     
    ctx.fillStyle = '#008B8B';
    // ctx.strokeStyle = "black";
    // ctx.fillRect(0,0, 300, 120);
    let incre = 20;

    ctx.lineWidth = 5;
    ctx.fillRect(0,120, 300, 120);

    ctx.strokeRect(0, 0, 300, 600);
    
    ctx.fillStyle = 'black';
    ctx.textAlign = "center";
    ctx.font = "bold 20px Arial";

    ctx.fillText(info.currentGoal, 150, 50+incre);
    ctx.fillText("By: "+ info.deadline, 150, 85+incre);

    //, by 12/18

    // ctx.fillText("I want to run a 6:15 mile, by 12/18", 150, 50);
    
    ctx.font = "bold 30px Arial";
    ctx.fillStyle = 'white';

    ctx.fillText("NEW UPDATE: " + updateInfo.time, 150, 150+incre);
    // ctx.fillStyle = 'black';
    ctx.textAlign = "center";
    // ctx.font = "bold 15pt 'PT Sans'";
    ctx.font = "italic 25px Arial";
    ctx.fillText(updateInfo.title, 150, 200+incre);
    ctx.fillStyle = 'black';

    const imageUri = Image.resolveAssetSource(MotivLogo).uri;
    const imagee = new CanvasImage(canvas);
    imagee.src = imageUri;
    const desc = updateInfo.description.split(',');
    ctx.font = "20px Arial";
    ctx.fillText(desc[0] + ',', 150, 250+incre);
    ctx.fillText(desc[1], 150, 275+incre);
    
    ctx.font = "bold 50px Arial";
    ctx.fillStyle = '#008B8B';
    ctx.fillText("Motiv", 150, 400+incre);
    ctx.font = "bold 30px Arial";
    ctx.fillStyle = '#black';
    ctx.fillText("Join @MotivApp", 150, 450+incre);
    // 140, 400
    // ctx.fillText("I just ran a 6:31 mile, I am so close!", 150, 250);

    // ctx.fillText(typeof(MotivLogo), 150, 250);
    
    // loadImage("../../assets/MotivLogo.png").then((image) => {
      // });


      // context.drawImage(MotivLogo, 0, 0, 20, 20);
      



    const titleY = 150;
    const titleLineHeight = 100;
    // And the author's Y value.
    const authorY = 200;

    // context.font = "bold 10pt 'PT Sans'";
    // context.textAlign = "center";
    // context.fillStyle = "blue";
    
    // Canvas.prototype.getContext();

    // context.fillText(post.title, 150, titleY);
    // context.font = "7pt 'PT Sans'";
    // context.fillText(post.date, 150, authorY-25);
    // context.font = "7pt 'PT Sans'";
    // context.fillText("New Update", 150, authorY);
    // context.font = "7pt 'PT Sans'";
    // context.fillText(post.description, 150, authorY+25);
    // ctx.drawImage(imagee, 140, 400, 150, 70);
    // imagee.addEventListener('load', async () => {
    //   ctx.drawImage(imagee, 140, 400, 150, 70);
    // });
    // ctx.drawImage(imagee, 140, 400, 150, 70)
    if (loadCanvas) {
      
      let data = await canvas.toDataURL('image/png');
      console.log("*****************");
      console.log(props.route.params);

      console.log(canvas.height);
      await saveImage(data);
    }
    // await saveImage(data);
    setLoadCanvas(false);
  }
  // useEffect(() => {
  //   async function getImage() {
  //     console.log("In use effect*************");
  //     await createImage();
  //   }
  //   getImage();
    
  // }, [0]);

  const saveImage = async (uri) => {
    
    try {
      // Request device storage access permission
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
      // Save image to media library
  
    const base64Code = uri.split("data:image/png;base64,")[1];
    const filename = FileSystem.documentDirectory + "some_unique_file_name.png";
    await FileSystem.writeAsStringAsync(filename, base64Code, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const mediaResult = await MediaLibrary.saveToLibraryAsync(filename);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  const openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
        
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Image source={MotivLogo} style={styles.logo} /> */}
      {/* <Text style={styles.instructions}>
        To share a photo from your phone with a friend, just press the button below!
      </Text> */}
      <Canvas ref={createImage} style={styles.thumbnail}/>

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Load</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 271,
    height: 101,
    marginBottom: 30,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#26B1FF",
    height: 32,
    width: 180,
    padding: 0,
    borderRadius: 20,
    marginBottom: -100
  },
  buttonText: {
    fontSize: 24,
    alignItems: 'center',
    textAlign: 'center',
    // justifyContent: 'center',
    color: '#fff',
  },
  thumbnail: {
    width: 300,
    height: 600,
    resizeMode: 'contain',
    marginBottom: 10,
    marginTop: -100
  },
});