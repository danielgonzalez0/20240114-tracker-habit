import { Habit } from "./HistoryHabitsModal";

export class HistoryTable {

  static HTML_TABLE_CONTAINER = document.getElementById(
    'history-habits'
  ) as HTMLDivElement;

  rangeDates: string[];
  table: HTMLTableElement;
  habits: Habit[];

  constructor(rangeDates: string[], habits: Habit[]) {
    this.rangeDates = rangeDates;
    this.table = document.createElement('table');
    this.habits = habits;

  }
  initTable() {
    this.clearTable();
    this.createTable();
  }

  createTable() {
    this.createTableHeader();
    this.createTableBody();
    HistoryTable.HTML_TABLE_CONTAINER.appendChild(this.table);
  }

  clearTable() {
    if (HistoryTable.HTML_TABLE_CONTAINER.firstChild)
      HistoryTable.HTML_TABLE_CONTAINER.innerHTML = '';
  }

  createTableHeader() {
    //create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const habitHeader = document.createElement('th');
    habitHeader.textContent = 'Habits history';
    headerRow.appendChild(habitHeader);

    // Add date headers
    for (const date of this.rangeDates) {
      const dateHeader = document.createElement('th');
      dateHeader.textContent = date;
      headerRow.appendChild(dateHeader);
    }
    //append elements to table
    thead.appendChild(headerRow);
    this.table.appendChild(thead);
  }

  createTableBody() {
    // Create table rows
    const tbody = document.createElement('tbody');

    for (const habit of this.habits) {
      const habitRow = document.createElement('tr');

      // Add habit title cell
      const habitTitleCell = document.createElement('td');
      habitTitleCell.textContent = habit.title;
      habitRow.appendChild(habitTitleCell);

      // Add date cells
      for (const date of this.rangeDates) {
        const dateCell = document.createElement('td');
        dateCell.textContent = habit.daysDone[date] ? '✅' : '❌';
        habitRow.appendChild(dateCell);
      }

      tbody.appendChild(habitRow);
    }

    this.table.appendChild(tbody);
  }
}
