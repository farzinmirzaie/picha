/**
 * Staff sign-in state, shared by every page with staff-only controls. The
 * registrar PIN is entered in exactly one place, the Staff room
 * (/tools/staff/); everywhere else just checks whether it is present and shows
 * or hides accordingly. There are no other PIN inputs.
 *
 * Gate elements with `data-staff-only` and let applyStaffVisibility() toggle
 * them. It flips inline `display`, not the `hidden` class, so a gated element's
 * own responsive display utilities (e.g. `md:block`) still apply once shown.
 */
export const STAFF_PIN_KEY = 'picha-staff-pin';

export const staffPin = (): string | null => localStorage.getItem(STAFF_PIN_KEY);
export const hasStaffPin = (): boolean => Boolean(staffPin());

/** Set the PIN. Only the Staff room should call this (the one entry point). */
export function setStaffPin(pin: string): void {
  localStorage.setItem(STAFF_PIN_KEY, pin);
}

export function forgetStaffPin(): void {
  localStorage.removeItem(STAFF_PIN_KEY);
}

/** Show every [data-staff-only] element iff a PIN is present on this device. */
export function applyStaffVisibility(scope: ParentNode = document): void {
  const on = hasStaffPin();
  scope.querySelectorAll<HTMLElement>('[data-staff-only]').forEach((el) => {
    el.style.display = on ? '' : 'none';
  });
}
