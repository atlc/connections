import React from "react";
import { DayHeaderProps } from "../../types";
import DayHeader from "./DayHeader";
import PuzzleCard from "./PuzzleCard";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

/**
 *
 * @returns A card wrapping an entire day's submissions by all users
 */
const DaySet = ({ day }: DayHeaderProps) => {
    const boards = useSelector((state: RootState) => state.boards.boards);

    return (
        <div className="my-5 rounded-3 p-2 bg-light-subtle row justify-content-center">
            <DayHeader day={day} />
            {boards[day].map((b) => (
                <PuzzleCard board={b} key={`${b.name}-puzzle-card-${b.id}`} />
            ))}
        </div>
    );
};

export default DaySet;
