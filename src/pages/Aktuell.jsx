import Header from "../components/Header";
import Calendar from "../components/Calendar";

export default function Aktuell() {
  return (
    <>
      <Header />

      <div className="max-w-[1640px] m-auto px-4 py-12 ">
        <h1 className="text bg-yellow-400 font-bold text-4xl text-center">
          Aktuell{" "}
        </h1>
      </div>

      <Calendar />
    </>
  );
}
