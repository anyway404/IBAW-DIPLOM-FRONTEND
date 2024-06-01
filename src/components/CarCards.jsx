import React, { useState } from "react";
import { data } from "../data/data.js";

const CarCards = () => {
  const [cards, setCards] = useState(data);
  const [filterValue, setFilterValue] = useState("");

  const filterCards = (value) => {
    if (value === "") {
      setCards(data);
    } else {
      const filteredCards = data.filter((item) => item.use === value);
      setCards(filteredCards);
    }
  };

  return (
    <div>
      {/* Filter */}
      <div>
        <label htmlFor="useFilter">Verwendungszweck: </label>
        <select
          id="useFilter"
          onChange={(e) => {
            setFilterValue(e.target.value);
            filterCards(e.target.value);
          }}
          value={filterValue}
        >
          <option value="">Alle</option>
          <option value="Mietwagen">Mietwagen</option>
          <option value="Ersatzwagen">Ersatzwagen</option>
          {/* Weitere Verwendungszwecke hinzufügen, falls benötigt */}
        </select>
      </div>

      {/* Anzeige der Karten */}
      <div className="grid grid-cols-2 lg:grid-cols-3 sm:grid-cols-1  md:grid-cols-2 gap-5 pt-7 pl-5 pr-5">
        {cards.map((item, index) => (
          <div
            key={index}
            className="border shadow-lg rounded-lg hover:scale-105 duration-300 "
          >
            <img
              src={item.url}
              alt={item.name}
              className="w-fll h-[300px] object-cover rounded-t-lg m-auto max-w-[400px] "
            />
            <div className="ml-4 px-2 py-4">
              <p className="font-bold  ">
                {item.brand} <br />
                {item.name} <br /> <br />
              </p>
              <p>
                <span>
                  <li>{item.use}</li>
                  <li>{item.type}</li>
                  <li>Plätze: {item.seats}</li>
                  <li>{item.km} km </li>
                  <li>Jahrgang: {item.year}</li>
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarCards;
