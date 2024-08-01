import { FC } from "react";

const Image: FC<{ url: string }> = ({ url }) => {
  return (
    <div>
      <img src={url} alt="thumbnail" />    
    </div>
  )
}

export default Image;
