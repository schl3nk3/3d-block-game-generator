import { GameBox, BoxItem, Item, ItemCell } from "./elements/Box";


export function generateRandomItem(): Item {
    var items = [TItem_, XItem_, LItem_, ZItem_, WItem_];
    var randomItem = items[Math.floor(Math.random() * items.length)];

    var item = Object.assign(Object.create(Object.getPrototypeOf(randomItem)), randomItem)

    if (Math.random() > 0.5) {
        item.cells = transposeCells(item.cells);
        var w = item.width;
        item.width = item.height;
        item.height = w;
    }

    return item;
}

export function generateItem(type: "T" | "W" | "X" | "Z" | "L") {
    var item: Item;
    switch (type) {
        case "T":
            item = Object.assign(Object.create(Object.getPrototypeOf(TItem_)), TItem_);
            break;
        case "W":
            item = Object.assign(Object.create(Object.getPrototypeOf(WItem_)), WItem_);
            break;
        case "X":
            item = Object.assign(Object.create(Object.getPrototypeOf(XItem_)), XItem_);
            break;
        case "L":
            item = Object.assign(Object.create(Object.getPrototypeOf(LItem_)), LItem_);
            break;
        case "Z":
            item = Object.assign(Object.create(Object.getPrototypeOf(ZItem_)), ZItem_);
            break;
        default:
            item = Object.assign(Object.create(Object.getPrototypeOf(ZItem_)), ZItem_);
            break;
    }
    if (Math.random() > 0.5) {
        item.cells = transposeCells(item.cells);
        var w = item.width;
        item.width = item.height;
        item.height = w;
    }


    return item;

}

function transposeCells(cells: ItemCell[]): ItemCell[] {
    return cells.map((cell): ItemCell => {
        return {
            pos_x: cell.pos_y,
            pos_y: cell.pos_x,
        }
    })
}

const TItem_: Item =
{
    color: "#FF00AA",
    cells: [
        { pos_x: 0, pos_y: 0 },
        { pos_x: 1, pos_y: 0 },
        { pos_x: 2, pos_y: 0 },
        { pos_x: 1, pos_y: 1 }
    ],
    width: 3,
    height: 2
};

const XItem_: Item =
{
    color: "#00FF00",
    cells: [
        { pos_x: 1, pos_y: 0 },
        { pos_x: 0, pos_y: 1 },
        { pos_x: 1, pos_y: 1 },
        { pos_x: 2, pos_y: 1 },
        { pos_x: 1, pos_y: 2 }
    ],
    width: 3,
    height: 3
};
const LItem_: Item =
{
    color: "#00FFFF",
    cells: [
        { pos_x: 0, pos_y: 0 },
        { pos_x: 0, pos_y: 1 },
        { pos_x: 1, pos_y: 1 },
    ],
    width: 2,
    height: 2
};
const ZItem_: Item =
{
    color: "#FF0000",
    cells: [
        { pos_x: 0, pos_y: 0 },
        { pos_x: 0, pos_y: 1 },
        { pos_x: 1, pos_y: 1 },
        { pos_x: 2, pos_y: 1 },
        { pos_x: 2, pos_y: 2 }
    ],
    width: 2,
    height: 3
};
const WItem_: Item =
{
    color: "#0000FF",
    cells: [
        { pos_x: 0, pos_y: 0 },
        { pos_x: 0, pos_y: 1 },
        { pos_x: 1, pos_y: 1 },
        { pos_x: 1, pos_y: 2 },
        { pos_x: 2, pos_y: 2 }
    ],
    width: 2,
    height: 3
};
