import { useState, useEffect } from 'react';
import './App.scss';
import BoardComponent from './src/components/ui/board/BoardComponent';
import { Board } from './src/components/models/board';

function App() {
  const [board, setBoard] = useState(new Board());

  function restart() {
    const newBoard = new Board();

    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  }

  useEffect(() => {
    restart();
  }, []);

  return (
    <div className="App">
      <BoardComponent board={board} setBoard={setBoard} />
    </div>
  );
}

export default App;
