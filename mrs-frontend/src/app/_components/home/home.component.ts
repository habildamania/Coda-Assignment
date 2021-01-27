import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { MainService } from '../../_services/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public readonly apiUrl = environment.apiUrl;
  public movies = [];
  public comments = [];
  public modal = null;
  public selectedMovie = [];
  public comment = "";
  public user = "";
  public userRating = 0;
  constructor(public authService: AuthenticationService, public router: Router, public MainService: MainService,) { 
  }

  ngOnInit() {
    let em = (<HTMLInputElement>window.document.getElementById('search_button'))
    if(em) {
      em.addEventListener("click", this.searchMovies.bind(this));
    }
    
    let token = localStorage.getItem('user');
    this.modal = document.getElementById("Model");
    //alert(JSON.parse(localStorage.getItem('user')).token);
    this.MainService.getMovies().subscribe(res => {
      this.movies = res["data"];
      this.movies[0].rating = 3; //Dummy data to be removed
      
      
      
      
    }, error => {
      
      console.error(error);
    } );
  }

  openOptions() {
  	window.document.getElementById('dashboard-button').click();
  }


  showModel(id){
    this.selectedMovie = this.movies.filter(function (d) { return d.id == id});
    this.getComments(id);  
    this.modal.style.display = "block";
    this.MainService.getMovieById(id).subscribe(res => {
      this.userRating = res['rating'];
    });
  }

  closeModel(){
    this.modal.style.display = "none";
  }

  postComment(item){
    this.comment = (<HTMLInputElement>window.document.getElementById('comment')).value;
    this.MainService.postComment(item.id, this.comment).subscribe(res => {

      this.getComments(item.id);
    }, error => {
      console.error(error);
    } );
  }

  getComments(id){
    this.MainService.getComments(this.selectedMovie[0].id).subscribe(res => {
      (<HTMLInputElement>window.document.getElementById('comment')).value = "";
      this.comments = res["comments"];
    }, error => {
      console.error(error);
    } );
  }

  updateComment(comment){
    let Movieid = this.selectedMovie[0].id;
    let commentId = comment.id;
    let commentUpdate = (<HTMLInputElement>window.document.getElementById('comment_update')).value;
    this.MainService.updateComment(Movieid, commentId, commentUpdate).subscribe(res => {
      this.getComments(Movieid);
      comment.EditMode = false;
    }, error => {
      console.error(error);
    } );

  }

  deleteComment(comment){
    let Movieid = this.selectedMovie[0].id;
    let commentId = comment.id;
    this.MainService.deleteComment(Movieid, commentId).subscribe(res => {
      this.getComments(Movieid);
      comment.EditMode = false;
    }, error => {
      console.error(error);
    } );

  }
  
 
  

  searchMovies(this){
    let name = (<HTMLInputElement>window.document.getElementById('movie_search')).value;
    this.MainService.searchMoviesByName(name).subscribe(res => {
      this.movies = res["data"];
      
    }, error => {
      
      console.error(error);
    } );

  }

  postRating(rating) {
    let Movieid = this.selectedMovie[0].id;
    this.userRating = rating;
    this.MainService.addRating(Movieid, rating).subscribe(res => {
      
      this.getComments(Movieid);
    }, error => {
      console.error(error);
    } );
  }


}
