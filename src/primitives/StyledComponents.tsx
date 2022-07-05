import tw from "tailwind-styled-components";

let colors = { primarybg: "bg-rose-300" };

export const LandingText = tw.h1`
    text-6xl
    pb-2
    font-black
    bg-clip-text text-transparent bg-gradient-to-tr from-emerald-300  to-lime-200
`;

export const Title = tw.h1`
    text-2xl
    font-bold
    text-zinc-600
    dark:text-zinc-100
    text-center
`;

export const Text = tw.p`
    text-zinc-600
    dark:text-zinc-100

`;

export const Desc = tw.p`
    px-16 text-center
    text-zinc-400
`;

export const Button = tw.button`
    px-10 py-3 w-56 rounded-xl text-center font-medium
    transition shadow-lg shadow-teal-300/50
    text-emerald-900
    bg-emerald-200 dark:bg-emerald-400 
    hover:bg-opacity-75 dark:hover:bg-opacity-90
`;

export const TextInput = tw.input`
    px-3 py-3 w-56 rounded-xl
    transition 
    focus:shadow-lg focus:shadow-teal-400/50 focus:ring-2 focus:ring-emerald-200 focus:outline-none
    bg-neutral-100 dark:bg-neutral-800 
    hover:bg-opacity-75 dark:hover:bg-opacity-50
`;

export const Checkbox = tw.input`
    w-5 h-5
    checked:bg-red-500 default:ring-2
`;

// bg-gradient-to-br from-lime-100 via-teal-100 to-emerald-100 bg-opacity-10
export const Card = tw.div`
    flex flex-col w-full 
    p-2 rounded-xl shadow-card
    dark:bg-zinc-900
`;
