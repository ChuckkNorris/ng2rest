export class RestRequest{
     public parameters: {[name: string]: string} = {};
   //  public endPoint: string;
     
     private _endPoint : string;
     public get endPoint() : string {
         return this._endPoint;
     }
     public set endPoint(v : string) {
         if (v.charAt(0) != '/')
            v = '/' + v;
         this._endPoint = v;
     }
     
}