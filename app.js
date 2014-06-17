var Gourmap;
(function (Gourmap) {
    var GourmapController = (function () {
        function GourmapController($scope, search, helloModel) {
            var _this = this;
            this.$scope = $scope;
            this.search = search;
            this.helloModel = helloModel;
            this.$scope.helloModel = helloModel;

            this.$scope.callSearch = function (freeWord) {
                return _this.freeWordSearch(freeWord);
            };

            this.fitHeightForFullMap();

            this.$scope.map = {
                center: {
                    latitude: Gourmap.HotpepperApi.lat,
                    longitude: Gourmap.HotpepperApi.lng
                },
                zoom: 16,
                events: {
                    'drag': function () {
                        var timer;
                        if (_.isEqual(timer, false)) {
                            clearTimeout(timer);
                        }

                        timer = setTimeout(function () {
                            Gourmap.HotpepperApi.lat = _this.$scope.map.center.latitude;
                            Gourmap.HotpepperApi.lng = _this.$scope.map.center.longitude;
                            _this.freeWordSearch(_this.$scope.freeWord);
                        }, 500);
                    }
                }
            };
        }
        GourmapController.prototype.fitHeightForFullMap = function () {
            var $map = $('.angular-google-map-container');
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
                console.log(json.results);

                var googleMapFactory = new Gourmap.GoogleMapFactory(json);

                _this.$scope.shops = json.results.shop;
                _this.$scope.map.shopMarkers = googleMapFactory.createShopMarkers();

                angular.forEach(_this.$scope.map.shopMarkers, function (marker) {
                    marker.closeClick = function () {
                        marker.showWindow = false;
                        _this.$scope.$apply();
                    };

                    marker.onClicked = function () {
                        console.log(marker);
                        marker.showWindow = true;
                        _this.$scope.$apply();
                    };
                });
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
            this.gourmap = angular.module('gourmap', ['google-maps']);
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
                shopMarkers.push(new Gourmap.ShopMarker(value.id, parseFloat(value.lat), parseFloat(value.lng), false, value.name));
            });

            return shopMarkers;
        };
        return GoogleMapFactory;
    })();
    Gourmap.GoogleMapFactory = GoogleMapFactory;
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
        function ShopMarker(id, latitude, longitude, showWindow, title) {
            this.id = id;
            this.latitude = latitude;
            this.longitude = longitude;
            this.showWindow = showWindow;
            this.title = title;
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
