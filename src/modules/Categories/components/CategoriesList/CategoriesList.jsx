import React from "react";
import Header from "../../../Shared/components/Header/Header";
import imgUrl from "../../../../assets/Imges/Recipes-header.png";

export default function CategoriesList() {
  return (
    <>
      <Header
        title={"Categories Item"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={imgUrl}
      />
      <div>CategoriesList</div>
    </>
  );
}
