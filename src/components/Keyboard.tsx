import { IoBackspaceOutline } from "react-icons/io5";
import { Button } from "../primitives/StyledComponents";

interface PropTypes {
  handleClick(val: string): void;
}

function Keyboard(props: PropTypes) {
  const keyStyle =
    "dark:bg-zinc-900 bg-zinc-100 dark:hover:text-zinc-900 hover:bg-emerald-200 dark:hover:bg-emerald-400 transition mt-4 rounded-full text-xl w-12 h-12 text-center flex justify-center items-center";
  return (
    <div className="flex flex-col justify-between">
      <div className="flex justify-evenly items-center">
        <button className={keyStyle} onClick={() => props.handleClick("1")}>
          1
        </button>
        <button className={keyStyle} onClick={() => props.handleClick("2")}>
          2
        </button>
        <button className={keyStyle} onClick={() => props.handleClick("3")}>
          3
        </button>
      </div>
      <div className="flex justify-evenly items-center">
        <button className={keyStyle} onClick={() => props.handleClick("4")}>
          4
        </button>
        <button className={keyStyle} onClick={() => props.handleClick("5")}>
          5
        </button>
        <button className={keyStyle} onClick={() => props.handleClick("6")}>
          6
        </button>
      </div>
      <div className="flex justify-evenly items-center">
        <button className={keyStyle} onClick={() => props.handleClick("7")}>
          7
        </button>
        <button className={keyStyle} onClick={() => props.handleClick("8")}>
          8
        </button>
        <button className={keyStyle} onClick={() => props.handleClick("9")}>
          9
        </button>
      </div>
      <div className="flex justify-evenly items-center">
        <button className={keyStyle} onClick={() => props.handleClick("D")}>
          <IoBackspaceOutline />
        </button>
        <button className={keyStyle} onClick={() => props.handleClick("0")}>
          0
        </button>
        <button className={keyStyle} onClick={() => props.handleClick(".")}>
          .
        </button>
      </div>
    </div>
  );
}

export default Keyboard;
