import {BehaviorSubject, filter, Subject, switchMap, take, takeUntil} from 'rxjs';
import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';

import {CommonModule} from '@angular/common';
import {Board} from '../../models/board.model';
import {IUpdate} from '../../models/update.model';
import {SudokuService} from '../../services/sudoku.service';
import {ControlsComponent} from '../controls/controls.component';
import {SudokuBoardComponent} from '../sudoku-board/sudoku-board.component';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
  imports: [ControlsComponent, SudokuBoardComponent, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamePageComponent implements OnInit, OnDestroy {
  private destroyed$: Subject<void> = new Subject<void>();
  board$: BehaviorSubject<Board | null> = new BehaviorSubject<Board | null>(null);
  editableCells: boolean[][] = [];

  get boardNotEditable() {
    return this.editableCells.every(row => row.every(value => value === false));
  }

  constructor(private service: SudokuService) {
  }

  ngOnInit(): void {
    this.service.board$.pipe(
      takeUntil(this.destroyed$),
    ).subscribe(board => {
      if (board) {
        this.board$.next(board);
        this.setEditableCells(board);
      }
    });
  }

  setEditableCells(board: Board): void {
    this.editableCells = board.map(row => row.map(cell => cell === 0));
  }

  onUpdateEditable(data: IUpdate): void {
    this.editableCells[data.row][data.col] = !data.input;
  }

  solve(): void {
    this.service.board$.pipe(
      take(1),
      filter(board => !!board),
      switchMap(board => this.service.solveBoard(board))
    ).subscribe(response => {
      this.board$.next(response.solution);
      this.resetEditableCells();
    });
  }

  resetEditableCells(): void {
    for (let i = 0; i < this.editableCells.length; i++) {
      for (let j = 0; j < this.editableCells[i].length; j++) {
        this.editableCells[i][j] = false;
      }
    }
  }

  validate(): void {
    this.service.board$.pipe(
      take(1),
      filter(board => !!board),
      switchMap(board => this.service.validateBoard(board))
    ).subscribe(response => {
      alert(response.status === "solved" ? "Correct Solution!" : "Incorrect!");
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
