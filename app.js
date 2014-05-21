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

            this.$scope.map = {
                center: {
                    latitude: 35.670651,
                    longitude: 139.77186099999994
                },
                zoom: 16
            };
        }
        GourmapController.prototype.freeWordSearch = function (freeWord) {
            var _this = this;
            var apiPath = Gourmap.HotpepperApi.createApiPath(freeWord);

            var promise = this.search.$http.jsonp(apiPath);

            promise.success(function (json) {
                _this.$scope.shops = json.results.shop;
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
    var HotpepperApiSingleton = (function () {
        function HotpepperApiSingleton() {
            this.key = '47f38c102d2ddf17';
            this.format = 'jsonp';
            this.callback = 'JSON_CALLBACK';
            if (HotpepperApiSingleton._instance) {
                throw console.log('Error: Instantiation failed');
            }

            HotpepperApiSingleton._instance = this;
        }
        HotpepperApiSingleton.getInstance = function () {
            if (HotpepperApiSingleton._instance === null) {
                HotpepperApiSingleton._instance = new HotpepperApiSingleton();
            }

            return HotpepperApiSingleton._instance;
        };

        HotpepperApiSingleton.prototype.createApiPath = function (freeWord) {
            return 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?' + 'key=' + this.key + '&format=' + this.format + '&callback=' + this.callback + '&keyword=' + freeWord;
        };
        HotpepperApiSingleton._instance = null;
        return HotpepperApiSingleton;
    })();
    Gourmap.HotpepperApiSingleton = HotpepperApiSingleton;

    Gourmap.HotpepperApi = HotpepperApiSingleton.getInstance();
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
//# sourceMappingURL=app.js.map
