import { Thumbnail } from "@/types/thumbnail";
import { FC } from "react";
import Image from "./Image";

const Collection: FC<{ thumbnails: Thumbnail[] }> = ({ thumbnails }) => {
  return (
    <div>
      {
         thumbnails.map((thumbnail, index) => <Image key={index} url={thumbnail.url}/>)
      }
    </div>
  )
}

export default Collection;
