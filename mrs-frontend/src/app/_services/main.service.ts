import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class MainService {
	public readonly apiUrl = environment.apiUrl;
    public readonly baseUrl = environment.baseUrl;
    public module:string = 'dummies';

    constructor(public http: HttpClient) {
        
    }

    all(pageNo, keyword, perPage, sortBy, orderBy) {
    	return this.http.get(this.apiUrl+'/'+this.module+'?page='+pageNo+'&keyword='+keyword+'&per_page='+keyword+'&sort_by='+keyword+'&order_by'+keyword );
    }

    store(obj) {
    	return this.http.post(this.apiUrl+'/'+this.module+'', obj );
    }

    show(id) {
        return this.http.get(this.apiUrl+'/'+this.module+'/'+id );
    }

    getMovies() {
        return this.http.get(this.apiUrl+'/api/movies');
    }

    getComments(movieId) {
    	return this.http.get(this.apiUrl+'/api/movies/'+movieId+'/comments');
    }

    postComment(movieId, comment) {
        return this.http.post(this.apiUrl+'/api/movies/'+movieId+'/comments', {text: comment});
    }

    updateComment(movieId, commentId, comment) {
        return this.http.put(this.apiUrl+'/api/movies/'+movieId+'/comments/'+commentId, {text: comment});
    }

    deleteComment(movieId, commentId) {
        return this.http.delete(this.apiUrl+'/api/movies/'+movieId+'/comments/'+commentId);
    }

    searchMoviesByName(movie) {
        return this.http.get(this.apiUrl+'/api/movies?title='+movie);
    }

    addRating(movie, rating) {
        return this.http.put(this.apiUrl + '/api/movies/' + movie + '/ratings', {rating:rating});
    }
    
    update(id, obj) {
    	return this.http.patch(this.apiUrl+'/'+this.module+'/'+id, obj );
    }

    destroy(id) {
    	return this.http.delete(this.apiUrl+'/'+this.module+'/'+id);
    }

    getMovieById(movieId) {
        return this.http.get(this.apiUrl+'/api/movies/' + movieId);
    }


}
