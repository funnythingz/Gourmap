/// <reference path="../../../typings/tsd.d.ts" />

module Gourmap {

    export interface ISearchScope extends ng.IScope {
        title: string;
        greeting: string;
        shops: any;
        map: any;
        callSearch: any;
    }

    export class GourmapController {

        constructor(private $scope: ISearchScope, private search) {

            this.$scope.title = "Gourmap";
            this.$scope.greeting = 'hello Angular !';

            this.$scope.callSearch = (freeWord: string)=> this.freeWordSearch(freeWord);

            this.$scope.map = {

                center: {
                    latitude: 35.670651,
                    longitude: 139.77186099999994
                },

                zoom: 16

            };

        }

        private freeWordSearch(freeWord: string) {

            var apiPath: string = HotpepperApi.createApiPath(freeWord);

            var promise = this.search.$http.jsonp(apiPath);

            promise.success((json)=> {
                this.$scope.shops = json.results.shop;
            });

        }

    }

}
