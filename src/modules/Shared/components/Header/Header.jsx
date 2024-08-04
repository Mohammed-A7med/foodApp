import React from "react";

export default function Header({ title, description, imgUrl }) {
  return (
    <div className="container-fluid px-4">
      <div className="row rounded-4 bg-header text-white align-items-center">
        <div className="col-md-6">
          <div className="content w-75 mx-auto">
            <h2 className="py-2">{title}</h2>
            <p>{description}</p>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <div className="header-img">
            <img src={imgUrl} alt="header-img" />
          </div>
        </div>
      </div>
    </div>
  );
}
