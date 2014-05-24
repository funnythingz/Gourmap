/// <reference path="../../../typings/tsd.d.ts" />

module Gourmap {

    export interface ISearchScope extends ng.IScope {
        helloModel: any;
        shops: any;
        map: any;
        callSearch: any;
    }

    export class GourmapController {

        constructor(private $scope: ISearchScope,
                    private search,
                    private helloModel) {

            this.$scope.helloModel = helloModel;

            this.$scope.callSearch = (freeWord: string)=> this.freeWordSearch(freeWord);

        }

        private freeWordSearch(freeWord: string) {

            var apiPath: string = HotpepperApi.createApiPath(freeWord);

            var promise = this.search.$http.jsonp(apiPath);

            this.$scope.map = {

                center: {
                    latitude: HotpepperApi.lat,
                    longitude: HotpepperApi.lng
                },

                zoom: 16

            };

            promise.success((json)=> {

                console.log(json.results);

                var googleMapFactory: GoogleMapFactory = new GoogleMapFactory(json);

                var resultShops: any = json.results.shop;

                this.$scope.shops = resultShops;

                this.$scope.map.shopMarkers = googleMapFactory.createShopMarkers();

            });

        }

    }

}
