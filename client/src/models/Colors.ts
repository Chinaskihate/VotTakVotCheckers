import {Color} from "../contract/models/figures/checker"

export enum ColorUI {
    BLACK = 'black',
    WHITE = 'white',
    GREEN = 'green',
    RED = 'red',
}

export const castContractColor = (contractColor: Color): ColorUI => {
  switch (contractColor) {
      case Color.WHITE:
          return ColorUI.WHITE;
      case Color.BLACK:
          return ColorUI.BLACK;
      case Color.RED:
          return ColorUI.RED;
      default:
          return ColorUI.GREEN;
  }
};

export const compareColors = (clientColor: ColorUI, contractColor: Color) => {
    if (clientColor === ColorUI.BLACK && contractColor === Color.BLACK) {
        return true;
    }
    if (clientColor === ColorUI.RED && contractColor === Color.RED) {
        return true;
    }
    if (clientColor === ColorUI.GREEN && contractColor === Color.GREEN) {
        return true;
    }
    if (clientColor === ColorUI.WHITE && contractColor === Color.WHITE) {
        return true;
    }
    return false;
}

export enum CellColors {
    BLACK = 'black-cell',
    WHITE = 'white-cell'
}