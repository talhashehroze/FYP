import React from "react";
import _ from "lodash";
import { faker } from "@faker-js/faker";

const RecentAndPopTweetTable = ({data,count,txt}) =>{
  console.log("data");
  console.log(count);
  return(
  
  <React.Fragment>
    {_.times(6, (index) => (
      <tr key={index}>
        <td className="align-middle">
          <span className="text-inverse">{data[index]}</span>
        </td>
        <td className="align-middle">{count[index]}</td>
        <td className="align-middle text-nowrap">{txt[index]?.substring(0, 25)}</td>
      </tr>
    ))}
  </React.Fragment>
);
    }
export { RecentAndPopTweetTable };