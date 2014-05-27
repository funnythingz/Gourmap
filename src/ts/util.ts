/// <reference path="../../typings/tsd.d.ts" />

module Util {

    export function getElmPosition(arg: string): any {
        var left: number = 0, top: number = 0;
        var elm: any = document.getElementById(arg);

        while(elm.parentNode){
            left += elm.offsetLeft;
            top += elm.offsetTop;
            elm = elm.parentNode;
        }

        return {'left': left, 'top': top};
    }

    export function getMapHeight(): number {
        return window.innerHeight - getElmPosition('result-layout').top;
    }

}
