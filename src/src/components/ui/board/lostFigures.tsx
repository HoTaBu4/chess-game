import { Figure } from '../../models/figures/figure';

interface Props {
  title: string;
  figures: Figure[];
}

const LostFigures: React.FC<Props> = ({ title, figures }) => {
  return (
    <div className="lost">
      <h3>{title}</h3>
      {figures.map(elem => (
        <div key={elem.id} className="lost__item">
          {elem.name}{' '}
          {elem.logo && (
            <img src={elem.logo} className="lost__img" alt={elem.name} />
          )}
        </div>
      ))}
    </div>
  );
};

export default LostFigures;
