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

  const restart = useCallback(() => {
    const newBoard = new Board();

    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  }, [whitePlayer]);

  useEffect(() => {
    restart();
  }, [restart]);

  const swapPlayer = () => {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer,
    );
  };

  const currentTurnLabel =
    currentPlayer?.color === Colors.WHITE ? 'White' : 'Black';

  return (
    <div className="App">
      <div className="app__layout">
        <div className="app__panel">
          <div className="app__header">
            {currentPlayer ? `Current move: ${currentTurnLabel}` : 'Loading...'}
          </div>
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
