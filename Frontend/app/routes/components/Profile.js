import React from "react";
import { faker } from "@faker-js/faker";

import { Avatar, AvatarAddOn } from "./../../components";

import { randomArray, randomAvatar } from "./../../utilities";

const Profile = (props) => {
  const avatar = [
    [
      <AvatarAddOn.Icon
        className="fa fa-circle"
        color="twitter"
        key="avatar-icon-bg"
      />,
      <AvatarAddOn.Icon
        className="fa fa-twitter"
        color="white"
        key="avatar-icon-fg"
        small
      />,
    ],
  ];
  return (
    <React.Fragment>
      <div className="d-flex justify-content-center my-3">
        <Avatar.Image
          size="lg"
          src={props.data.profileImageUrl}
          addOns={[
            <AvatarAddOn.Icon
              className="fa fa-circle"
              color="white"
              key="avatar-icon-white-bg"
            />,
            ...randomArray(avatar),
          ]}
        />
      </div>
      <div className="mb-4 text-center">
        <a className="h6 text-decoration-none" href="#">
          {props.data.displayname}
        </a>
        {/* <div className="text-center mt-2">{props.data.renderedDescription}</div> */}
        <div className="text-center">
          <i className="fa fa-map-marker mr-1"></i>
          {props.data.location}
        </div>
      </div>
    </React.Fragment>
  );
};

export { Profile };
