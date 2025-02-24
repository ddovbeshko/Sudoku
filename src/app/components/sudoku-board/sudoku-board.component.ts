import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

import {Board} from '../../models/board.model';
import {IUpdate} from '../../models/update.model';

@Component({
  selector: 'app-sudoku-board',
  templateUrl: './sudoku-board.component.html',
  styleUrl: './sudoku-board.component.scss',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SudokuBoardComponent {
  @Input() board!: Board;
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
