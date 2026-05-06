import { STADIUM_SECTIONS } from '../data/stadiumConfig';
import { StandSection } from './StandSection';

export function Stands() {
  return (
    <>
      {STADIUM_SECTIONS.map((section) => (
        <StandSection key={section.id} section={section} />
      ))}
    </>
  );
}
