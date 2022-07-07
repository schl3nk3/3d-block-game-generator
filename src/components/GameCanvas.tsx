import { Container, Icon, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { BoxItem, GameBox } from "../game/elements/Box";
import { generateItem, generateRandomItem } from "../game/game"
import GameGrid from "./GameGrid";
import { documentToSVG, elementToSVG, inlineResources } from 'dom-to-svg'

import './GameCanvas.css';

export default function GameCanvas() {
    const handleAddItem = () => {
        var gameBoxCopy: GameBox = Object.assign(Object.create(Object.getPrototypeOf(gameBox)), gameBox)
        gameBox.tryToAddItem(null);
        setGameBox(gameBoxCopy);
    }

    const handleAddItemOfType = (type: "T" | "W" | "X" | "Z" | "L") => {
        var gameBoxCopy: GameBox = Object.assign(Object.create(Object.getPrototypeOf(gameBox)), gameBox)
        gameBox.tryToAddItem(generateItem(type));
        setGameBox(gameBoxCopy);
    }

    const reset = () => {
        var gameBoxCopy: GameBox = Object.assign(Object.create(Object.getPrototypeOf(gameBox)), gameBox)
        gameBoxCopy.items = [];
        setGameBox(gameBoxCopy);
    }

    const saveSvg = async () => {
        // Capture the whole document
        // const svgDocument = documentToSVG(document)

        // Capture specific element
        const element = document.querySelector('#gameGrid');
        if (element === null) return;

        const svgDocument = elementToSVG(element)

        // Inline external resources (fonts, images, etc) as data: URIs
        await inlineResources(svgDocument.documentElement)

        // Get SVG string
        const svgString = new XMLSerializer().serializeToString(svgDocument)

        // console.log(svgString);

        var container = document.getElementById("exports");
        if (container === null) return;


        var node = document.createElement("div");
        node.classList.add("exportCanvasBox");
        var nodeSvg = document.createElement("div");
        nodeSvg.classList.add("exportCanvas");
        nodeSvg.innerHTML = svgString;

        node.appendChild(nodeSvg);
        container.appendChild(node);
    }

    const clear = () => {
        var container = document.getElementById("exports");
        if (container === null) return;
        container.innerHTML = "";
    }


    const [gameBox, setGameBox] = React.useState<GameBox>(new GameBox(10, 10));


    return (
        <React.Fragment>
            <Container sx={{ p: 3, textAlign: "center", alignItems: "center" }}>
                <Typography variant="h2" gutterBottom component="div" className="no-print">
                    3D Block Game Generator
                </Typography>
                <Grid container spacing={2} alignItems="center"
                    justifyContent="center">
                    <Grid item className="no-print">
                        <Stack spacing={2} direction="column">
                            <Button onClick={reset} color="error" variant="contained" startIcon={<Icon>delete</Icon>}>reset</Button>
                            <Button onClick={handleAddItem} variant="contained" startIcon={<Icon>shuffle_on</Icon>}>add item</Button>
                            <Button onClick={(e) => handleAddItemOfType("T")} variant="outlined" startIcon={<Icon>add</Icon>}>add item T</Button>
                            <Button onClick={(e) => handleAddItemOfType("W")} variant="outlined" startIcon={<Icon>add</Icon>}>add item W</Button>
                            <Button onClick={(e) => handleAddItemOfType("X")} variant="outlined" startIcon={<Icon>add</Icon>}>add item X</Button>
                            <Button onClick={(e) => handleAddItemOfType("Z")} variant="outlined" startIcon={<Icon>add</Icon>}>add item Z</Button>
                            <Button onClick={(e) => handleAddItemOfType("L")} variant="outlined" startIcon={<Icon>add</Icon>}>add item L</Button>
                        </Stack>
                    </Grid>
                    <Grid item className="no-print">
                        <GameGrid gameBox={gameBox} />
                    </Grid>
                    <Grid item className="no-print">
                        <Stack spacing={2} direction="column">
                            <Button onClick={saveSvg} color="secondary" variant="contained" startIcon={<Icon>save</Icon>}>save</Button>
                            <Button onClick={print} color="secondary" variant="contained" startIcon={<Icon>print</Icon>}>print</Button>
                            <Button onClick={clear} color="secondary" variant="outlined" startIcon={<Icon>delete</Icon>}>clear</Button>
                        </Stack>
                    </Grid>
                </Grid>
                <div id="exports">

                </div>
            </Container>
        </React.Fragment >
    )
}