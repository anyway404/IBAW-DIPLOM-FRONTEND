import Header from "../components/Header";

export default function Impressum() {
  return (
    <>
      <Header />

      <div className="max-w-[1640px] m-auto px-4 py-12 ">
        <h1 className="text bg-yellow-400 font-bold text-4xl text-center">
          Impressum{" "}
        </h1>
      </div>

      <div className=" mt-2 px-4  ">
        <h2 className="text-lg">
          Bei Fragen, Anmerkungen, Änderungen oder Updates können Sie sich gerne
          an mich wenden:
        </h2>
        <br />
        <span className="font-bold "> Kontakt: </span> <br />
        <address className="mt-4">
          Kevin Hasler <br />
          Dammstrasse 32 <br />
          CH-5074 Eiken <br />
          <br />
          <p className="mt-3 mb-2">
            {" "}
            <span className="font-bold"> Email: </span> <br />
            <a href="mailto:webmaster@example.com">kevin.hasler@bluewin.ch</a>
          </p>
          <p className="mt-4 mb-4">
            <span className="font-bold"> Telefon:</span> <br />
            <a href="tel:+41793722902">079 372 29 02</a>
          </p>
        </address>
        <p className="mt-8 mb-2">
          <h2 className="font-bold">Copyright </h2> Das Copyright für sämtliche
          Inhalte dieser Website liegt bei der Renault Hasler Garage, 5074
          Eiken.
        </p>
        <br />{" "}
        <p className="font-serif mt-12 mb-4">
          Kevin Hasler (2024). [Software Version 1.0].
        </p>
      </div>
    </>
  );
}
