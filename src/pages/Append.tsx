import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";
import { HandleNumpadClick } from "../services/NumPadService";
import Keyboard from "../components/Keyboard";
import { Button, LandingText } from "../primitives/StyledComponents";
import { GasEntry } from "../utils/Types";
import { Timestamp } from "firebase/firestore";
import { UsersDataContext } from "../App";
import { uploadDoc } from "../utils/FirebaseConfig";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Append() {
  let navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [price, setPrice] = useState("0");
  const [gasPrice, setGasPrice] = useState("0");
  const [isWrongInput, setIsWrongInput] = useState(false);
  const data = useContext(UsersDataContext) as GasEntry[];

  //Handle numpad clicks
  function handlePriceNumpadClick(newValue: string) {
    setPrice(HandleNumpadClick(price, newValue));
  }

  function handleGasPriceNumpadClick(newValue: string) {
    setGasPrice(HandleNumpadClick(gasPrice, newValue));
  }

  //Submit
  async function submit() {
    let submitData: GasEntry = {
      date: Timestamp.fromDate(startDate),
      paid: parseFloat(price),
      price: parseFloat(gasPrice),
      distance: 0,
      consumption: 0,
    };

    //Add to data
    data.push(submitData);

    //Sort array
    data.sort((x, y) => +y.date - +x.date);

    //Upload
    uploadDoc(data, true).then(() => navigate("/"));
  }

  return (
    <div className="w-full md:w-1/3">
      {isFirstPage ? (
        <>
          {/* Datepicker */}
          <div className="w-full flex justify-center items-center">
            <ReactDatePicker
              dateFormat="dd.MM. yyyy"
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              withPortal
              disabledKeyboardNavigation
              className="text-center dark:bg-zinc-900 bg-zinc-100 rounded-lg py-1 mb-2 cursor-pointer"
            />
          </div>

          {/* Heading */}
          <div className="flex justify-around bg-zinc-100 dark:bg-zinc-900 rounded-lg">
            <a className="w-1/2 px-3 py-2 text-center font-semibold bg-zinc-200 dark:bg-zinc-800 rounded-lg m-1 cursor-pointer">
              Zaplaceno
            </a>
            <a
              className="w-1/2 m-1 cursor-pointer text-center px-3 py-2"
              onClick={() => {
                if (parseFloat(price) > 0) {
                  setIsFirstPage(!isFirstPage);
                  setIsWrongInput(false);
                } else setIsWrongInput(true);
              }}
            >
              Cena za litr
            </a>
          </div>
          <h1 className="text-center text-sm mt-2  md:my-10">
            Kolik jsi platil?
          </h1>
          <LandingText className="text-center text-5xl">{price}</LandingText>
          <p className="text-center text-sm mb-2 text-zinc-400">czk</p>
          {isWrongInput && (
            <p className="text-center text-rose-400">Vlož nějakou hodnotu!</p>
          )}

          {/* Keyboard */}
          <Keyboard handleClick={handlePriceNumpadClick} />

          {/* submit */}
          <div className="w-full flex justify-center items-center mt-5">
            <Button
              className=" md:my-10"
              onClick={() => {
                if (parseFloat(price) > 0) {
                  setIsFirstPage(!isFirstPage);
                  setIsWrongInput(false);
                } else setIsWrongInput(true);
              }}
            >
              Pokračovat
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* DatePicker */}
          <div className="w-full flex justify-center items-center">
            <ReactDatePicker
              dateFormat="dd.MM. yyyy"
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              withPortal
              disabledKeyboardNavigation
              className="text-center dark:bg-zinc-900 bg-zinc-100 rounded-lg py-1 mb-2 cursor-pointer"
            />
          </div>

          {/* Heading */}
          <div className="flex justify-around bg-zinc-100  dark:bg-zinc-900 rounded-lg">
            <a
              className="w-1/2 m-1 cursor-pointer text-center px-3 py-2"
              onClick={() => setIsFirstPage(!isFirstPage)}
            >
              Zaplaceno
            </a>
            <a className="w-1/2 px-3 py-2 text-center font-semibold bg-zinc-200 dark:bg-zinc-800 rounded-lg m-1 cursor-pointer">
              Cena za litr
            </a>
          </div>
          <h1 className="text-center text-sm mt-2  md:my-10">
            Jaká byla cena za litr paliva?
          </h1>
          <LandingText className="text-center text-5xl">{gasPrice}</LandingText>
          <p className="text-center text-sm mb-2 text-zinc-400">czk / l</p>
          {isWrongInput && (
            <p className="text-center text-rose-400">Vlož nějakou hodnotu!</p>
          )}
          {/* Keyboard */}
          <Keyboard handleClick={handleGasPriceNumpadClick} />

          {/* submit */}
          <div className="w-full flex justify-center items-center mt-5">
            <Button className=" md:my-10" onClick={() => submit()}>
              Uložit
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Append;
