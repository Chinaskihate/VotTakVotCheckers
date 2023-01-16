import {Color} from "../contract/models/figures/checker";

export class ColorPicker {
    private readonly colors: Color[] = [Color.BLACK, Color.GREEN, Color.RED, Color.WHITE];

    public pickRandomColorForPlayer(): Color {
        let idx: number = this.getRandomInt(this.colors.length);
        let color: Color = this.colors[idx];
        this.colors.splice(idx, 1);
        console.log('idx = ' + idx + ' color = ' + color);
        return color;
    }

    public pickRandomColorForFirstMove(): Color {
        return [Color.BLACK, Color.GREEN, Color.RED, Color.WHITE][this.getRandomInt(4)];
    }

    private getRandomInt(max: number): number {
        return Math.floor(Math.random() * max);
    }
}