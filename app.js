var Gourmap;
(function (Gourmap) {
    var GourmapController = (function () {
        function GourmapController($scope, apiService) {
            this.$scope = $scope;
            this.$scope.title = "Gourmap";
            this.$scope.greeting = 'hello Angular !';

            var ctrl = this;

            apiService.promise.success(function (json) {
                console.log(json);
                ctrl.$scope.shops = json.results.shop;
            });
        }
        return GourmapController;
    })();
    Gourmap.GourmapController = GourmapController;
})(Gourmap || (Gourmap = {}));
var Gourmap;
(function (Gourmap) {
    var ApiData = (function () {
        function ApiData() {
        }
        ApiData.key = '47f38c102d2ddf17';
        ApiData.format = 'jsonp';
        ApiData.callback = 'JSON_CALLBACK';
        ApiData.genre = 'ラーメン';
        return ApiData;
    })();
    Gourmap.ApiData = ApiData;

    var ApiService = (function () {
        function ApiService($http) {
            this.$http = $http;
            this.url = 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?' + 'key=' + ApiData.key + '&format=' + ApiData.format + '&callback=' + ApiData.callback + '&keyword=' + ApiData.genre;
            this.promise = this.$http.jsonp(this.url);

            return this;
        }
        return ApiService;
    })();
    Gourmap.ApiService = ApiService;
})(Gourmap || (Gourmap = {}));
var Gourmap;
(function (Gourmap) {
    var Apprication = (function () {
        function Apprication() {
            this.gourmap = angular.module('gourmap', []);
            this.gourmap.controller('gourmapCtrl', Gourmap.GourmapController).factory('apiService', Gourmap.ApiService);
        }
        return Apprication;
    })();
    Gourmap.Apprication = Apprication;

    new Apprication();
})(Gourmap || (Gourmap = {}));
//# sourceMappingURL=app.js.map
