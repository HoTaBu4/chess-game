import { useState, useEffect, useCallback } from 'react';
import './App.scss';
import { Board } from './src/components/models/board';
import { Player } from './src/components/models/Player';
import { Colors } from './src/components/models/Colors';
import LostFigures from './src/components/ui/board/lostFigures';
import BoardComponent from './src/components/ui/board/BoardComponent';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const NUMBERS = [8, 7, 6, 5, 4, 3, 2, 1];

function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [winner, setWinner] = useState<Colors | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const restart = useCallback(() => {
    const newBoard = new Board();

    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
    setWinner(null);
    setGameOver(false);
  }, [whitePlayer]);

  useEffect(() => {
    restart();
  }, [restart]);

  const swapPlayer = () => {
    if (gameOver) {
      return;
    }

    setCurrentPlayer(prev =>
      prev?.color === Colors.WHITE ? blackPlayer : whitePlayer,
    );
  };

  const handleGameOver = (winnerColor: Colors) => {
    setWinner(winnerColor);
    setGameOver(true);
    setCurrentPlayer(null);
  };

  const statusText = (() => {
    if (winner) {
      return `${winner === Colors.WHITE ? 'White' : 'Black'} wins by checkmate`;
    }

    if (currentPlayer) {
      const colorLabel =
        currentPlayer.color === Colors.WHITE ? 'White' : 'Black';
      const inCheck = board.isKingUnderAttack(currentPlayer.color);

      if (inCheck) {
        return `${colorLabel} is in check`;
      }

      return `Current move: ${colorLabel}`;
    }

    return 'Preparing game...';
  })();

  return (
    <div className="App">
      <div className="app__layout">
        <div className="app__panel">
          <div className="app__header">{statusText}</div>
          <div className="board-frame">
            <div className="board-frame__row board-frame__row--top">
              {LETTERS.map(letter => (
                <span key={`top-${letter}`}>{letter}</span>
              ))}
            </div>
            <div className="board-frame__center">
              <div className="board-frame__col board-frame__col--left">
                {NUMBERS.map(num => (
                  <span key={`left-${num}`}>{num}</span>
                ))}
              </div>
              <div className="board-frame__board">
                <BoardComponent
                  board={board}
                  setBoard={setBoard}
                  swapPlayer={swapPlayer}
                  currentPlayer={currentPlayer}
                  onGameOver={handleGameOver}
                  gameOver={gameOver}
                />
              </div>
              <div className="board-frame__col board-frame__col--right">
                {NUMBERS.map(num => (
                  <span key={`right-${num}`}>{num}</span>
                ))}
              </div>
            </div>
            <div className="board-frame__row board-frame__row--bottom">
              {LETTERS.map(letter => (
                <span key={`bottom-${letter}`}>{letter}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="app__sidebar">
          <LostFigures
            title="Captured (Black)"
            figures={board.lostBlackFigures}
          />
          <LostFigures
            title="Captured (White)"
            figures={board.lostWhiteFigures}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
