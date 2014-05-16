/// <reference path="../../../typings/tsd.d.ts" />

module Gourmap {

    export class ApiData {

        static key: string = '47f38c102d2ddf17';
        static format: string = 'jsonp';
        static callback: string = 'JSON_CALLBACK';

    }

    export class ApiService {

        public url: string = 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=47f38c102d2ddf17&format=jsonp&callback=JSON_CALLBACK&keyword=ラーメン';
        public promise: any;

        constructor(public $http: ng.IHttpService) {

            this.promise = this.$http.jsonp(this.url);

            return this;
        }

    }

}
