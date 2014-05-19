/// <reference path="../../../typings/tsd.d.ts" />

module Gourmap {

    export interface IGourmapScope extends ng.IScope {
        title: string;
        greeting: string;
        shops: any;
        map;
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


            this.$scope.map = {

                center: {
                    latitude: 35.670651,
                    longitude: 139.77186099999994
                },

                zoom: 16

            };

        }

    }

}
