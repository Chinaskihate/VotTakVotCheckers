import {Color} from "../contract/models/figures/checker";

export class ColorPicker {
    private readonly colors: Color[] = [Color.BLACK, Color.GREEN, Color.RED, Color.WHITE]

    public pickRandomColor(): Color {
        let idx: number = this.getRandomInt(this.colors.length + 1);
        let color: Color = this.colors[idx];
        this.colors.splice(idx, 1);
        console.log('idx = ' + idx + ' color = ' + color);
        return color;
    }

    private getRandomInt(max: number): number {
        return Math.floor(Math.random() * max);
    }
}