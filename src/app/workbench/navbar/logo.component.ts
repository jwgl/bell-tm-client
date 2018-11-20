import { Component, HostListener, NgZone, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

const COLORS = [
    'AliceBlue', 'AntiqueWhite', 'Aqua',
    'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black',
    'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown',
    'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate',
    'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson',
    'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod',
    'DarkGray', 'DarkGrey', 'DarkGreen', 'DarkKhaki',
    'DarkMagenta', 'DarkOliveGreen', 'Darkorange',
    'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen',
    'DarkSlateBlue', 'DarkSlateGray', 'DarkSlateGrey',
    'DarkTurquoise', 'DarkViolet', 'DeepPink',
    'DeepSkyBlue', 'DimGray', 'DimGrey', 'DodgerBlue',
    'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia',
    'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Gray',
    'Grey', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink',
    'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender',
    'LavenderBlush', 'LawnGreen', 'LemonChiffon',
    'LightBlue', 'LightCoral', 'LightCyan',
    'LightGoldenRodYellow', 'LightGray', 'LightGrey',
    'LightGreen', 'LightPink', 'LightSalmon',
    'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray',
    'LightSlateGrey', 'LightSteelBlue', 'LightYellow',
    'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon',
    'MediumAquaMarine', 'MediumBlue', 'MediumOrchid',
    'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue',
    'MediumSpringGreen', 'MediumTurquoise',
    'MediumVioletRed', 'MidnightBlue', 'MintCream',
    'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy',
    'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed',
    'Orchid', 'PaleGoldenRod', 'PaleGreen',
    'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip',
    'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue',
    'Purple', 'Red', 'RosyBrown', 'RoyalBlue',
    'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen',
    'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue',
    'SlateGray', 'SlateGrey', 'Snow', 'SpringGreen',
    'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato',
    'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke',
    'Yellow', 'YellowGreen',
];

@Component({
    selector: 'tm-logo',
    styleUrls: ['logo.component.scss'],
    templateUrl: 'logo.component.html',
})
export class LogoComponent {
    next = true;
    t = 'red';
    m = 'green';
    tm = [1, 1, 1, 0, 1, 0, 0, 0, 0];

    constructor(private router: Router, zone: NgZone, cdr: ChangeDetectorRef) {
        zone.runOutsideAngular(() => {
            setInterval(() => {
                if (this.next) {
                    this.t = this.nextColor();
                } else {
                    this.m = this.nextColor();
                }
                this.next = !this.next;
                cdr.detectChanges();
            }, 1000);
        });
    }

    nextColor(): string {
        let color: string;
        do {
            color = COLORS[Math.floor(Math.random() * COLORS.length)];
        } while (color === this.t || color === this.m);
        return color;
    }

    @HostListener('click')
    click() {
        this.router.navigate(['/']);
    }
}
