module Gourmap {

    export class MarkersFactory {

        markerCacheList: google.maps.MVCArray = new google.maps.MVCArray();

        constructor(private shopMarkers: Array<ShopMarker>,
                    private map: google.maps.Map) {}

        createMarkers(): Array<google.maps.Marker> {

            var resultMarkers: Array<google.maps.Marker> = [];

            angular.forEach(this.shopMarkers, (shopMarker)=> {

                var marker: google.maps.Marker = this.createMarker(shopMarker);

                resultMarkers.push(marker);

                this.markerCacheList.push(marker);
            });

            return resultMarkers;
        }

        createMarker(shopMarker: ShopMarker): google.maps.Marker {

            var infoWindow: google.maps.InfoWindow = new google.maps.InfoWindow({
                content: '<div class="info"><a href="http://www.hotpepper.jp/str' + shopMarker.id + '" target="_blank">' + shopMarker.name + '</a></div>'
            });

            var marker: google.maps.Marker = new google.maps.Marker({
                map: this.map,
                position: new google.maps.LatLng(shopMarker.lat, shopMarker.lng)
            });

            google.maps.event.addListener(marker, 'click', ()=> {
                infoWindow.open(this.map, marker);
            });

            return marker;
        }

        removeAllMarker() {
            this.markerCacheList.forEach((marker, index)=> {
                console.log(index);
                marker.setMap(null);
            });
        }

    }

}
