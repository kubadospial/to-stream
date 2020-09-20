import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { toStream } from 'to-stream';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {
  @Input()
  @toStream('variableName$')
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
