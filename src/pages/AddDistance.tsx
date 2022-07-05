import { doc, setDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoBackspaceOutline, IoTrashOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { UsersDataContext } from "../App";
import Keyboard from "../components/Keyboard";
import { Button, Card, LandingText } from "../primitives/StyledComponents";
import { HandleNumpadClick } from "../services/NumPadService";
import {
  auth,
  db,
  getTimestampString,
  uploadDoc,
} from "../utils/FirebaseConfig";
import { GasEntry } from "../utils/Types";

function AddDistance() {
  let { entryId } = useParams();
  let navigate = useNavigate();
  const data = useContext(UsersDataContext) as GasEntry[];
  const [dist, setDist] = useState("0");

  //Handle numpad clicks
  function handleDistanceInput(newValue: string) {
    setDist(HandleNumpadClick(dist, newValue));
  }

  //Delete record
  async function deleteEntry() {
    if (window.confirm("Delete entry?")) {
      let index = parseInt(entryId == undefined ? "0" : entryId);
      if (index > -1) {
        data.splice(index, 1);
      }
      navigate("/");
      uploadDoc(data, false);
    }
  }

  //Submit
  async function submit() {
    let tmp = data[parseInt(entryId == undefined ? "0" : entryId)];
    tmp.distance = parseFloat(dist);
    let liters = tmp.paid / tmp.price;
    tmp.consumption = (liters * 100) / tmp.distance;

    data[parseInt(entryId == undefined ? "0" : entryId)] = tmp;

    //Upload
    uploadDoc(data, true).then(() => navigate("/"));
  }

  return (
    <div className="w-full md:w-1/3">
      <Card>
        <div className="w-full  p-2 rounded-2xl flex justify-between items-center">
          <div className="grow">
            <p className="font-semibold">
              Zaplaceno:&nbsp;
              {data[0] == undefined
                ? "0"
                : data[parseInt(entryId == undefined ? "0" : entryId)]
                    .paid}{" "}
              czk
            </p>
            <p className="text-zinc-400 text-sm">
              Cena za litr:&nbsp;
              {data[0] == undefined
                ? "0"
                : data[
                    parseInt(entryId == undefined ? "0" : entryId)
                  ].price.toFixed(2)}{" "}
              czk
            </p>
            <p className="text-zinc-400 text-sm">
              Ujetá vzdálenost:&nbsp;
              {data[0] == undefined
                ? "0"
                : data[parseInt(entryId == undefined ? "0" : entryId)]
                    .distance}{" "}
              km
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold mb-2">
              {data[0] == undefined
                ? "0"
                : data[
                    parseInt(entryId == undefined ? "0" : entryId)
                  ].consumption.toFixed(2)}{" "}
              l/100km
            </p>
            <p className="text-zinc-400 text-sm">
              {data[0] == undefined
                ? "0"
                : getTimestampString(
                    data[parseInt(entryId == undefined ? "0" : entryId)].date
                  )}
            </p>
          </div>
          <div className="text-right ml-3">
            <IoTrashOutline
              size={25}
              className="cursor-pointer text-rose-300 hover:text-rose-500 transition"
              onClick={() => deleteEntry()}
            />
          </div>
        </div>
      </Card>

      <h1 className="text-center text-sm mt-2 md:my-10">
        Jakou vzdálenost jsi ujel na nádrž?
      </h1>
      <LandingText className="text-center text-5xl">{dist}</LandingText>
      <p className="text-center text-sm mb-2 text-zinc-400">km</p>

      <Keyboard handleClick={handleDistanceInput} />

      {/* submit */}
      <div className="w-full flex justify-center items-center mt-5">
        <Button className=" md:my-10" onClick={() => submit()}>
          Uložit
        </Button>
      </div>
    </div>
  );
}

export default AddDistance;
