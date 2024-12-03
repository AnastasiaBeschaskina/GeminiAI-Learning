import React, { useState, useEffect } from "react";
import { Spin, Flex, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { splitText } from "../../utils/textUtils";
import styles from "../fairyTale/fairyTale.module.css";
import { translateContent } from "../../geminiAPI";

const FairyTale = ({ content, loading, onClose, onUpdateContent }) => {
  const [firstHalf, setFirstHalf] = useState([]);
  const [secondHalf, setSecondHalf] = useState([]);
  const [translatedContent, setTranslatedContent] = useState(content);
  const [isTranslating, setIsTranslating] = useState(false);

  const handleLanguageChange = async (langCode) => {
    setIsTranslating(true);
    try {
      const translation = await translateContent(content, langCode);
      const translatedText = translation.data.translations[0].translatedText;
      if (!translatedText) {
        throw new Error("No translated text found in the response");
      }
      console.log("Translated Content:", translatedText);
      setTranslatedContent(translatedText);
      console.log("Translated Content:", translatedText);
    } catch (error) {
      console.error("Translation error:", error);
    } finally {
      setIsTranslating(false);
    }
  };

  useEffect(() => {
    const textToUse = translatedContent || content;
    if (textToUse) {
      const [firstPart, secondPart] = splitText(textToUse);
      setFirstHalf(firstPart);
      setSecondHalf(secondPart);
    }
  }, [translatedContent, content]);

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: "url(/images/openBookBackGround.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Button
        className={styles.closeButton}
        icon={<CloseOutlined />}
        onClick={onClose}
      />
      {(loading || isTranslating) && (
        <div className={styles.spinnerStyle}>
          <p style={{ textAlign: "center", fontFamily: "2rem" }}>
            {isTranslating
              ? "Translating your fairy tale. Please wait..."
              : "We're crafting your personalized fairy tale. Hang tight – magic is on its way!"}
          </p>
          <Spin size="large" />
        </div>
      )}
      {!loading && !isTranslating && (
        <div className={styles.content}>
          <Flex justify="space-evenly" gap="large" align="start">
            <div style={{ width: "50%" }}>
              {firstHalf.map((sentence, index) => (
                <div className={styles.containerText} key={`first-${index}`}>
                  {sentence}
                </div>
              ))}
            </div>
            <div style={{ width: "50%" }}>
              {secondHalf.map((sentence, index) => (
                <div className={styles.containerText} key={`second-${index}`}>
                  {sentence}
                </div>
              ))}
            </div>
          </Flex>
        </div>
      )}
      {/* Language Buttons */}
      {!loading && !isTranslating && (
        <Flex justify="space-evenly" gap="large" align="end">
          <Button
            onClick={() => handleLanguageChange("ru")}
            className={styles.btnFairyTale}
          >
            Russian
          </Button>
          <Button
            onClick={() => handleLanguageChange("es")}
            className={styles.btnFairyTale}
          >
            Spanish
          </Button>
          <Button
            onClick={() => handleLanguageChange("de")}
            className={styles.btnFairyTale}
          >
            German
          </Button>
          <Button
            onClick={() => handleLanguageChange("uk")}
            className={styles.btnFairyTale}
          >
            Ukrainian
          </Button>
        </Flex>
      )}
    </div>
  );
};

export default FairyTale;
