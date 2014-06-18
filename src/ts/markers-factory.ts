module Gourmap {

    export class MarkersFactory {

        constructor(private shopMarkers: Array<ShopMarker>,
                    private map: google.maps.Map) {}

        createMarkers(): Array<google.maps.Marker> {

            return [];
        }

        createMarker(shopMarker: ShopMarker): google.maps.Marker {

            var infoWindow = new google.maps.InfoWindow();

            var marker = new google.maps.Marker({
                map: this.map,
                position: new google.maps.LatLng(shopMarker.lat, shopMarker.lng)
            });

            return null;
        }
    
    }

}
