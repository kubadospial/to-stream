import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
/**
 * Decorator that gets the value of Input decorator and transforms it into stream.
 *
 * @usageNotes
 *
 * Place assignStream decorator after the Input decorator, then create a variable
 * named as the input's variable name with `$` at the end. The original Input variable is still fully functional.
 *
 * Example:
 * ```typescript
 * @Component(...)
 * export class ChildComponent {
 *
 *   @Input()
 *   @assignStream()
 *   variable: number;
 *
 *   variable$: Observable<number>;
 * }
 *
 * ```
 * @variableName is an optional string parameter. If you want to assing stream with value coming from an Input decorator
 * if you want to assing Observable value comming from Input decorator
 *
 * Example:
 * ```typescript
 * @Component(...)
 * export class ChildComponent {
 *
 *   @Input()
 *   @assignStream('someOtherVariable$')
 *   variable: number;
 *
 *   someOtherVariable$: Observable<number>;
 * }
 * ```
 */

export function assignStream<T>(
  variableName?: string
): (component: any, inputName: string) => void {
  const _state$ = new ReplaySubject<T>(1);
  const _val$ = _state$.asObservable().pipe(distinctUntilChanged());
  let _val: T;
  return (component: any, inputName: string): void => {
    component[!!variableName ? variableName : inputName + '$'] = _val$;
    Object.defineProperty(component, inputName, {
      set: (value: T): void => {
        _state$.next(value);
        _val = value;
      },
      get: (): T => _val,
    });
  };
}
