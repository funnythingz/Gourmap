/// <reference path="../../../typings/tsd.d.ts" />

module Gourmap {

    export interface ISearchScope extends ng.IScope {
        helloModel: any;
        shops: any;
        map: any;
        callSearch: any;
    }

    export class GourmapController {

        lat: number = HotpepperApi.lat;
        lng: number = HotpepperApi.lng;

        constructor(private $scope: ISearchScope,
                    private search,
                    private helloModel) {

            this.$scope.helloModel = helloModel;

            this.$scope.callSearch = (freeWord: string)=> this.freeWordSearch(freeWord);

        }

        private freeWordSearch(freeWord: string) {

            var apiPath: string = HotpepperApi.createApiPath(freeWord);

            var promise = this.search.$http.jsonp(apiPath);

            console.log('search');
            console.log(this.lat);
            console.log(this.lng);

            this.$scope.map = {

                center: {
                    latitude: HotpepperApi.lat,
                    longitude: HotpepperApi.lng
                },

                zoom: 16,

                shopMarkers: [
                    {
                        id: 1,
                        latitude: this.lat,
                        longitude: this.lng,
                        showWindow: false,
                        title: 'shop markers'
                    }
                ]

            };

            promise.success((json)=> {
                console.log(json.results);

                var resultShops: any = json.results.shop;

                this.$scope.shops = resultShops;

                this.lat = parseFloat(resultShops[0].lat);
                this.lng = parseFloat(resultShops[0].lng);

                console.log('success');
                console.log(this.lat);
                console.log(this.lng);

            });

        }

    }

}
