import { useContext, useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { UsersDataContext } from "../App";
import HomeStats from "../components/HomeStats";
import { Card, Desc, LandingText, Title } from "../primitives/StyledComponents";
import { getTimestampString } from "../utils/FirebaseConfig";
import { GasEntry, UsersData } from "../utils/Types";

function Home() {
  const [dashData, setDashData] = useState({ consumption: "", price: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const data = useContext(UsersDataContext) as GasEntry[];
  let navigate = useNavigate();

  useEffect(() => {
    getDashboardData();
  }, []);

  // Calc dashboard data
  function getDashboardData() {
    let tmpCons = 0;
    let tmpPrice = 0;
    data.forEach((el) => {
      if (el.consumption > 0){
        tmpCons += el.consumption;
      }
      tmpPrice += el.price;
    });
    setDashData({
      consumption: (tmpCons / (data.length - 1)).toFixed(2),
      price: (tmpPrice / data.length).toFixed(2),
    });
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <LandingText>Hello,</LandingText>
      <Desc>add your data and see how economical you are!</Desc>

      <HomeStats consumption={dashData.consumption} price={dashData.price} />

      <Title className="mb-5">History</Title>

      {data.map((el) => {
        if (
          data.indexOf(el) < currentPage * 10 &&
          data.indexOf(el) > currentPage * 10 - 11
        )
          return (
            <Card
              onClick={() => navigate(`/add_distance/${data.indexOf(el)}`)}
              key={data.indexOf(el)}
              className="hover:bg-zinc-200 hover:dark:bg-zinc-800 transition mb-2 cursor-pointer"
            >
              <div className="w-full rounded-xl flex justify-between items-center ">
                <div className="rounded-full text-black bg-gradient-to-tr from-teal-200 to-lime-200 font-bold w-10 h-10 flex justify-center items-center mr-3">
                  {data.indexOf(el) + 1}
                </div>
                <div className="grow">
                  <p className="font-semibold">Paid: {el.paid} czk</p>
                  <p className="text-zinc-400 text-sm">
                    Price: {el.price.toFixed(2)} czk
                  </p>
                  <p className="text-zinc-400 text-sm">
                    Distance: {el.distance} km
                  </p>
                </div>
                <div className="text-right">
                  <p className={"mb-2 " + (el.consumption.toFixed(2) < dashData.consumption ? "text-emerald-300" : "text-rose-400")}>
                    {el.consumption == 0
                      ? "No distance info"
                      : el.consumption.toFixed(2) + "l/100km"}
                  </p>
                  <p className="text-zinc-400 text-sm">
                    {getTimestampString(el.date)}
                  </p>
                </div>
              </div>
            </Card>
          );
      })}
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
