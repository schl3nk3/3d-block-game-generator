import React from "react";
import { GameBox } from "../game/elements/Box";
import { Box } from "@mui/material";


export default function GameGrid(props: {
    gameBox: GameBox
}) {
    const { gameBox } = props
    const rows = Array.from(Array(gameBox.height).keys());
    const columns = Array.from(Array(gameBox.width).keys());

    const cellColor = (x: number, y: number): string => {

        return gameBox.getCellColorAt(x, y) ?? "#EEEEEE";
    }

    return (
        <React.Fragment>
            <div id="gameGrid">
                {rows.map((y) => {
                    return (
                        <Box key={`${y}`} sx={{
                            height: "36px"
                        }}>
                            {columns.map((x) => {
                                const _cellColor = cellColor(x, y);
                                return (
                                    <Box key={x} sx={{
                                        display: "inline-block",
                                        // m: 1,
                                        width: "10px",
                                        height: "10px",
                                        p: "8px",
                                        backgroundColor: _cellColor,
                                        border: `5px outset ${_cellColor}44`
                                    }}></Box>
                                )
                            })}
                        </Box>
                    )

                })}
            </div>
        </React.Fragment>
    )
}