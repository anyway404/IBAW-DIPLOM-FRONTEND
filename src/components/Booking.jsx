import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { data } from "../data/data";

const Booking = ({ onClose }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [customer, setCustomer] = useState("");

  const handleClose = (e) => {
    if (e.target.id === "wrapper" || e.target.id === "closeButton") {
      onClose();
    }
  };

  const handleStartDateChange = (date) => {
    // Setze das Datum für startDate auf Arbeitsbeginn 07:00 Uhr
    const newDate = new Date(date);
    newDate.setHours(7, 0, 0, 0);
    setStartDate(newDate);

    // Automatisch Enddatum auf das gleiche wie Startdatum setzen, aber auf Arbeitsschluss 17:30 Uhr
    const endDateCopy = new Date(date);
    endDateCopy.setHours(17, 30, 0, 0);
    setEndDate(endDateCopy);
  };

  const handleEndDateChange = (date) => {
    // Zeit setzen für endDate auf Arbeitsschluss 17:30 Uhr
    const newDate = new Date(date);
    newDate.setHours(17, 30, 0, 0);
    setEndDate(newDate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sammeln der Daten aus dem Formular
    const bookingData = {
      brand: selectedBrand,
      name: selectedName,
      startDate: startDate,
      endDate: endDate,
      customer: customer,
    };

    try {
      // Senden der Buchungsdaten an das Backend
      const response = await fetch(
        "https://ibaw-diplom-backend.onrender.com/api/v1/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
          mode: "cors",
        }
      );

      if (response.ok) {
        // Erfolgreiche Übermittlung
        console.log("Buchungsdaten wurden erfolgreich übermittelt.");
      } else {
        // Fehler beim Übermitteln
        console.error("Fehler beim Übermitteln der Buchungsdaten.");
      }
    } catch (error) {
      // Fehler beim Senden des Requests
      console.error("Fehler beim Senden des Requests:", error);
    }

    onClose(); // Schließen des Buchungsfensters
    resetForm(); // Zurücksetzen des Formulars
  };

  const resetForm = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedBrand("");
    setSelectedName("");
    setCustomer("");
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[600px] flex flex-col">
        <button
          id="closeButton"
          className="text-white text-xl place-self-end"
          onClick={onClose}
        >
          X
        </button>
        <div className="bg-white p-8 rounded">
          <h2 className="text-3xl font-bold py-5">Einplanen</h2>
          <form className="w-full flex flex-col py-4" onSubmit={handleSubmit}>
            <label className="font-bold" htmlFor="customer">
              Kunde:
            </label>
            <input
              className="p-3 my-2 bg-gray-300 rounded"
              type="text"
              placeholder="Kundenname"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />

            <label className="font-bold" htmlFor="brand">
              Marke:
            </label>
            <select
              className="p-3 my-2 bg-gray-300 rounded"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">Bitte wählen...</option>
              {Array.from(new Set(data.map((car) => car.brand))).map(
                (brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
                  </option>
                )
              )}
            </select>

            <label className="font-bold" htmlFor="name">
              Autoname:
            </label>
            <select
              className="p-3 my-2 bg-gray-300 rounded"
              value={selectedName}
              onChange={(e) => setSelectedName(e.target.value)}
            >
              <option value="">Bitte wählen...</option>
              {data
                .filter((car) => car.brand === selectedBrand)
                .map((car, index) => (
                  <option key={index} value={car.name}>
                    {car.name}
                  </option>
                ))}
            </select>

            <div className="flex">
              <div className="mr-2">
                <label className="p-3 my-2" htmlFor="start">
                  Von:
                </label>
                <DatePicker
                  className="p-3 my-2 bg-gray-300 rounded"
                  selected={startDate}
                  onChange={handleStartDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Start Date"
                />
              </div>
              <div className="ml-2">
                <label className="p-3 my-2" htmlFor="end">
                  Bis:
                </label>
                <DatePicker
                  className="p-3 my-2 bg-gray-300 rounded"
                  selected={endDate}
                  onChange={handleEndDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="End Date"
                />
              </div>
            </div>
            <button
              className="bg-yellow-400 py-3 my-6 rounded font-bold"
              type="submit"
            >
              Übernehmen
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
