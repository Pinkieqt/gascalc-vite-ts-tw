import React from "react";

interface PropTypes {
  consumption: string;
  price: string;
  totalpaid: string;
  avgdist: string;
  avgliter: string;
  totaltank: string;
}

function HomeStats(data: PropTypes) {
  return (
    <div className="w-full">
      <div className="shadow-card rounded-xl w-full mt-5 mb-3 bg-teal-200 bg-opacity-10 dark:bg-opacity-20">
        <div className="flex justify-around items-center py-2">
          <div className="text-center w-1/2 border-r border-teal-500 dark:border-teal-200">
            <div className="text-sm text-teal-500 dark:text-teal-200">
              průměrná spotřeba
            </div>
            <div className="text-3xl font-bold">{data.consumption}</div>
            <div className="text-xs text-zinc-400">l/100km</div>
          </div>
          <div className="text-center w-1/2">
            <div className="text-sm text-teal-500 dark:text-teal-200">
              průměrná cena
            </div>
            <div className="text-3xl font-bold">{data.price}</div>
            <div className="text-xs text-zinc-400">czk/l</div>
          </div>
        </div>
      </div>
      {/*
      <div className="shadow-card rounded-xl w-full mb-3 bg-rose-200 bg-opacity-10 dark:bg-opacity-20">
        <div className="flex justify-around items-center py-2">
          <div className="text-center w-1/2 border-r border-rose-500 dark:border-rose-200">
            <div className="text-sm text-rose-500 dark:text-rose-200">
              průměrně natankováno
            </div>
            <div className="text-3xl font-bold">{data.avgliter}</div>
            <div className="text-xs text-zinc-400">l</div>
          </div>
          <div className="text-center w-1/2">
            <div className="text-sm text-rose-500 dark:text-rose-200">
              průměrný dojezd
            </div>
            <div className="text-3xl font-bold">{data.avgdist}</div>
            <div className="text-xs text-zinc-400">km</div>
          </div>
        </div>
      </div>
      */}
      <div className="shadow-card rounded-xl w-full mb-10 bg-violet-200 bg-opacity-10 dark:bg-opacity-20">
        <div className="flex justify-around items-center py-2">
          <div className="text-center w-1/2 border-r border-violet-500 dark:border-violet-200">
            <div className="text-sm text-violet-500 dark:text-violet-200">
              celkem zaplaceno
            </div>
            <div className="text-3xl font-bold">{data.totalpaid}</div>
            <div className="text-xs text-zinc-400">czk</div>
          </div>
          <div className="text-center w-1/2">
            <div className="text-sm text-violet-500 dark:text-violet-200">
              počet tankování
            </div>
            <div className="text-3xl font-bold">{data.totaltank}</div>
            <div className="text-xs text-zinc-400">x</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeStats;
