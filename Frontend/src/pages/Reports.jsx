import React, { useState } from "react";
import styles from "./Reports.module.css"; // Import CSS module
import ActiveIssue from "../components/ActiveIssue";
import Members from "../components/Members";
import Movies from "../components/Movies";
import NavBar from "../components/Navbar";
import OverdueReturns from "../components/OverdueReturns";
import Books from "../components/Books";

const Reports = ({ loginedUser }) => {
  const [activeComponent, setActiveComponent] = useState("Members");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Members":
        return <Members />;
      case "Books":
        return <Books />;
      case "Movies":
        return <Movies />;
      case "Active Issues":
        return <ActiveIssue />;
      case "Overdue Returns":
        return <OverdueReturns />;
      default:
        return <Members />;
    }
  };

  return (
    <>
      <NavBar loginedUser={loginedUser} />
      <div className={styles.container}>
        {/* Menu Section */}
        <ul className={styles.menu}>
          {["Members", "Books", "Movies", "Active Issues", "Overdue Returns"].map(
            (item) => (
              <li key={item} className={styles.menuItem}>
                <button
                  className={`${styles.menuButton} ${
                    activeComponent === item ? styles.active : ""
                  }`}
                  onClick={() => setActiveComponent(item)}
                >
                  {item}
                </button>
              </li>
            )
          )}
        </ul>

        {/* Content Section */}
        <div className={styles.content}>{renderComponent()}</div>
      </div>
    </>
  );
};

export default Reports;
