/// <reference path="../../../typings/tsd.d.ts" />

module Gourmap {

    export class ApiData {

        static key: string = '47f38c102d2ddf17';
        static format: string = 'jsonp';
        static callback: string = 'JSON_CALLBACK';
        static genre: string = 'ラーメン';

    }

    export class ApiService {

        url: string = 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?' +
                             'key=' + ApiData.key +
                             '&format=' + ApiData.format +
                             '&callback=' + ApiData.callback +
                             '&keyword=' + ApiData.genre;

        promise: any;

        constructor(public $http: ng.IHttpService) {

            this.promise = this.$http.jsonp(this.url);

            return this;
        }

    }

}
