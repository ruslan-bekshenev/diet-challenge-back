export function formatHealthyDay(day, name) {
  return day.reduce((r, a) => {
    r[a[name]] = [...(r[a[name]] || []), a];
    return r;
  }, {});
}
