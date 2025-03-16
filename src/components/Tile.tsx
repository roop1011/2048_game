
import { useMemo } from 'react';
import { Position } from '@/lib/gameLogic';

interface TileProps {
  value: number;
  position: Position;
  size: number;
  isNew?: boolean;
  isMerged?: boolean;
}

const Tile = ({ value, position, size, isNew = false, isMerged = false }: TileProps) => {
  // Calculate position based on grid size
  const style = useMemo(() => {
    const positionStyle = {
      top: `calc(${position.row * (100 / size)}% + 8px)`,
      left: `calc(${position.col * (100 / size)}% + 8px)`,
      width: `calc(${100 / size}% - 16px)`,
      height: `calc(${100 / size}% - 16px)`,
    };
    return positionStyle;
  }, [position.row, position.col, size]);

  // Determine text size based on number length
  const textSize = useMemo(() => {
    const length = value.toString().length;
    if (length > 3) return 'text-lg md:text-2xl';
    if (length > 2) return 'text-xl md:text-3xl';
    return 'text-2xl md:text-4xl';
  }, [value]);

  // Determine background color and text color based on value
  const getTileColors = (tileValue: number) => {
    // Each number has its own unique color scheme
    switch (tileValue) {
      case 2:
        return { bg: '#1E293B', text: '#F8FAFC' };     // Slate 800
      case 4:
        return { bg: '#312E81', text: '#E0E7FF' };     // Indigo 900
      case 8:
        return { bg: '#581C87', text: '#F3E8FF' };     // Purple 900
      case 16:
        return { bg: '#701A75', text: '#FAE8FF' };     // Fuchsia 900
      case 32:
        return { bg: '#831843', text: '#FCE7F3' };     // Pink 900
      case 64:
        return { bg: '#881337', text: '#FFE4E6' };     // Rose 900
      case 128:
        return { bg: '#7C2D12', text: '#FFEDD5' };     // Orange 900
      case 256:
        return { bg: '#713F12', text: '#FEF3C7' };     // Amber 900
      case 512:
        return { bg: '#365314', text: '#ECFCCB' };     // Lime 900
      case 1024:
        return { bg: '#064E3B', text: '#D1FAE5' };     // Emerald 900
      case 2048:
        return { bg: '#134E4A', text: '#CCFBF1' };     // Teal 900
      case 4096:
        return { bg: '#164E63', text: '#CFFAFE' };     // Cyan 900
      case 8192:
        return { bg: '#0C4A6E', text: '#E0F2FE' };     // Sky 900
      case 16384:
        return { bg: '#1E3A8A', text: '#DBEAFE' };     // Blue 900
      case 32768:
        return { bg: '#4A044E', text: '#FAE8FF' };     // Purple 950
      case 65536:
        return { bg: '#9F1239', text: '#FFE4E6' };     // Rose 800
      default:
        return { bg: '#0F172A', text: '#F8FAFC' };     // Slate 900
    }
  };

  // Determine animation class
  const animationClass = useMemo(() => {
    if (isNew) return 'animate-tile-appear';
    if (isMerged) return 'animate-tile-merge';
    return '';
  }, [isNew, isMerged]);

  const { bg, text } = getTileColors(value);

  return (
    <div 
      className={`tile ${textSize} ${animationClass}`}
      style={{
        ...style,
        backgroundColor: bg,
        color: text,
        zIndex: value,
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        transition: 'background-color 0.1s ease-in-out'
      }}
    >
      {value}
    </div>
  );
};

export default Tile;
