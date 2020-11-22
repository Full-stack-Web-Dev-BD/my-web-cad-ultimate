import Command from './command';

import { COLORS, TEXT } from '../constants';
import { trackSelection } from '../utils'

export default class TextCommand extends Command {

    constructor(state) {
        super(state)
        this.started = false;
        this.start = {}
    }

    mousemove(event) {
        this.main.mouse.x = event._x;
        this.main.mouse.y = event._y;
        this.main.mouse.event = event;

        if (this.started) {
            this.main.tempShape = [{
                start_x: this.start.x,
                start_y: this.start.y,
                end_x: event._x - this.main.netPanningX,
                end_y: event._y - this.main.netPanningY,
                stroke: COLORS.LINES
            }]
        }
    }

    mousedown(event) {
        this.start.x = event._x - this.main.netPanningX;
        this.start.y = event._y - this.main.netPanningY;
        this.started = true;
    }

    mouseup(event) {
        if (this.started) {
            this.started = false;
            this.main.tempShape.length = 0;
            this.main.shapes.push(trackSelection({
                start_x: this.start.x,
                start_y: this.start.y,
                end_x: event._x - this.main.netPanningX,
                end_y: event._y - this.main.netPanningY,
                stroke: COLORS.LINES
            }));
            this.main.shapes.push(trackSelection({
                start_x: (event._x - this.main.netPanningX) + TEXT.OFFSET,
                start_y: (event._y - this.main.netPanningY) - TEXT.OFFSET,
                text: 'Solo per i tuoi occhi',
                font: TEXT.FONT,
                fill: COLORS.shapes_stroke
            }));
            this.main.HM.set(this.main.shapes)
        }
    }

    mouseout(event) {
        if (this.started) {
            this.started = false;
            this.main.tempShape.length = 0;
            this.main.shapes.push(trackSelection({
                start_x: this.start.x,
                start_y: this.start.y,
                end_x: event._x - this.main.netPanningX,
                end_y: event._y - this.main.netPanningY,
                stroke: COLORS.shapes_stroke
            }));
            this.main.HM.set(this.main.shapes)
        }
    }

}