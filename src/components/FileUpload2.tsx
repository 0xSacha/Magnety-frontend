import { FormLabel, Input } from "@chakra-ui/react";
import { toDataUrl } from "~/utils/fileHelper";
import Image from "next/image";

type ImageUploadProps = {
    onUpload: (image: string)=> void
  }
  
const ImageUpload2 = (props: ImageUploadProps) => {
    function dropHandler(ev) {
      ev.preventDefault();
      let firstfile: File;
      if (ev.dataTransfer.items) {
        firstfile = ev.dataTransfer.items[0].getAsFile();
      } else {
        firstfile = ev.dataTransfer.files[0];
      }
      toDataUrl(firstfile).then((result) => {
        props.onUpload(result);
      });
    }
    function dragOverHandler(ev) {
      ev.preventDefault();
    }
    return (
      <>
        <FormLabel htmlFor="fileUpload" style={{ backgroundColor: '#FFFFFF30', color: 'white', height: '100%', width: '100%', position: 'relative', display: 'flex', borderRadius: '15px', padding: '15px'}} onDrop={dropHandler} onDragOver={dragOverHandler}>
          {/* Upload Image */}
          <Image src={"/cloud-upload-outline.svg"} layout='fill' objectFit='contain'/>
          <span style={{margin: 'auto', zIndex: 2}}>Upload Image Here</span>
        </FormLabel>
        <Input
          style={{ display: "none" }}
          id="fileUpload"
          name="fileUpload"
          type={"file"}
          multiple={false}
          onChange={(e) => {
            if (!e.target.files || e.target.files.length == 0) return;
            var file = e.target.files[0];
            toDataUrl(file).then((result) => {
              props.onUpload(result);
            });
          }}
        />
      </>
    );
  };
  
  export default ImageUpload2;