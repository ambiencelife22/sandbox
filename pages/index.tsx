"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import ManageContacts from "./screens/ManageContacts";
import Home from "./screens/Home";
import Trips from "./screens/Trips";
import Contacts from "./screens/Contacts";

const HomePage = () => {
  const [currentSection, setCurrentSection] = useState("home");

  const renderSection = () => {
    switch (currentSection) {
      case "home":
        return <Home />;
      case "contacts":
        return <ManageContacts />;

      case "trips":
        return <Trips />;
      case "connect":
        return <Contacts />;
      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <title>CTravelHotelsResorts</title>
        <meta name="description" content="Travel Contact Manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <header className="header">
          <nav className="navbar">
            <button
              onClick={() => setCurrentSection("home")}
              className="nav-button"
            >
              Home
            </button>
            <button
              onClick={() => setCurrentSection("contacts")}
              className="nav-button"
            >
              Manage Contacts
            </button>
            <button
              onClick={() => setCurrentSection("trips")}
              className="nav-button"
            >
              Plan Your Trips
            </button>
            <button
              onClick={() => setCurrentSection("connect")}
              className="nav-button"
            >
              Stay Connected
            </button>
          </nav>
        </header>

        <main className="main">{renderSection()}</main>

        <footer className="footer">
          <p>© 2024 CTravelHotelsResorts. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
