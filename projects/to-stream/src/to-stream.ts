import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
/**
 * ToStream Decorator intercepts a value of Input decorator and transforms it into rxjs stream.
 *
 * @usageNotes
 *
 * Place ToStream decorator after the Input decorator, then create a variable
 * named as the input's variable name with `$` at the end. The original Input variable is still fully functional.
 *
 * Example:
 * ```typescript
 * @Component(...)
 * export class ChildComponent {
 *
 *   @Input()
 *   @ToStream()
 *   variable: number;
 *
 *   variable$: Observable<number>;
 * }
 *
 * ```
 * @variableName is an optional string parameter. In case you want to assing rxjs stream to a variable of your own choice.
 *
 * Example:
 * ```typescript
 * @Component(...)
 * export class ChildComponent {
 *
 *   @Input()
 *   @ToStream('someOtherVariable$')
 *   variable: number;
 *
 *   someOtherVariable$: Observable<number>;
 * }
 * ```
 */

export function ToStream<T>(
  variableName?: string
): (component: any, inputName: string, descriptor?: any) => void {
  const _state$ = new ReplaySubject<T>(1);
  const _val$ = _state$.asObservable().pipe(distinctUntilChanged());
  let _val: T;

  return (component: any, inputName: string, descriptor?: any): void => {
    component[!!variableName ? variableName : inputName + '$'] = _val$;

    const orgSet = Object.getOwnPropertyDescriptor(component, inputName)?.set;
    const _setter = (value: T): void => {
      _state$.next(value);
      _val = value;
    };

    if (!!orgSet) {
      Object.defineProperty(descriptor, 'set', {
        value: (value: T) => {
          orgSet.apply(component, [value]);
          _setter(value);
        },
      });
    } else {
      Object.defineProperty(component, inputName, {
        set: _setter,
        get: (): T => _val,
      });
    }
  };
}
