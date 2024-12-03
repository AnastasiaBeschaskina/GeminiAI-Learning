import React from "react";
import GenerateFairyTale from "./components/form/GenerateFairyTale";
import About from "./components/about/About";
import StoriesList from "./components/storiesList/StoriesList";
import styles from "../src/styles/app.module.css";
import Header from "../src/components/header/Header";
import Footer from "../src/components/footer/Footer";

const App = () => {
  return (
    <>
      <Header />
      <div className={styles.appContainer}>
        <div className={styles.section1}>
          <GenerateFairyTale />
        </div>
        <div className={styles.section2}>
          <About />
        </div>
        <div className={styles.section3}>
          <StoriesList />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
