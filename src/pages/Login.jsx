import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        {
          username,
          password,
        }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);

      // Weiterleitung zur Startseite, wenn die Anmeldung erfolgreich ist
      window.location.href = "/aktuell";
    } catch (error) {
      console.error("Fehler beim Anmelden:", error);
      setError(error.response.data.message);
    }
  };

  // Überprüfe das Token, wenn die Komponente geladen wird
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/aktuell";
    }
  }, []);

  return (
    <>
      <div className="w-full h-screen">
        <div className="   bg-gray-200 fixed top-0 left-0 w-full h-screen">
          <div className="fixed w-full px-4 py-24 z-50">
            <div className="max-w-[450px] h-[500px] mx-auto bg-white  text-black">
              <div className="max-w-[320px] mx-auto px-16">
                <div className="max-w-[320px]  py-5 ml-2 ">
                  <img
                    className="w-[192x] h-[76px] "
                    src="../src/assets/img/renault-logo-header.jpg"
                    alt="renault-logo"
                  />
                </div>
                <h1 className="text-3xl font-bold py-5 text-center ">Login</h1>

                <form
                  className="w-full flex flex-col py-4  text-black"
                  onSubmit={handleSubmit}
                >
                  <input
                    className="p-3 my-2 bg-gray-500 rounded text-white"
                    type="text"
                    placeholder="Benutzername"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <input
                    className="p-3 my-2 bg-gray-500 rounded text-white"
                    type="password"
                    placeholder="Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="bg-yellow-400 py-3 my-6 rounded font-bold"
                  >
                    Einloggen
                  </button>
                </form>
                {error && <div className="text-orange-700"> {error}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
