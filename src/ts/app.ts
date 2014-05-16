/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="controller/gourmap-controller.ts" />

module Gourmap {

    export class Apprication {

        gourmap: ng.IModule = angular.module('gourmap', []);

        constructor() {
            this.gourmap.controller('gourmapCtrl', GourmapController);
        }
    
    }

    new Apprication();

}
