# ng2rest
RESTful TypeScript library for Angular 2.

# Example
```
import { RestService, RestRequest } from 'ng2rest/ng2rest';

@Injectable()
export class MyRestService {
    constructor(private myRestService: RestService) {this.onInit();}
    
    onInit(){
        // THIS IS NOT A REAL API - FOR EXAMPLE PURPOSES ONLY
        this._restService.baseUrl = 'https://api.mymovies.com';
        this._restService.globalParameters['api_key'] = 'myapikeyvalue';
    }
    
    public getTopRatedMovies(pageNumber: number): Promise<Movie[]> {
        var request = new RestRequest();
        request.endPoint = '/movie/top_rated';
        request.parameters['page'] = pageNumber.toString();
        
        var promiseToReturn = new Promise<Movie[]>(resolve =>{
            
            this._restService.executeRequest<MovieResponseModel>(request).then(movieResponseModel => {
                var movieCollectionToResolve: Movie[] = [];
                movieResponseModel.movies.forEach(movieResponse => {
                    movieCollectionToResolve.push(this.convertToMovie(movieResponse));
                });
                resolve(movieCollectionToResolve);
            });
        });
        return promiseToReturn;
    }
````

# Installation
1. In your project's directory, open a console window and type: 
```
npm install ng2rest
```
2. Add a mapping to your SystemJS Config for `ng2rest/ng2rest` in the `index.html` file; it might look something like this:
```
<script>
    System.config({
        map: {
            'ng2rest/ng2rest': 'node_modules/ng2rest/ng2rest.js'
        },
      packages: {
        app: {
          format: 'register',
          defaultExtension: 'js'
        }
      }
    });
    System.import('app/main')
          .then(null, console.error.bind(console));
</script>
```
3. In `main.ts` bootstrap `HTTP_PROVIDERS` and `RestService` as global providers
```
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {RestService} from 'ng2rest/ng2rest';

import {AppComponent} from './app.component';

bootstrap(AppComponent, [
    HTTP_PROVIDERS, 
    RestService
]);
```



