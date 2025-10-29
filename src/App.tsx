import { useState, useEffect } from 'react';
import './App.scss';
import { Board } from './src/components/models/board';
import { Player } from './src/components/models/Player';
import { Colors } from './src/components/models/Colors';
import LostFigures from './src/components/ui/board/lostFigures';
import BoardComponent from './src/components/ui/board/BoardComponent';

function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  function restart() {
    const newBoard = new Board();

    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  }

  useEffect(() => {
    restart();
  }, []);

  const swapPlayer = () => {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer,
    );
  };

  return (
    <div className="App">
      <div className="App__header" />
      <BoardComponent
        board={board}
        setBoard={setBoard}
        swapPlayer={swapPlayer}
        currentPlayer={currentPlayer}
      />
      <div className="App__footer">
        <LostFigures title="black figues" figures={board.lostBlackFigures} />
        <LostFigures title="white figues" figures={board.lostWhiteFigures} />
      </div>
    </div>
  );
}

export default App;
