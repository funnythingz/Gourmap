var Gourmap;
(function (Gourmap) {
    var GourmapController = (function () {
        function GourmapController($scope, search, helloModel) {
            var _this = this;
            this.$scope = $scope;
            this.search = search;
            this.helloModel = helloModel;
            this.markersCracker = new Gourmap.MarkersCracker();
            this.$scope.helloModel = helloModel;

            this.$scope.callSearch = function (freeWord) {
                return _this.freeWordSearch(freeWord);
            };

            this.fitHeightForFullMap();

            var mapOptions = {
                zoom: 16,
                center: new google.maps.LatLng(Gourmap.HotpepperApi.lat, Gourmap.HotpepperApi.lng)
            };

            $scope.map = new google.maps.Map(document.getElementById('map-view'), mapOptions);
            google.maps.event.addListener($scope.map, 'drag', function () {
                _this.renderMap();
            });
        }
        GourmapController.prototype.renderMap = function () {
            var _this = this;
            var timer;
            if (_.isEqual(timer, false)) {
                clearTimeout(timer);
            }

            timer = setTimeout(function () {
                Gourmap.HotpepperApi.lat = _this.$scope.map.getCenter().lat();
                Gourmap.HotpepperApi.lng = _this.$scope.map.getCenter().lng();
                _this.freeWordSearch(_this.$scope.freeWord);
            }, 300);
        };

        GourmapController.prototype.fitHeightForFullMap = function () {
            var $map = $('#map-view');
            var $entryList = $('#entry-collection-view');

            $map.css('height', Util.getMapHeight() + 'px');
            $entryList.css('height', Util.getMapHeight() + 'px');

            var timer;
            $(window).on('resize', function () {
                if (_.isEqual(timer, false)) {
                    clearTimeout(timer);
                }

                timer = setTimeout(function () {
                    $map.css('height', Util.getMapHeight() + 'px');
                    $entryList.css('height', Util.getMapHeight() + 'px');
                }, 300);
            });
        };

        GourmapController.prototype.freeWordSearch = function (freeWord) {
            var _this = this;
            var apiPath = Gourmap.HotpepperApi.createApiPath(freeWord);
            var promise = this.search.$http.jsonp(apiPath);

            promise.success(function (json) {
                _this.markersCracker.remove();

                var googleMapFactory = new Gourmap.GoogleMapFactory(json);
                _this.$scope.shops = googleMapFactory.createShopMarkers();

                var markersFactory = new Gourmap.MarkersFactory(_this.$scope.shops, _this.$scope.map);
                _this.$scope.markers = markersFactory.createMarkers();

                _this.markersCracker.create(_this.$scope.markers);
            });
        };
        return GourmapController;
    })();
    Gourmap.GourmapController = GourmapController;
})(Gourmap || (Gourmap = {}));
var Gourmap;
(function (Gourmap) {
    var Search = (function () {
        function Search($http) {
            this.$http = $http;
            return this;
        }
        return Search;
    })();
    Gourmap.Search = Search;
})(Gourmap || (Gourmap = {}));
var Gourmap;
(function (Gourmap) {
    var Apprication = (function () {
        function Apprication() {
            this.gourmap = angular.module('gourmap', []);
            this.gourmap.controller('gourmapCtrl', Gourmap.GourmapController).factory('search', Gourmap.Search).factory('helloModel', function () {
                return new Gourmap.Hello('Gourmap', 'Hello, Angular');
            });
        }
        return Apprication;
    })();
    Gourmap.Apprication = Apprication;

    new Apprication();
})(Gourmap || (Gourmap = {}));
var Gourmap;
(function (Gourmap) {
    var GoogleMapFactory = (function () {
        function GoogleMapFactory(json) {
            this.json = json;
        }
        GoogleMapFactory.prototype.createShopMarkers = function () {
            var shopMarkers = [];

            angular.forEach(this.json.results.shop, function (value, key) {
                shopMarkers.push(new Gourmap.ShopMarker(value.id, value.name, parseFloat(value.lat), parseFloat(value.lng), false, value.access, value.address, value.catch, value.logo_image));
            });

            return shopMarkers;
        };
        return GoogleMapFactory;
    })();
    Gourmap.GoogleMapFactory = GoogleMapFactory;
})(Gourmap || (Gourmap = {}));
var Gourmap;
(function (Gourmap) {
    var MarkersCracker = (function () {
        function MarkersCracker() {
            this.markerCacheList = new google.maps.MVCArray();
        }
        MarkersCracker.prototype.create = function (markers) {
            var _this = this;
            angular.forEach(markers, function (marker) {
                _this.markerCacheList.push(marker);
            });
        };

        MarkersCracker.prototype.remove = function () {
            this.markerCacheList.forEach(function (marker, index) {
                marker.setMap(null);
            });
        };
        return MarkersCracker;
    })();
    Gourmap.MarkersCracker = MarkersCracker;
})(Gourmap || (Gourmap = {}));
var Gourmap;
(function (Gourmap) {
    var MarkersFactory = (function () {
        function MarkersFactory(shopMarkers, map) {
            this.shopMarkers = shopMarkers;
            this.map = map;
        }
        MarkersFactory.prototype.createMarkers = function () {
            var _this = this;
            var resultMarkers = [];

            angular.forEach(this.shopMarkers, function (shopMarker) {
                var marker = _this.createMarker(shopMarker);

                resultMarkers.push(marker);
            });

            return resultMarkers;
        };

        MarkersFactory.prototype.createMarker = function (shopMarker) {
            var _this = this;
            var infoWindow = new google.maps.InfoWindow({
                content: '<div class="info"><a href="http://www.hotpepper.jp/str' + shopMarker.id + '" target="_blank">' + shopMarker.name + '</a></div>'
            });

            var marker = new google.maps.Marker({
                map: this.map,
                position: new google.maps.LatLng(shopMarker.lat, shopMarker.lng)
            });

            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open(_this.map, marker);
            });

            return marker;
        };
        return MarkersFactory;
    })();
    Gourmap.MarkersFactory = MarkersFactory;
})(Gourmap || (Gourmap = {}));
var Gourmap;
(function (Gourmap) {
    var Hello = (function () {
        function Hello(title, description) {
            this.title = title;
            this.description = description;
        }
        return Hello;
    })();
    Gourmap.Hello = Hello;
})(Gourmap || (Gourmap = {}));
var Gourmap;
(function (Gourmap) {
    var MapCenter = (function () {
        function MapCenter(latitude, longitude) {
            this.latitude = latitude;
            this.longitude = longitude;
            return this;
        }
        return MapCenter;
    })();
    Gourmap.MapCenter = MapCenter;
})(Gourmap || (Gourmap = {}));
var Gourmap;
(function (Gourmap) {
    var ShopMarker = (function () {
        function ShopMarker(id, name, lat, lng, showWindow, access, address, description, logo_image) {
            this.id = id;
            this.name = name;
            this.lat = lat;
            this.lng = lng;
            this.showWindow = showWindow;
            this.access = access;
            this.address = address;
            this.description = description;
            this.logo_image = logo_image;
            return this;
        }
        return ShopMarker;
    })();
    Gourmap.ShopMarker = ShopMarker;
})(Gourmap || (Gourmap = {}));
var Gourmap;
(function (Gourmap) {
    var HotpepperApiSingleton = (function () {
        function HotpepperApiSingleton() {
            this.key = '47f38c102d2ddf17';
            this.format = 'jsonp';
            this.callback = 'JSON_CALLBACK';
            this.lat = 35.6742506;
            this.lng = 139.7649463;
            if (HotpepperApiSingleton._instance) {
                throw console.log('Error: Instantiation failed');
            }

            HotpepperApiSingleton._instance = this;
        }
        HotpepperApiSingleton.getInstance = function () {
            if (_.isNull(HotpepperApiSingleton._instance)) {
                HotpepperApiSingleton._instance = new HotpepperApiSingleton();
            }

            return HotpepperApiSingleton._instance;
        };

        HotpepperApiSingleton.prototype.createApiPath = function (freeWord) {
            return 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?' + 'key=' + this.key + '&format=' + this.format + '&callback=' + this.callback + '&lat=' + this.lat + '&lng=' + this.lng + '&keyword=' + freeWord;
        };
        HotpepperApiSingleton._instance = null;
        return HotpepperApiSingleton;
    })();
    Gourmap.HotpepperApiSingleton = HotpepperApiSingleton;

    Gourmap.HotpepperApi = HotpepperApiSingleton.getInstance();
})(Gourmap || (Gourmap = {}));
var Util;
(function (Util) {
    function getElmPosition(arg) {
        var left = 0, top = 0;
        var elm = document.getElementById(arg);

        while (elm.parentNode) {
            left += elm.offsetLeft;
            top += elm.offsetTop;
            elm = elm.parentNode;
        }

        return { 'left': left, 'top': top };
    }
    Util.getElmPosition = getElmPosition;

    function getMapHeight() {
        return window.innerHeight - getElmPosition('result-layout').top;
    }
    Util.getMapHeight = getMapHeight;
})(Util || (Util = {}));
//# sourceMappingURL=app.js.map
