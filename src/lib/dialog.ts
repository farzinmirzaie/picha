/**
 * Shared <dialog> behaviour: backdrop-click + Esc + close-button all close
 * with the exit animation (see `dialog.closing` in global.css). Reduced-motion
 * users get an instant close.
 */
/** Close with the exit animation (instant for reduced-motion users). */
export function animatedClose(dialog: HTMLDialogElement) {
  if (
    matchMedia('(prefers-reduced-motion: reduce)').matches ||
    dialog.classList.contains('closing')
  ) {
    dialog.classList.remove('closing');
    dialog.close();
    return;
  }
  dialog.classList.add('closing');
  const finish = () => {
    dialog.classList.remove('closing');
    dialog.close();
  };
  dialog.addEventListener('animationend', finish, { once: true });
  // safety net in case the animation never fires (e.g. display quirks)
  setTimeout(finish, 300);
}

export function bindDialog(dialog: HTMLDialogElement) {
  if (dialog.dataset.bound) return;
  dialog.dataset.bound = '1';

  const close = () => animatedClose(dialog);

  // click on the backdrop (the dialog element itself)
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) close();
  });
  // Esc
  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
    close();
  });
  // any [data-dialog-close] button inside
  dialog.querySelectorAll<HTMLElement>('[data-dialog-close]').forEach((btn) => {
    btn.addEventListener('click', close);
  });
}
