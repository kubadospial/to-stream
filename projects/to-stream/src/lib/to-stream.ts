import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
/**
 * Decorator that gets a value of Input decorator and transforms it into stream.
 *
 * @usageNotes
 *
 * Place toStream decorator after the Input decorator, then create a variable
 * named as the input's variable name with `$` at the end. The original Input variable is still fully functional.
 *
 * Example:
 * ```typescript
 * @Component(...)
 * export class ChildComponent {
 *
 *   @Input()
 *   @toStream()
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
 *   @toStream('someOtherVariable$')
 *   variable: number;
 *
 *   someOtherVariable$: Observable<number>;
 * }
 * ```
 */

export function toStream<T>(
  variableName?: string
): (component: any, inputName: string, descriptor?: any) => void {
  const _state$ = new ReplaySubject<T>(1);
  const _val$ = _state$.asObservable().pipe(distinctUntilChanged());
  let _val: T;

  return (component: any, inputName: string, descriptor?: any): void => {
    component[!!variableName ? variableName : inputName + '$'] = _val$;

    const orgSet = Object.getOwnPropertyDescriptor(component, inputName)?.set;
    const hasVariableSetter = !!orgSet;
    const _setter = (value: T): void => {
      _state$.next(value);
      _val = value;
    };

    if (hasVariableSetter) {
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
