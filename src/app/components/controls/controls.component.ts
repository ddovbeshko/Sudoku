import {CommonModule} from '@angular/common';
import {SudokuService} from '../../services/sudoku.service';
import {ChangeDetectionStrategy, Component} from '@angular/core';

import {Difficulty} from '../../models/difficulty.model';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlsComponent {
  constructor(private service: SudokuService) {
  }

  startGame(difficulty: Difficulty): void {
    this.service.fetchBoard(difficulty as any);
  }
}
