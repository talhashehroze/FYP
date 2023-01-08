import React from "react";
import _ from "lodash";
import { faker } from "@faker-js/faker";

const TrTableRecentFundings = (props) => {
  console.log("trtable 1", props.data?.Text);
  return (
    <React.Fragment>
      <tr>
        <td className="align-middle">
          <span className="text-inverse"> Text </span>
        </td>
        <td className="align-middle">{props.data?.Text}</td>
        {/* <td className="align-middle text-nowrap">20-02-2015</td> */}
      </tr>
      <tr>
        <td className="align-middle">
          <span className="text-inverse">Hashtag</span>
        </td>
        <td className="align-middle">{props.data?.Hashtags}</td>
      </tr>
      <tr>
        <td className="align-middle">
          <span className="text-inverse">Reply Count</span>
        </td>
        <td className="align-middle">{props.data?.ReplyCount}</td>
      </tr>
      <tr>
        <td className="align-middle">
          <span className="text-inverse"> Retweet Count </span>
        </td>
        <td className="align-middle">{props.data?.RetweetCount}</td>
      </tr>
      <tr>
        <td className="align-middle">
          <span className="text-inverse">Likes Count</span>
        </td>
        <td className="align-middle">{props.data?.LikeCount}</td>
      </tr>
      <tr>
        <td className="align-middle">
          <span className="text-inverse">Device Used</span>
        </td>
        <td className="align-middle">{props.data?.Source}</td>
      </tr>
    </React.Fragment>
  );
};

export { TrTableRecentFundings };
