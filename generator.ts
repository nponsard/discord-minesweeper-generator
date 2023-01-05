const boxTypes = ["🟦", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
const redBox = "🟥";

export default function GenerateMinesweeper(
  width: number,
  height: number,
  mines: number
) {
  const board = new Array(width);
  for (let i = 0; i < width; i++) {
    board[i] = new Array(height);
  }

  let minesPlaced = 0;

  while (minesPlaced < mines) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);

    if (board[x][y] === undefined) {
      board[x][y] = `||${redBox}||`;
      minesPlaced++;
    }
  }

  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[x].length; y++) {
      if (board[x][y] === undefined) {
        let neighbors = 0;

        for (let j = -1; j <= 1; j++) {
          for (let k = -1; k <= 1; k++) {
            const neighborX = x + j;
            const neighborY = y + k;

            if (
              neighborX >= 0 &&
              neighborX < width &&
              neighborY >= 0 &&
              neighborY < height
            ) {
            
              if (board[neighborX][neighborY] === `||${redBox}||`) {
                neighbors++;
              }
            }
          }
        }
        board[x][y] = `||${boxTypes[neighbors]}||`;
      }
    }
  }

  return board;
}

export function formatBoard(board: string[][]) {
  let output = "";

  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[x].length; y++) {
      output += board[x][y];
    }
    output += "\n";
  }

  return output;
}

const askedWidth = parseInt(Deno.args[0])
const askedHeight = parseInt(Deno.args[1])
const askedMines = parseInt(Deno.args[2])

if (isNaN(askedWidth) || isNaN(askedHeight) || isNaN(askedMines)) {
  console.log("Invalid arguments")
  console.log("Usage: deno run generator.ts <width> <height> <mines>")
  Deno.exit(1)
}


console.log(`Minesweeper, ${askedWidth}x${askedHeight} with ${askedMines} mines`)
console.log(formatBoard(GenerateMinesweeper(askedWidth, askedHeight, askedMines)));

