import React from "react";
import Button from "react-bootstrap/Button";
import { BiPlay } from "react-icons/bi";
import Table from "react-bootstrap/Table";

const Home = () => {
  return (
    <div
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //   }}
    >
      <div
        style={{
          background: "darkgray",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <h1 style={{ color: "white", padding: 10 }}>The Generics</h1>
        <Button variant="info">Get Our Latest Album</Button>
        <Button variant="info" style={{ borderRadius: "50%", margin: 10 }}>
          <BiPlay />
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <h1>Tours</h1>
        <Table borderless style={{ width: "80%", padding: 10, margin: 10 }}>
          <tbody>
            <tr>
              <td>JUL16</td>
              <td>DETROIT, MI</td>
              <td>DTE ENERGY MUSIC THEATRE</td>
              <td>
                <Button variant="info">Buy Tickets</Button>
              </td>
            </tr>
            <tr>
              <td>JUL19</td>
              <td>TORONTO,ON</td>
              <td>BUDWEISER STAGE</td>
              <td>
                <Button variant="info">Buy Tickets</Button>
              </td>
            </tr>
            <tr>
              <td>JUL22</td>
              <td>BRISTOW, VA</td>
              <td>JIGGY LUBE LIVE</td>
              <td>
                <Button variant="info">Buy Tickets</Button>{" "}
              </td>
            </tr>
            <tr>
              <td>JUL29</td>
              <td>PHOENIX, AZ</td>
              <td>AK-CHIN PAVILION</td>
              <td>
                {" "}
                <Button variant="info">Buy Tickets</Button>{" "}
              </td>
            </tr>
            <tr>
              <td>AUG 2</td>
              <td>LAS VEGAS, NV</td>
              <td>T-MOBILE ARENA</td>
              <td>
                {" "}
                <Button variant="info">Buy Tickets</Button>
              </td>
            </tr>
            <tr>
              <td>AUG 7</td>
              <td>CONCORD, CA</td>
              <td>CONCORD PAVILION</td>
              <td>
                <Button variant="info">Buy Tickets</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
