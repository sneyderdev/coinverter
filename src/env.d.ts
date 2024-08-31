/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ViewTransition) */
interface ViewTransition {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ViewTransition/finished) */
  readonly finished: Promise<undefined>;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ViewTransition/ready) */
  readonly ready: Promise<undefined>;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ViewTransition/updateCallbackDone) */
  readonly updateCallbackDone: Promise<undefined>;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ViewTransition/skipTransition) */
  skipTransition(): void;
}

interface UpdateCallback {
  (): any;
}

interface Document {
  startViewTransition(callbackOptions?: UpdateCallback): ViewTransition;
}
