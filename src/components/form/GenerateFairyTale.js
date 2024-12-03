import React, { useState, useEffect, useRef } from "react";
import CustomButton from "../buttons/Button";
import CustomInput from "../buttons/Input";
import CustomSelect from "../buttons/Select";
import SelectAnimal from "./SelectAnimal";
import AddSecondCharacter from "./AddSecondCharacter";
import { generateText } from "../../geminiAPI";
import styles from "../form/generateFairyTale.module.css";
import { validateFormData } from "../../utils/validations";
import FairyTale from "../fairyTale/FairyTale";

const GenerateFairyTale = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    gender: "",
    friendsName: "",
    animal: "",
    category: "",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [formError, setFormError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fairyTale, setFairyTale] = useState(null);

  const imageRef = useRef(null);
  const formInnerRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.classList.add(styles.slideInLeft);
    }
    if (formInnerRef.current) {
      formInnerRef.current.classList.add(styles.slideInRight);
    }
  }, []);

  const handleChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value || "",
    }));
  };

  const handleReset = () => {
    setFairyTale(null);
    setFormData({
      firstName: "",
      gender: "",
      friendsName: "",
      animal: "",
      category: "",
    });
    setValidationErrors({});
    setFormError(false);
  };

  const handleFormSubmit = async () => {
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      setFormError(true);
      setValidationErrors(validation.errors);
      console.log(validation.errors);
      return;
    }
    setLoading(true);
    try {
      const prompt = `Create a 15-sentence fairy tale for a child named ${formData.firstName}, who is a ${formData.gender}, and loves ${formData.animal}. The story should be based on the ${formData.category} theme and should be simple, engaging, and suitable for a child.`;
      const result = await generateText(prompt);
      const generatedText = result.candidates[0].content.parts[0].text;
      console.log(generatedText);
      setFairyTale(generatedText);
    } catch (error) {
      console.error("Error generating fairy tale:", error);
      setFormError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="create">
      <h1 className={styles.title}>Create your Fairy tale ✨</h1>
      {(loading || fairyTale) && (
        <FairyTale
          content={fairyTale}
          loading={loading}
          onClose={handleReset}
          onUpdateContent={(updatedContent) => setFairyTale(updatedContent)}
        />
      )}
      {!fairyTale && (
        <div className={styles.formContainer}>
          <img
            src={`${process.env.PUBLIC_URL}/images/13.webp`}
            alt="Description"
            className={styles.slideImage}
          />
          <div className={styles.formInner}>
            {formError && (
              <p className={styles.loginError}>
                Oops! Looks like something's amiss. Please check the form and
                try again.
              </p>
            )}
            <CustomInput
              id="firstName"
              status={validationErrors.firstName ? "error" : ""}
              value={formData.firstName}
              placeholder="Choose your hero's name"
              onChange={(e) => handleChange("firstName", e.target.value)}
            />

            <div className={styles.flexContainer}>
              <CustomSelect
                status={validationErrors.category ? "error" : ""}
                id="category"
                value={formData.category}
                onChange={(value) => handleChange("category", value)}
                placeholder="Favorite story theme"
                options={[
                  { value: "enchantedForest", label: "Enchanted Forest" },
                  { value: "spaceAdventures", label: "Space Adventures" },
                  { value: "robotChronicles", label: "Robot Chronicles" },
                  { value: "pirateTreasures", label: "Pirate Treasures" },
                  { value: "castleKingdoms", label: "Castle Kingdoms" },
                  { value: "underwaterWorlds", label: "Underwater Worlds" },
                  { value: "dinosaurLand", label: "Dinosaur Land" },
                  {
                    value: "fairyAndElfRealms",
                    label: "Fairy and Elf Realms",
                  },
                  { value: "superheroSagas", label: "Superhero Sagas" },
                  { value: "animalKingdoms", label: "Animal Kingdoms" },
                  { value: "mysticalMountains", label: "Mystical Mountains" },
                  { value: "hauntedHouses", label: "Haunted Houses" },
                ]}
              />
            </div>
            <AddSecondCharacter
              error={validationErrors.gender}
              formData={formData.friendsName}
              handleChange={handleChange}
            />
            <SelectAnimal
              error={validationErrors.animal}
              formData={formData.animal}
              handleChange={handleChange}
              status={validationErrors.animal}
            />
            <CustomButton
              content={"Create your story"}
              className="buttonForm"
              onClick={handleFormSubmit}
              disabled={loading}
            />
          </div>
          <img
            src={`${process.env.PUBLIC_URL}/images/11.webp`}
            alt="Description"
            ref={formInnerRef}
            className={styles.slideImageSecond}
          />
        </div>
      )}
    </div>
  );
};

export default GenerateFairyTale;
