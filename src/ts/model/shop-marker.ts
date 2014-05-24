module Gourmap {

    export class ShopMarker {

        constructor(public id: number,
                    public latitude: number,
                    public longitude: number,
                    public showWindow: boolean,
                    public title: string) {
                    
            return this;
        }

    }

}
