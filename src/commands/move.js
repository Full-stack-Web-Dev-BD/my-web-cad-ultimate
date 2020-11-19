import Command from "./command";
import { COLORS } from '../constants';

export default class MoveCommand extends Command {

    constructor(state) {
        super(state)
        this.started = false;
        this.start = {}
        this.currentlySelected = {}
    }

    mousemove (event) {
        this.main.mouse.x = event._x;
        this.main.mouse.y = event._y;
        this.main.mouse.event = event;

        if (this.started) {
            this.main.tempShape = [{
                start_x: this.start.x,
                start_y: this.start.y,
                end_x: event._x - this.main.netPanningX,
                end_y: event._y - this.main.netPanningY
            }]
        }
    }

    mousedown (event) {
        this.start.x = event._x - this.main.netPanningX;
        this.start.y = event._y - this.main.netPanningY;
        this.started = true;
    }

    mouseup (event) {
        if (this.started) {
            this.started = false;
            this.main.tempShape.length = 0;
            this.main.shapes[this.main.selected] = {
                ...this.main.shapes[this.main.selected] ,
                x:  (event._x - this.main.netPanningX),
                y:  (event._y - this.main.netPanningY),
                color: COLORS.shapes_fill,
                stroke: COLORS.shapes_stroke
            };
            this.main.HM.set(this.main.shapes)
        }
    }

    mouseout (event) {
        if (this.started) {
            this.started = false;
            this.main.tempShape.length = 0;
            this.main.shapes[this.main.selected] = {
                ...this.main.shapes[this.main.selected] ,
                x:  (event._x - this.main.netPanningX),
                y:  (event._y - this.main.netPanningY),
                color: COLORS.shapes_fill,
                stroke: COLORS.shapes_stroke
            };
            this.main.HM.set(this.main.shapes)
        }
    }

}