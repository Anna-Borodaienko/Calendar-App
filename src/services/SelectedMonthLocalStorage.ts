import { Month } from '../models/Month';

const SELECTED_MONTH_KEY = 'selectedMonth';

export class SelectedMonthLocalStorage {
  public hasSelectedMonth(): boolean {
    if (localStorage.getItem(SELECTED_MONTH_KEY)) return true;
    else return false;
  }

  public getSelectedMonth(): Month {
    const localStorageValue = JSON.parse(localStorage.getItem(SELECTED_MONTH_KEY)!);
    return this.fromLocalStorage(localStorageValue);
  }

  public setSelectedMonth(month: Month) {
    localStorage.setItem(SELECTED_MONTH_KEY, JSON.stringify(month));
  }

  private fromLocalStorage(obj: any): Month {
    return new Month(obj.month, obj.year);
  }
}
