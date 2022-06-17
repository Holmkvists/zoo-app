import axios from "axios";
import { useEffect, useState } from "react";
import { IAnimal } from "../models/IAnimal";
import { PrintAnimal } from "./PrintAnimal";
import "../css/Animals.css";

export const Animals = () => {
  const [animals, setAnimals] = useState<IAnimal[]>([]);

  useEffect(() => {
    if (animals.length !== 0) return;

    axios
      .get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
      .then((response) => {
        setAnimals(response.data);
      });
  });

  let html = animals.map((animal) => {
    return <PrintAnimal key={animal.id} animal={animal}></PrintAnimal>;
  });

  return (
    <main>
      <section>{html}</section>
    </main>
  );
};
