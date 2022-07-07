import { generateRandomItem } from "../game"


export type ItemCell = {
    pos_x: number
    pos_y: number
}

export type Item = {
    color: string
    cells: ItemCell[]
    width: number
    height: number
}

export type BoxItem = {
    item: Item
    offset_x: number
    offset_y: number
}

export class GameBox {
    items: BoxItem[]
    width: number
    height: number

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.items = [];
    }

    tryToAddItem(item: Item | null): boolean {
        console.log("Try to add item");

        if (item == null) {
            item = generateRandomItem();
        }
        console.log(item);
        var boxItem: BoxItem = {
            item: item,
            offset_x: this.calculateItemOffset(item),
            offset_y: 0
        }
        console.log(boxItem);

        var loops = this.height + item.height;
        for (var loop = 0; loop < loops; loop++) {
            console.log(`Loop ${loop}`)
            console.log(boxItem);
            var insertable = this.isItemInsertable(boxItem);
            console.log(`insertable ${insertable}`)

            // increase y_offset for next loop calculation
            if (insertable) {
                boxItem.offset_y += 1;
                continue;
            }

            // collision in first loop or loop < height of item
            if (loop < item.height - 1) return false;

            // when it was insertable in atleast the first loop = 0, then insert with last y pos
            boxItem.offset_y -= 1;
            console.log("Inserted", boxItem, `Loop ${loop}`);
            this.addItem(boxItem);
            return true;
        }

        return false;
    }

    addItem(item: BoxItem) {
        this.items.push(item);
    }

    calculateItemOffset(item: Item): number {
        var max = this.width - item.width;
        return Math.floor(Math.random() * max);
    }

    isItemInsertable(boxItem: BoxItem): boolean {
        for (var itemCell of boxItem.item.cells) {
            var test_x = itemCell.pos_x + boxItem.offset_x;
            var test_y = itemCell.pos_y + boxItem.offset_y;
            var filled = this.isBoxFilledAt(test_x, test_y);
            console.log(itemCell, `${test_y},${test_x}`, filled);
            if (filled) return false;
        }

        return true;
    }

    isBoxFilledAt(x: number, y: number): boolean {
        if (x < 0 || x >= this.width) return true;
        if (y < 0 || y >= this.height) return true;

        for (var boxItem of this.items) {
            for (var itemCell of boxItem.item.cells) {
                var x_filled = x == itemCell.pos_x + boxItem.offset_x;
                var y_filled = y == itemCell.pos_y + boxItem.offset_y;
                if (x_filled && y_filled) return true;
            }
        }

        return false;
    }

    getCellColorAt(x: number, y: number): string | undefined {
        if (x < 0 || x >= this.width) return undefined;
        if (y < 0 || y >= this.height) return undefined;

        for (var boxItem of this.items) {
            for (var itemCell of boxItem.item.cells) {
                var x_filled = x == itemCell.pos_x + boxItem.offset_x;
                var y_filled = y == itemCell.pos_y + boxItem.offset_y;
                if (x_filled && y_filled) return boxItem.item.color;
            }
        }

        return undefined;
    }

}