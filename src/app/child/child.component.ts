import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { assignStream } from 'projects/to-stream/src/public-api';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {
  @Input()
  @assignStream('variableName$')
  index = 1;

  index$: Observable<number>;
  variableName$: Observable<number>;

  constructor() {
    this.variableName$ = this.variableName$.pipe(
      map((val: number) => val * val)
    );
  }
}
