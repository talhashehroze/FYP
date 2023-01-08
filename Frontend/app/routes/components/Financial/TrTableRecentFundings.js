import React from "react";
import _ from "lodash";
import { faker } from "@faker-js/faker";

const TrTableRecentFundings = (props) => {
  console.log("trtable 1", props.data); //..
  return (
    <React.Fragment>
      <tr>
        <td className="align-middle">
          <span className="text-inverse"> Text </span>
        </td>
        <td className="align-middle">$</td>
        {/* <td className="align-middle text-nowrap">20-02-2015</td> */}
      </tr>
      <tr>
        <td className="align-middle">
          <span className="text-inverse">Hashtag</span>
        </td>
        <td className="align-middle">$</td>
      </tr>
      <tr>
        <td className="align-middle">
          <span className="text-inverse">Reply Count</span>
        </td>
        <td className="align-middle">$</td>
      </tr>
      <tr>
        <td className="align-middle">
          <span className="text-inverse"> Retweet Count </span>
        </td>
        <td className="align-middle">$</td>
      </tr>
      <tr>
        <td className="align-middle">
          <span className="text-inverse">Likes Count</span>
        </td>
        <td className="align-middle">$</td>
      </tr>
      <tr>
        <td className="align-middle">
          <span className="text-inverse">Mentioned User</span>
        </td>
        <td className="align-middle">$</td>
      </tr>
    </React.Fragment>
  );
};

export { TrTableRecentFundings };
