import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IUpdate} from '../../models/update.model';
import {Board} from '../../models/board.model';

@Component({
  selector: 'app-sudoku-board',
  imports: [CommonModule],
  templateUrl: './sudoku-board.component.html',
  styleUrl: './sudoku-board.component.scss'
})
export class SudokuBoardComponent {
  @Input() board: Board = [];
  @Input() editableCells: boolean[][] = [];
  @Output() updateEditable = new EventEmitter<IUpdate>();

  updateCell(row: number, col: number, event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    if (/^[1-9]$/.test(inputValue)) {
      this.board[row][col] = parseInt(inputValue);
      this.updateEditable.emit({row, col, input: +inputValue});
    }
    (event.target as HTMLInputElement).value = '';
  }
}
