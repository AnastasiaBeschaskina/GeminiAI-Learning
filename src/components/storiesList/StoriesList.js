import React, { useState } from "react";
import styles from "./storiesList.module.css";
import storiesData from "../../data/stories.json";
import FairyTale from "../fairyTale/FairyTale";

const StoriesList = () => {
  const [selectedStory, setSelectedStory] = useState(null);

  const handleSelectStory = (story) => {
    setSelectedStory(story); // Show the selected story
  };

  const handleCloseFairyTale = () => {
    setSelectedStory(null); 
  };

  const imageData = [
    { src: "/images/1book.png", alt: "book1" },
    { src: "/images/2.png", alt: "book2" },
    { src: "/images/3.png", alt: "book3" },
    { src: "/images/4.png", alt: "book4" },
    { src: "/images/5.png", alt: "book5" },
    { src: "/images/6.png", alt: "book6" },
  ];

  return (
    <div className={styles.storiesContainer} id="stories">
      {selectedStory ? (
        <FairyTale
          content={selectedStory.content} // Pass the story content
          loading={false} // Set loading to false as data is static
          onClose={handleCloseFairyTale} // Close the fairy tale
        />
      ) : (
        storiesData.map((story, index) => (
          <div
            key={story.story_id}
            className={styles.storyCard}
            onClick={() => handleSelectStory(story)}
          >
            <img
              className={styles.disabledImage}
              src={imageData[index % imageData.length].src}
              alt={imageData[index % imageData.length].alt}
            />
            <div className={styles.storyTitle}>{story.title}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default StoriesList;
