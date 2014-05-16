/// <reference path="../../../typings/tsd.d.ts" />

module Gourmap {

    export interface IGourmapScope extends ng.IScope {
        title: string;
        greeting: string;
    }

    export class GourmapController {

        constructor(private $scope: IGourmapScope) {

            this.$scope.title = "Gourmap";
            this.$scope.greeting = 'hello Angular !';

        }

    }

}
