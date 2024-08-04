import React from "react";
import Header from "../../../Shared/components/Header/Header";
import imgUrl from "../../../../assets/Imges/Rectangle.png";

export default function Home() {
  return (
    <>
      <Header
        title={"Welcome Upskilling !"}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
        imgUrl={imgUrl}
      />
      <div>Home</div>
    </>
  );
}
