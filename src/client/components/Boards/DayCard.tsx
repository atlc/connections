import React from "react";
import { DayHeaderProps } from "../../types";
import DayHeader from "./DayHeader";
import PuzzleCard from "./PuzzleCard";

/**
 *
 * @returns A card wrapping an entire day's submissions by all users
 */
const DayCard = ({ boards, day }: DayHeaderProps) => {
    return (
        <div className="my-5 rounded-3 p-2 bg-light-subtle row justify-content-center">
            <DayHeader boards={boards} day={day} />
            {boards[day].map((b) => (
                <PuzzleCard board={b} key={`${b.name}-puzzle-card-${b.id}`} />
            ))}
        </div>
    );
};

export default DayCard;
