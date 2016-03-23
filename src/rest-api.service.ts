import { HTTP_PROVIDERS, Http } from 'angular2/http';
import { Injectable, Inject } from 'angular2/core';
import { RestRequest } from './rest-request.model';


@Injectable()
export class RestApiService {
    constructor( private _http: Http) {}
    // Sent with each request
    public globalParameters: {[name: string]: string} = {};
   // public baseUrl: string;
    
    private _baseUrl : string;
    public get baseUrl() : string {
        return this._baseUrl;
    }
    public set baseUrl(v : string) {
        // remove last '/'
        if (v.lastIndexOf('/') == v.length - 1)
            v = v.substr(0, v.length - 1);
        this._baseUrl = v;
    }
    
    
    public executeRequest<T>(request: RestRequest) : Promise<T> {
        var getStatement = this._http.get(this.getFullUrl(request));
        var promiseToReturn = new Promise<T>(resolve => 
            getStatement.subscribe((response => {
                resolve(<T>response.json());
            })));
        return promiseToReturn;
    }
    
    getFullUrl(restRequest: RestRequest){
        var toReturn = this.baseUrl;
        
        if (restRequest.endPoint != undefined)
            toReturn += restRequest.endPoint
        toReturn += this.getQueryString(restRequest.parameters);
      
        return toReturn;
    }
    
    getQueryString(restRequestParameters: {[name: string]: string}): string {
        var toReturn = '?';
        var isFirst = true;
        for (var key in this.globalParameters){
            if (!isFirst)
                toReturn += '&';
            else isFirst = false;
            toReturn += key + '=' + this.globalParameters[key]
        }
        
        for (var key in restRequestParameters){
            if (!isFirst)
                toReturn += '&';
            else isFirst = false;
            toReturn += key + '=' + restRequestParameters[key]
        }
        
        return toReturn;
    }
}

