type NeighboursType = {
  nw: [number, number]; //	-1, 1
  n: [number, number]; //	0, 1
  ne: [number, number]; //	1, 1
  w: [number, number]; //	-1, 0
  c: [number, number]; //	0, 0
  e: [number, number]; //	1, 0
  sw: [number, number]; //	-1, -1
  s: [number, number]; //	0, -1
  se: [number, number]; //	1, -1

  liveCellesCount: number;
  IsUnderpopulated: boolean;
  IsOverpopulated: boolean;
  IsReproducible: boolean;
};

export default NeighboursType;
