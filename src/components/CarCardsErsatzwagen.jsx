import React, { useState } from "react";
import { data } from "../data/data.js";
import Booking from "./Booking.jsx";

const CarCards = () => {
  const [cards, setCards] = useState([]);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const filterErsatzwagen = () => {
    const ersatzwagenCards = data.filter((item) => item.use === "Ersatzwagen");
    setCards(ersatzwagenCards);
  };

  useState(() => {
    filterErsatzwagen();
  }, []);

  const handleBooking = (car) => {
    setSelectedCar(car);
    setShowBooking(true);
  };

  return (
    <div>
      {/* Display Cards */}
      <div className="grid lg:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-1 md:grid-cols-2  gap-12 pt-7 pl-5 pr-5 md:mx-20 ">
        {cards.map((item, index) => (
          <div
            key={index}
            className="border shadow-lg rounded-lg hover:scale-105 duration-300"
          >
            <img
              src={item.url}
              alt={item.name}
              className="w-full h-[300px] object-fill rounded-t-lg m-auto max-w-[450px]"
            />
            <div className="ml-4 px-2 py-4">
              <p className="font-bold ml-4 text-2xl">
                {item.brand} <br />{" "}
              </p>
              <p className="font-bold ml-4">
                {item.name} <br /> <br />
              </p>

              <p className="font-medium ml-4">
                <span>
                  <li>{item.use}</li>
                  <li>{item.type}</li>
                  <li>Plätze: {item.seats}</li>
                  <li>{item.km} km </li>
                  <li>Jahrgang: {item.year}</li>
                </span>
              </p>

              <button
                type="button"
                className="mt-6 ml-4 rounded-lg bg-yellow-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                onClick={() => handleBooking(item)}
              >
                Einplanen
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Anpassung der Positionierung der Booking-Komponente */}
      {showBooking && (
        <Booking
          isVisible={showBooking}
          onClose={() => setShowBooking(false)}
          selectedCar={selectedCar} // Übergebe des Autos an die Booking-Komponente
        />
      )}
    </div>
  );
};

export default CarCards;
