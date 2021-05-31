import { writable } from 'svelte/store';

export function createTurboForm() {
  let store = writable({});
  let turboFormAction = (elem) => {
    elem.addEventListener('submit', (e) => {
      e.preventDefault();
      store.update((state) => ({ ...state, submitting: true }));
      let formData = new FormData(elem);
      let req = { method: elem.method };

      if (elem.method.toLowerCase() === 'get') {
        req.url = elem.action + '?' + new URLSearchParams(formData);
      } else {
        req.url = elem.action;
        req.body = formData;
      }

      fetch(req.url, req).then(async (x) => {
        let data = await x.json();
        store.update((state) => ({
          submitted: x.ok ? (state.submitted || 0) + 1 : false,
          ...data,
        }));
      });
    });
    turboFormAction.element = elem;
    return {};
  };
  return Object.assign(turboFormAction, store);
}
