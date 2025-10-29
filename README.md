# Chess Game (React + TypeScript)

An interactive chess board built with React, TypeScript, and SCSS. The project focuses on core gameplay rules: enforcing legal moves, preventing players from leaving their king in check, and detecting checkmate—all wrapped in a modern, responsive UI.

## Features

- ♔ **Complete chessboard** with all standard pieces and move logic.
- ⚠️ **King safety enforcement**: illegal moves that expose the king are blocked; checkmate ends the game automatically.
- ✨ **Dynamic highlighting** for possible moves, selected squares, and previous selections.
- 📊 **Captured pieces tracker** groups captured material by type and count.
- 📱 **Responsive design** scales from desktop to small phones while keeping ranks/files readable.

## Getting Started

```bash
# install dependencies
npm install

# start development server
npm start

# build production bundle
npm run build
```

The app boots on `http://localhost:3000` by default.

## Project Structure

- `src/App.tsx` – application shell, status banner, and layout frame.
- `src/src/components/models` – game domain layer (board, cells, pieces, colors, players).
- `src/src/components/ui/board` – board rendering, individual cell components, and captured-piece UI.
- `src/App.scss` – global styling and responsive breakpoints.

## Gameplay Notes

- Only legal moves are offered/highlighted; the UI prevents you from ending a turn in self-check.
- After each move the engine evaluates whether the opponent is in checkmate and displays the winner.
- Captured material is tallied per piece type for both sides.

## Future Ideas

- Castling, en passant, pawn promotion choice.
- Move history / undo stack.
- AI opponent or online multiplayer.

Feel free to fork and extend the game. Contributions and suggestions are welcome!***
