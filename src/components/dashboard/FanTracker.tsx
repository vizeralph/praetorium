"use client";

import { Fan } from "lucide-react";
import type { FanTrackerProps } from "@/types/appliances";
import { formatTime } from "@/lib/time";
import { useFanTimer } from "@/hooks/useFanTimer";

export default function FanTracker({ applianceName }: FanTrackerProps) {
  const { status, timeLeft, start6Hours, togglePause, stop } = useFanTimer();

  return (
    <section className="rounded-2xl border border-solid border-[#27272a] bg-[#18181b] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="m-0 font-bold tracking-tight text-zinc-100">
          {applianceName}
        </h3>
        <span
          className={`text-sm font-bold ${
            status === "ACTIVE"
              ? "text-[#34d399]"
              : status === "PAUSED"
                ? "text-[#f59e0b]"
                : "text-[#a1a1aa]"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mb-4 flex h-35 items-center justify-center rounded-xl border border-solid border-[#27272a] bg-[#09090b]">
        <Fan
          className={`size-25 transition-all ${
            status === "ACTIVE"
              ? "animate-spin text-[#34d399] [animation-direction:reverse] [animation-duration:3s]"
              : status === "PAUSED"
                ? "text-[#f59e0b]"
                : "text-[#52525b]"
          }`}
        />
      </div>

      <div className="mb-6 rounded-xl border border-solid border-[#27272a]/40 bg-[#09090b]/50 p-4 text-center">
        <p className="m-0 mb-1 text-xs font-bold tracking-wider text-[#71717a] uppercase">
          Time Remaining
        </p>
        <p className="m-0 font-mono text-2xl font-black tracking-tight text-[#fafafa]">
          {status === "IDLE" ? "00h 00m 00s" : formatTime(timeLeft)}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {status === "IDLE" ? (
          <button
            className="w-full cursor-pointer rounded-xl bg-[#fafafa] p-3.5 font-bold text-[#09090b] transition-transform active:scale-[0.98]"
            onClick={start6Hours}
          >
            Start 6 Hours
          </button>
        ) : (
          <div className="flex w-full gap-2">
            <button
              className={`flex-1 cursor-pointer rounded-xl border border-solid p-3.5 text-center font-bold ${
                status === "ACTIVE"
                  ? "border-[#f59e0b] bg-transparent text-[#f59e0b]"
                  : "border-[#34d399] bg-transparent text-[#34d399]"
              }`}
              onClick={togglePause}
            >
              {status === "ACTIVE" ? "Pause" : "Resume"}
            </button>

            <button
              className="flex-1 cursor-pointer rounded-xl border border-solid border-[#f43f5e] bg-transparent p-3.5 font-bold text-[#f43f5e]"
              onClick={stop}
            >
              Stop
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
