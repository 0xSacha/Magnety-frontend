type FakeImageProp = {
  width?: string;
  height?: string;
  fillColor?: string;
  maxWidth?: string;
  maxHeight?: string;
  borderRadius?: string;
};

const FakeImage = (props: FakeImageProp) => {
  return (
    <div
      style={{
        width: props.width ?? "auto",
        height: props.height ?? "auto",
        backgroundColor: props.fillColor ?? "transparent",
        maxWidth: props.maxWidth ?? "100%",
        maxHeight: props.maxHeight ?? "100%",
        borderRadius: props.borderRadius ?? "0",
      }}
    ></div>
  );
};

export default FakeImage;
