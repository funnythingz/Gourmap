/// <reference path="../../typings/tsd.d.ts" />

module Gourmap {

    export interface ISearchScope extends ng.IScope {
        helloModel: any;
        shops: Array<ShopMarker>;
        map: google.maps.Map;
        callSearch: any;
        freeWord: any;
        markers: Array<google.maps.Marker>
    }

    export class GourmapController {

        private lat: number

        constructor(private $scope: ISearchScope,
                    private search,
                    private helloModel) {

            this.$scope.helloModel = helloModel;

            this.$scope.callSearch = (freeWord: string)=> this.freeWordSearch(freeWord);

            this.fitHeightForFullMap();

            var mapOptions = {
                zoom: 16,
                center: new google.maps.LatLng(HotpepperApi.lat, HotpepperApi.lng)
            }

            $scope.map = new google.maps.Map(document.getElementById('map-view'), mapOptions);

            google.maps.event.addListener($scope.map, 'drag', ()=> {this.renderMap()});

        }

        private renderMap() {
            var timer;
            if (_.isEqual(timer, false)) {
                clearTimeout(timer);
            }

            timer = setTimeout(()=> {
                HotpepperApi.lat = this.$scope.map.getCenter().lat();
                HotpepperApi.lng = this.$scope.map.getCenter().lng();
                this.freeWordSearch(this.$scope.freeWord);
            }, 300);
        }

        private fitHeightForFullMap() {

            var $map = $('#map-view');
            var $entryList = $('#entry-collection-view');

            $map.css('height', Util.getMapHeight() + 'px');
            $entryList.css('height', Util.getMapHeight() + 'px');

            var timer;
            $(window).on('resize', ()=> {
                if (_.isEqual(timer, false)) {
                    clearTimeout(timer);
                }

                timer = setTimeout(()=> {
                    $map.css('height', Util.getMapHeight() + 'px');
                    $entryList.css('height', Util.getMapHeight() + 'px');
                }, 300);
            });

        }

        private freeWordSearch(freeWord: string) {

            var apiPath: string = HotpepperApi.createApiPath(freeWord);

            var promise = this.search.$http.jsonp(apiPath);

            promise.success((json)=> {

                console.log(json.results);

                var googleMapFactory: GoogleMapFactory = new GoogleMapFactory(json);

                //this.$scope.shops = json.results.shop;
                this.$scope.shops = googleMapFactory.createShopMarkers();

                //console.log(this.$scope.shops);

                var markersFactory = new MarkersFactory(this.$scope.shops, this.$scope.map);
                this.$scope.markers = markersFactory.createMarkers();
                /**
                this.$scope.map.shopMarkers = googleMapFactory.createShopMarkers();

                angular.forEach(this.$scope.map.shopMarkers, (marker)=> {

                    marker.closeClick = ()=> {
                        marker.showWindow = false;
                        this.$scope.$apply();
                    };

                    marker.onClicked = ()=> {
                        console.log(marker);
                        marker.showWindow = true;
                        this.$scope.$apply();
                    };

                });
                /**/

            });

        }

    }

}
