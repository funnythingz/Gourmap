/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="controller/gourmap-controller.ts" />
/// <reference path="service/search.ts" />

module Gourmap {

    export class Apprication {

        gourmap: ng.IModule = angular.module('gourmap', ['google-maps']);

        constructor() {

            this.gourmap.controller('gourmapCtrl', GourmapController)
                        .factory('search', Search)
                        .factory('helloModel', ()=> {return new Hello('Gourmap', 'Hello, Angular');});

        }
    
    }

    new Apprication();

}
