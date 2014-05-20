/// <reference path="../../../typings/tsd.d.ts" />

module Gourmap {

    export class HotpepperApiSingleton {

        private static _instance: HotpepperApiSingleton = null;

        constructor() {
            if(HotpepperApiSingleton._instance) {
                throw console.log('Error: Instantiation failed');
            }
            HotpepperApiSingleton._instance = this;
        }

        static getInstance(): HotpepperApiSingleton {
            if(HotpepperApiSingleton._instance === null) {
                HotpepperApiSingleton._instance = new HotpepperApiSingleton();
            }
            return HotpepperApiSingleton._instance;
        }

        key: string = '47f38c102d2ddf17';
        format: string = 'jsonp';
        callback: string = 'JSON_CALLBACK';

        createApiPath(freeWord: string): string {

            return 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?' +
                          'key=' + this.key +
                          '&format=' + this.format +
                          '&callback=' + this.callback +
                          '&keyword=' + freeWord;

        }

    }

    export var HotpepperApi = HotpepperApiSingleton.getInstance();

}
