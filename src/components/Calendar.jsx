import { Fragment, useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import {
  endOfMonth,
  format,
  startOfToday,
  eachDayOfInterval,
  isToday,
  isSameMonth,
  isEqual,
  parse,
  add,
  getDay,
  parseISO,
  isSameDay,
  isWithinInterval,
} from "date-fns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  let today = startOfToday();

  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  // State für die Bookings
  const [meetings, setMeetings] = useState([]);

  // Funktion zum Abrufen der Bookings aus dem Backend
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/bookings/");
        if (!response.ok) {
          throw new Error("Failed to fetch meetings");
        }
        const data = await response.json();
        setMeetings(data);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };
    fetchMeetings();
  }, []);

  const deleteMeeting = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/bookings/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        }
      );

      if (response.ok) {
        // Erfolgreich gelöscht, aktualisiere den Zustand
        setMeetings((prevMeetings) =>
          prevMeetings.filter((meeting) => meeting._id !== id)
        );
        console.log("Eintrag erfolgreich gelöscht.");
      } else {
        console.error("Fehler beim Löschen des Eintrags.");
      }
    } catch (error) {
      console.error("Fehler beim Senden des Requests:", error);
    }
  };

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  let selectedDayMeetings = meetings.filter((meeting) => {
    if (meeting.startDate && meeting.endDate) {
      const start = parseISO(meeting.startDate);
      const end = parseISO(meeting.endDate);
      const daysBetween = eachDayOfInterval({ start, end });
      return daysBetween.some((day) => isSameDay(day, selectedDay));
    } else {
      return isSameDay(parseISO(meeting.startDate), selectedDay);
    }
  });

  return (
    <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200 mx-5">
      <div className="md:pr-14">
        <div className="flex items-center">
          <h2 className="flex-auto text-sm font-bold text-gray-900 ml-6">
            {format(firstDayCurrentMonth, "MMMM yyyy")}
          </h2>
          <button
            onClick={previousMonth}
            type="button"
            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            onClick={nextMonth}
            type="button"
            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
          <div className="font-bold">Mo</div>
          <div className="font-bold">Di</div>
          <div className="font-bold">Mi</div>
          <div className="font-bold">Do</div>
          <div className="font-bold">Fr</div>
          <div className="font-bold">Sa</div>
          <div className="font-bold">So</div>
        </div>
        <div className="mt-2 grid grid-cols-7 text-sm">
          {days.map((day, dayIdx) => (
            <div
              key={day.toString()}
              className={classNames(
                dayIdx > 6 && " border-gray-200",
                "py-1.5",
                dayIdx === 0 && colStartClasses[getDay(day)]
              )}
            >
              <button
                type="button"
                onClick={() => setSelectedDay(day)}
                className={classNames(
                  isEqual(day, selectedDay) && "text-white",
                  !isEqual(day, selectedDay) && isToday(day) && "text-red-500",
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    isSameMonth(day, firstDayCurrentMonth) &&
                    "text-gray-900",
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    !isSameMonth(day, firstDayCurrentMonth) &&
                    "text-gray-400",
                  isEqual(day, selectedDay) && isToday(day) && "bg-red-500",
                  isEqual(day, selectedDay) && !isToday(day) && "bg-gray-900",
                  !isEqual(day, selectedDay) && "hover:bg-gray-200",
                  (isEqual(day, selectedDay) || isToday(day)) &&
                    "font-semibold",
                  "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                )}
              >
                <time dateTime={format(day, "yyyy-MM-dd")}>
                  {format(day, "d")}
                </time>
              </button>

              {/* Daten markieren und anzeigen wenn mehr als 1 Datum ausgewählt wird*/}
              <div className="w-1 h-1 mx-auto mt-1">
                {meetings.some((meeting) => {
                  if (meeting.startDate && meeting.endDate) {
                    const start = parseISO(meeting.startDate);
                    const end = parseISO(meeting.endDate);
                    return (
                      isWithinInterval(day, { start, end }) ||
                      isSameDay(day, start)
                    );
                  } else {
                    return isSameDay(parseISO(meeting.startDate), day);
                  }
                }) && <div className="w-1 h-1 bg-sky-500 rounded-full"></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <section className="mt-12 md:mt-0 md:pl-14 mx-6">
        <h2 className="text-base font-semibold underline leading-6 text-gray-900 ;">
          Planung für{" "}
          <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
            {format(selectedDay, "dd MMM , yyy")}
          </time>
        </h2>
        <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
          {selectedDayMeetings.length > 0 ? (
            selectedDayMeetings.map((meeting, index) => (
              <Meeting meeting={meeting} key={index} onDelete={deleteMeeting} />
            ))
          ) : (
            <p>Keine Einträge für Heute</p>
          )}
        </ol>
      </section>
    </div>
  );
}

function Meeting({ meeting, onDelete }) {
  let startDatetime = parseISO(meeting.startDate);
  let endDatetime = parseISO(meeting.endDate);

  return (
    <li className="group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-gray-100 bg-gray-100">
      <div className="flex-auto">
        <p className="text-gray-900">
          {meeting.customer} <br />
          {meeting.brand}: {meeting.name}
        </p>
        <p className="mt-0.5">
          <time dateTime={meeting.startDate}>
            {format(startDatetime, "H:mm ")}Uhr
          </time>{" "}
          -{" "}
          <time dateTime={meeting.endDate}>
            {format(endDatetime, "H:mm ")} Uhr{" "}
          </time>
        </p>
      </div>
      <Menu
        as="div"
        className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
      >
        <div>
          <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
            <span className="sr-only">Open options</span>
            <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => onDelete(meeting._id)}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Eintrag löschen
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </li>
  );
}

// Anordnung der Daten, damit diese immer auf das korrekte Wochentag passen
let colStartClasses = [
  "",
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
];
