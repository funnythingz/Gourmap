/// <reference path="../../../typings/tsd.d.ts" />

module Gourmap {

    export interface IGourmapScope extends ng.IScope {
        title: string;
        greeting: string;
        shops: any;
    }

    export class GourmapController {

        constructor(private $scope: IGourmapScope, apiService) {

            this.$scope.title = "Gourmap";
            this.$scope.greeting = 'hello Angular !';

            var ctrl = this;

            apiService.promise.success(function(json) {
                console.log(json);
                ctrl.$scope.shops = json.results.shop;
            });

        }

    }

}
