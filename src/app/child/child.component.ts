import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ToStream } from '@kubadospial/to-stream';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {
  @Input()
  @ToStream('variableName$')
  // index: number;
  set index(index: number) {
    this._index = index;
  }
  get index() {
    return this._index;
  }

  index$: Observable<number>;
  variableName$: Observable<number>;

  _index: number;

  constructor() {
    this.variableName$ = this.variableName$.pipe(
      map((val: number) => val * val)
    );
  }
}
