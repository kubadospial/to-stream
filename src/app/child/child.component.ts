import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable } from 'rxjs';
import { toStream } from 'projects/to-stream/src/public-api';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {
  @Input()
  @toStream()
  index: Observable<number>;

  constructor() {}
}
