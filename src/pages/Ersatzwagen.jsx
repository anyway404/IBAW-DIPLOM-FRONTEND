import CarCardsErsatzwagen from "../components/CarCardsErsatzwagen";
import Header from "../components/Header";

export default function Ersatzwagen() {
  return (
    <>
      <Header />

      <div className="max-w-[1640px] m-auto px-4 py-12 ">
        <h1 className="text bg-yellow-400 font-bold text-4xl text-center">
          Ersatzwagen{" "}
        </h1>
      </div>
      <CarCardsErsatzwagen />
    </>
  );
}
