import React from "react";

interface PropTypes {
  consumption: string;
  price: string;
  totalpaid: string;
  avgdist: string;
}

function HomeStats(data: PropTypes) {
  return (
    <div className="w-full">
      <div className="shadow-card rounded-xl w-full my-1 bg-teal-200 bg-opacity-10 dark:bg-opacity-20">
        <div className="flex justify-around items-center py-2">
          <div className="text-center w-1/2 border-r border-slate-400">
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
      <div className="shadow-card rounded-xl w-full my-5 bg-rose-200 bg-opacity-10 dark:bg-opacity-20">
        <div className="flex justify-around items-center py-2">
          <div className="text-center w-1/2 border-r border-slate-400">
            <div className="text-sm text-rose-500 dark:text-rose-200">
              zaplaceno celkem
            </div>
            <div className="text-3xl font-bold">{data.totalpaid}</div>
            <div className="text-xs text-zinc-400">czk</div>
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
    </div>
  );
}

export default HomeStats;
