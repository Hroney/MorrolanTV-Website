import { Outlet } from "react-router-dom";
import { NavBar } from "../navbar/Navbar";
import React from "react";
import "./layout.css"

export class Layout extends React.Component {
  render = () => (
    <div className="layout component">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}