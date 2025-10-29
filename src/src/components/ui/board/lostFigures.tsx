import { Figure } from '../../models/figures/figure';

interface Props {
  title: string;
  figures: Figure[];
}

type AggregatedEntry = {
  count: number;
  logo: Figure['logo'];
  name: string;
};

const LostFigures: React.FC<Props> = ({ title, figures }) => {
  const aggregated = figures.reduce((acc, figure) => {
    const key = figure.name;
    const current = acc.get(key) ?? {
      count: 0,
      logo: figure.logo ?? null,
      name: figure.name,
    };

    acc.set(key, {
      name: current.name,
      logo: figure.logo ?? current.logo,
      count: current.count + 1,
    });

    return acc;
  }, new Map<string, AggregatedEntry>());

  const entries = Array.from(aggregated.values()).sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <div className="lost">
      <h3>{title}</h3>
      {entries.length === 0 && <div className="lost__empty">No captures</div>}
      {entries.map(entry => (
        <div key={entry.name} className="lost__item">
          {entry.logo && (
            <img src={entry.logo} className="lost__img" alt={entry.name} />
          )}
          <span className="lost__label">
            {entry.name} ×{entry.count}
          </span>
        </div>
      ))}
    </div>
  );
};

export default LostFigures;
