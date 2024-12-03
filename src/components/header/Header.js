import React, {useRef} from "react";
import styles from "../header/header.module.css";

const Header = () => {
   const containerRef = useRef(null);
  let navItems = [
    { title: "Your Stories", path: "stories" },
    { title: "How does it work", path: "about" },
  ];


  const handleLinkClick = (path) => (event) => {
    event.preventDefault();
    
    const section = document.getElementById(path);
    if (section) {
      console.log(section);
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.header} ref={containerRef}>
      <div className={styles.headerContainer}>
        <div className={styles.nav}>
          {navItems.map((item, index) => (
            // Use item.path to dynamically set the href attribute
            <a
              key={index}
              href={`#${item.path}`}
              className={styles.navLink}
              onClick={handleLinkClick(item.path)}
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
