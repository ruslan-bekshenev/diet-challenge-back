export function formatHealthyDay(day, name) {
  return day.reduce((r, a) => {
    r[a[name]] = [...(r[a[name]] || []), a];
    return r;
  }, {});
}

export function transformHealthyDay(data: any) {
  const { meal, ...rest } = data[0];
  const formatData = { ...rest, meals: [] };
  const mealsArr = [];
  data.map((day) => {
    mealsArr.push(day.meal);
  });
  formatData.meals = mealsArr;
  return formatData;
}
