import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IExtendedAnimal } from "../models/IAnimal";
import "../css/ExtendedAnimal.css";

let intervalId: ReturnType<typeof setInterval>;
let lastAnimal: number;

export const ExtendedAnimal = () => {
  let params = useParams();
  let animalId: number = params.id != null ? parseInt(params.id, 10) : 0;

  const [animal, setAnimal] = useLocalStorage<IExtendedAnimal>(
    "animal" + params.id,
    {
      imageUrl: "",
      name: "",
      yearOfBirth: 0,
      shortDescription: "",
      latinName: "",
      longDescription: "",
      isFed: false,
      lastFed: "",
    }
  );

  const [buttonText, setButtonText] = useState("Mata djuret");
  const [disableButton, setDisableButton] = useState(false);

  function feedAnimal() {
    animal.isFed = true;
    const hours = 60 * 60 * 1000;
    const minutes = 60 * 60 * 1000;
    const seconds = 60 * 60 * 1000;
    animal.lastFed = (Date.now() + hours + minutes + seconds).toString();
    setAnimal(animal);
    setDisableButton(true);
  }

  useEffect(() => {
    if (animal.name == "") {
      axios
        .get<IExtendedAnimal>(
          "https://animals.azurewebsites.net/api/animals/" + params.id
        )
        .then((response) => {
          setAnimal(response.data);
        });
    }

    let fed = parseInt(animal.lastFed, 10);
    let now = Date.now();
    let diff = (fed - now) / 1000;
    if (diff < 0) {
      animal.isFed = false;
      setAnimal(animal);
    }
    setDisableButton(diff >= 0);

    lastAnimal = 0;

    if (lastAnimal != animalId) {
      if (!!intervalId) {
        console.log("Interval cleared & started");
        clearInterval(intervalId);
        setDisableButton(false);
      } else console.log("Interval started");

      intervalId = setInterval(() => {
        let fed = parseInt(animal.lastFed, 10);
        let now = Date.now();
        let diff = (fed - now) / 1000;

        let btnText =
          diff > 0
            ? "Du kan mata igen om " +
              Math.floor(diff / 60 / 60) +
              "h " +
              Math.floor((diff / 60) % 60) +
              "m " +
              Math.floor(diff % 60) +
              "s "
            : "Mata djuret";

        if (diff < 0 && animal.isFed) {
          setDisableButton(false);
        }
        animal.isFed = diff >= 0;
        setButtonText(btnText);
      }, 1000);
    }
  }, []);

  function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState(() => {
      if (typeof window === "undefined") {
        return initialValue;
      }
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.log(error);
        return initialValue;
      }
    });

    const setValue = (value: T) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.log(error);
      }
    };
    return [storedValue, setValue];
  }

  return (
    <div className="extended-animal-container">
      <div className="animal-info">
        <h1>{animal.name}</h1>
        <img src={animal.imageUrl} alt={animal.name} />
        <p>{animal.shortDescription}</p>
        <p>
          {animal.name} föddes år {animal.yearOfBirth}
        </p>
        <div className="feed-container">
          <p>Är {animal.name} matad?</p>
          {animal.isFed ? <p>Ja</p> : <p>Nej</p>}
          <button disabled={disableButton} onClick={feedAnimal}>
            {buttonText}
          </button>
        </div>
      </div>
      <div className="animal-facts">
        <h2>Faktaruta</h2>
        <p>Latinskt namn: {animal.latinName}</p>
        <p>{animal.longDescription}</p>
      </div>
    </div>
  );
};
