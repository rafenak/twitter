import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDisptach, RootState } from "../../../../redux/Store";
import { fetchGifsByTerm } from "../../../../redux/Slices/GifSlice";
import { PostImage } from "../../../../utils/GlobalInterfaces";
import { updateCurrentPost } from "../../../../redux/Slices/PostSlice";
import { updateDisplayGif } from "../../../../redux/Slices/ModalSlice";

interface FeedPostFrozenGifProps {
  image: string;
  text: string;
}

export const FeedPostFrozenGif: React.FC<FeedPostFrozenGifProps> = ({
  image,
  text,
}) => {
  const perview = useSelector((state: RootState) => state.gif.perview);
  const dispatch: AppDisptach = useDispatch();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const freezeGif = () => {
    if (canvasRef && canvasRef.current && imageRef.current && imageRef) {
      let width;
      let height;

      if (perview) {
        width = 290;
        height = 150;
      } else {
        width = 143;
        height = 135;
      }

      canvasRef.current.width = width;
      canvasRef.current.height = height;
      const ctx = canvasRef.current.getContext("2d");

      if (ctx != null && perview) {
        ctx.font = "bold 32px Arial";
        ctx.textAlign = "left";
        ctx.fillStyle = "white";
        ctx.drawImage(imageRef.current, 0, 0, width, height);
        ctx.fillText(text, 12, 138);
      }

      if (ctx != null && !perview) {
        ctx.drawImage(imageRef.current, 0, 0, width, height);
      }
    }
  };

  const handleCanvasClicked = () => {
    //pending to hanlde the logic
    if (perview) {
      dispatch(fetchGifsByTerm(text));
    } else {
      let postImage: PostImage = {
        imageId: 0,
        imageName: `${text}-gif`,
        imageType: "gif",
        imageURL: image,
      };
      let imgs = [postImage];
      dispatch(
        updateCurrentPost({
          name: "images",
          value: imgs,
        })
      );
      dispatch(updateDisplayGif());
    }
  };

  return (
    <>
      <img src={image} ref={imageRef} onLoad={freezeGif} alt={image} hidden />
      <canvas ref={canvasRef} onClick={handleCanvasClicked}></canvas>
    </>
  );
};
