/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="controller/gourmap-controller.ts" />
/// <reference path="service/api.ts" />

module Gourmap {

    export class Apprication {

        gourmap: ng.IModule = angular.module('gourmap', ['google-maps']);

        constructor() {

            this.gourmap.controller('gourmapCtrl', GourmapController)
                        .factory('apiService', ApiService);

        }
    
    }

    new Apprication();

}
