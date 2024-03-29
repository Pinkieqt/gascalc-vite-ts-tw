import { useContext, useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { UsersDataContext } from "../App";
import HomeStats from "../components/HomeStats";
import { Card, Desc, LandingText, Title } from "../primitives/StyledComponents";
import { getTimestampString } from "../utils/FirebaseConfig";
import { GasEntry } from "../utils/Types";

function Home() {
  const [dashData, setDashData] = useState({
    consumption: "",
    price: "",
    totalpaid: "",
    avgdist: "",
    avgliter: "",
    totaltank: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const data = useContext(UsersDataContext) as GasEntry[];
  let navigate = useNavigate();

  // Re-do this next time -> very bad
  const [thisData, setThisData] = useState(false);
  const [last, setLast] = useState(false);
  const [later, setLater] = useState(false);

  useEffect(() => {
    getDashboardData();
  }, []);

  //fast fix, wont fix it when the new app is coming :) aint time for that
  function getTodaysDate(minus: number) {
    var tmpdate = new Date().getMonth() + minus;
    if (tmpdate == -1) {
      return 11;
    } else return tmpdate;
  }

  // Calc dashboard data
  function getDashboardData() {
    let tmpCons = 0;
    let tmpPrice = 0;
    let tmpDist = 0;
    let tmpPaid = 0;
    let tmpLiter = 0;
    let zeroCounter = 0;
    data.forEach((el) => {
      if (el.consumption > 0) {
        tmpCons += el.consumption;
        tmpDist += el.distance;
      } else {
        zeroCounter += 1;
      }
      tmpLiter += el.paid / el.price;
      tmpPrice += el.price;
      tmpPaid += el.paid;
    });
    setDashData({
      consumption: (tmpCons / (data.length - zeroCounter)).toFixed(2),
      price: (tmpPrice / data.length).toFixed(2),
      totalpaid: tmpPaid.toFixed(0),
      avgdist: tmpDist.toFixed(0),
      avgliter: tmpLiter.toFixed(0),
      totaltank: data.length.toFixed(0),
    });
  }

  function returnCard(el: GasEntry) {
    return (
      <Card
        onClick={() => navigate(`/add_distance/${data.indexOf(el)}`)}
        key={Math.random()}
        className="hover:bg-zinc-200 hover:dark:bg-zinc-800 transition mb-2 cursor-pointer"
      >
        <div className="w-full rounded-xl flex justify-between items-center ">
          <div className="rounded-full text-black bg-gradient-to-tr from-teal-200 to-lime-200 font-bold w-10 h-10 flex justify-center items-center mr-3">
            {data.indexOf(el) + 1}
          </div>
          <div className="grow">
            <p className="font-semibold">Zaplaceno: {el.paid} czk</p>
            <p className="text-zinc-400 text-sm">
              Cena za litr: {el.price.toFixed(2)} czk
            </p>
            <p className="text-zinc-400 text-sm">
              Ujetá vzdálenost: {el.distance} km
            </p>
          </div>
          <div className="text-right">
            <p
              className={
                " " +
                (el.consumption.toFixed(2) < dashData.consumption
                  ? "text-emerald-300"
                  : "text-rose-400")
              }
            >
              {el.consumption == 0
                ? "Žádné info"
                : el.consumption.toFixed(2) + "l/100km"}
            </p>
            <p className="text-zinc-400 text-sm">
              {getTimestampString(el.date)}
            </p>
            <p className="text-zinc-400 text-sm">
              {(el.paid / el.price).toFixed(2)} l
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <LandingText className="mt-5">Vítej,</LandingText>
      <Desc>zapiš svá data a získej přehled o tvých jízdách.</Desc>

      <HomeStats
        consumption={dashData.consumption}
        price={dashData.price}
        totalpaid={dashData.totalpaid}
        avgdist={dashData.avgdist}
        avgliter={dashData.avgliter}
        totaltank={dashData.totaltank}
      />

      <Title className="text-xl mb-5">Historie</Title>

      {/* This month */}
      <div className="w-full ">
        {/* <div className="w-full flex justify-between p-2">
          {data.find(
            (date) => date.date.toDate().getMonth() == new Date().getMonth()
          ) && <p className="text-sm text-zinc-500">Tento měsíc</p>}
        </div> */}
        {data.map((el) => {
          if (
            data.indexOf(el) < currentPage * 10 &&
            data.indexOf(el) > currentPage * 10 - 11
            //&&
            //el.date.toDate().getMonth() == new Date().getMonth()
            //&&
            //el.date.toDate().getFullYear() == new Date().getFullYear()
          ) {
            return returnCard(el);
          }
        })}
      </div>

      {/* Last month */}
      {/* <div className="w-full">
        <div className="w-full flex justify-between p-2">
          {data.find(
            (date) => date.date.toDate().getMonth() == getTodaysDate(-1)
          ) && <p className="text-sm text-zinc-500">Minulý měsíc</p>}
        </div>
        {data.map((el) => {
          console.log(el.date.toDate().getMonth());
          if (
            data.indexOf(el) < currentPage * 10 &&
            data.indexOf(el) > currentPage * 10 - 11 &&
            el.date.toDate().getMonth() == getTodaysDate(-1)
            //&&
            //el.date.toDate().getFullYear() == new Date().getFullYear()
          ) {
            return returnCard(el);
          }
        })}
      </div> */}

      {/* Later... */}
      {/* <div className="w-full">
        <div className="w-full flex justify-between p-2">
          {data.find(
            (date) => date.date.toDate().getMonth() < getTodaysDate(-1)
          ) && <p className="text-sm text-zinc-500">Později...</p>}
        </div>
        {data.map((el) => {
          if (
            data.indexOf(el) < currentPage * 10 &&
            data.indexOf(el) > currentPage * 10 - 11 &&
            el.date.toDate().getMonth() < getTodaysDate(-1)
            //&&
            //el.date.toDate().getFullYear() == new Date().getFullYear()
          ) {
            return returnCard(el);
          }
        })}
      </div> */}

      {/* Page transitor */}
      {data.length > 10 && (
        <div className="w-full flex justify-center my-10">
          <div
            className="flex justify-center items-center p-4 bg-zinc-100 dark:bg-zinc-900 rounded-l-xl cursor-pointer hover:bg-zinc-200 hover:dark:bg-zinc-800 transition"
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          >
            <IoChevronBack />
          </div>
          <div className="py-4 px-10 bg-zinc-100 dark:bg-zinc-900 ">
            Page {currentPage}
          </div>
          <div
            className="flex justify-center items-center p-4 bg-zinc-100 dark:bg-zinc-900 rounded-r-xl cursor-pointer hover:bg-zinc-200 hover:dark:bg-zinc-800 transition"
            onClick={() =>
              currentPage * 10 < data.length && setCurrentPage(currentPage + 1)
            }
          >
            <IoChevronForward />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
