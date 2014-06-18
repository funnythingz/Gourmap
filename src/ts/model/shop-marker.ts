module Gourmap {

    export class ShopMarker {

        constructor(public id: number,
                    public name: string,
                    public lat: number,
                    public lng: number,
                    public showWindow: boolean,
                    public access: string,
                    public address: string,
                    public description: string,
                    public logo_image: string) {
                    
            return this;
        }

    }

}
