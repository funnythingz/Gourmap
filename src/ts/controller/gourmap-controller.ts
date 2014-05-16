/// <reference path="../../../typings/tsd.d.ts" />

module Gourmap {

    export interface IGourmapScope extends ng.IScope {
        title: string;
        greeting: string;
        api: string;
    }

    export class GourmapController {

        constructor(private $scope: IGourmapScope, api) {

            this.$scope.title = "Gourmap";
            this.$scope.greeting = 'hello Angular !';

            this.$scope.api = api;

        }

    }

}
