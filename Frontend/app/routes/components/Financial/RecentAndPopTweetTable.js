import React from "react";
import _ from "lodash";
import { faker } from "@faker-js/faker";

const RecentAndPopTweetTable = () => (
  <React.Fragment>
    {_.times(6, (index) => (
      <tr key={index}>
        <td className="align-middle">
          <span className="text-inverse">{faker.company.name()}</span>
        </td>
        <td className="align-middle">{faker.commerce.price()}</td>
        <td className="align-middle text-nowrap">20-02-2015</td>
      </tr>
    ))}
  </React.Fragment>
);

export { RecentAndPopTweetTable };