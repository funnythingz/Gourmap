module Gourmap {

    export class GoogleMapFactory {

        constructor(private json: any) {}

        createShopMarkers(): Array<ShopMarker> {

            var shopMarkers: Array<ShopMarker> = [];

            angular.forEach(this.json.results.shop, function(value, key) {
                shopMarkers.push(new ShopMarker(value.id,
                                                parseFloat(value.lat),
                                                parseFloat(value.lng),
                                                false,
                                                value.name));
            });

            return shopMarkers;

        }

    }

}