import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Board} from '../models/board.model';
import {Difficulty} from '../models/difficulty.model';

@Injectable({providedIn: 'root'})
export class SudokuService {
  public board$: BehaviorSubject<Board | null> = new BehaviorSubject<Board | null>(null);

  constructor(private http: HttpClient) {
  }

  fetchBoard(difficulty: Difficulty): void {
    this.http.get<{ board: Board }>(`https://sugoku.onrender.com/board?difficulty=${difficulty}`)
      .subscribe((response: { board: Board }) => this.board$.next(response.board));
  }

  solveBoard(board: Board): Observable<{ solution: Board }> {
    return this.http.post<{ solution: Board }>('https://sugoku.onrender.com/solve', {board});
  }

  validateBoard(board: Board): Observable<{ status: string }> {
    return this.http.post<{ status: string }>('https://sugoku.onrender.com/validate', {board});
  }
}
