import { IAnimal } from "../models/IAnimal";
import "../css/PrintAnimal.css";
import { Link } from "react-router-dom";

interface IPrintAnimalProps {
  animal: IAnimal;
}

export const PrintAnimal = (props: IPrintAnimalProps) => {
  return (
    <div className="animal-container">
      <h3>{props.animal.name}</h3>
      <Link to={"/djur/" + props.animal.id} key={props.animal.id}>
        <img src={props.animal.imageUrl} alt={props.animal.name} />
      </Link>
      <p>{props.animal.shortDescription}</p>
    </div>
  );
};
