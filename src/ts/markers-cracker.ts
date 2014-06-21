module Gourmap {

    export class MarkersCracker {

        markerCacheList: google.maps.MVCArray = new google.maps.MVCArray();

        create(markers: Array<google.maps.Marker>) {
            angular.forEach(markers, (marker)=> {
                this.markerCacheList.push(marker);
            });
        }

        remove() {
            this.markerCacheList.forEach((marker, index)=> {
                marker.setMap(null);
            });
        }

    }

}
