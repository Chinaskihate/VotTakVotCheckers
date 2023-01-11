import {Color} from "../figures/checker";

export class ColorPicker {
    private readonly colors: Color[] = [Color.BLACK, Color.GREEN, Color.RED, Color.WHITE]

    public pickRandomColor(): Color {
        let idx: number = Math.random() % this.colors.length;
        let color: Color = this.colors[idx];
        this.colors.splice(idx, 1)
        return color;
    }
}