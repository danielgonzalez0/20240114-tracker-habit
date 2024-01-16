import { getHabits } from '../api/habits-api';
import { Modal } from './Modal';

interface Habit {
  id: number;
  title: string;
  daysDone: {
    [date: string]: boolean;
  };
}

export class HistoryHabitsModal extends Modal {
  habits: Habit[];
  allHabitsDates: string[];
  rangeDates: string[];
  constructor(
    dialog: HTMLDialogElement,
    openBtn: HTMLButtonElement,
    closeBtn: HTMLButtonElement,
  
  ) {
    super(dialog, openBtn, closeBtn);
    this.habits = [];
    this.allHabitsDates = [];
    this.rangeDates = []
  }

  async renderHabits() {
   this.habits = await getHabits();
   console.log(this.habits);
    this.extractDates();
  this.createRangeDates();
    this.createHistoryTable();
  }

  extractDates() {
    //extract dates from habits array
    const dates = this.habits.map((habit) => {
      return Object.keys(habit.daysDone);
    });
   //flatten dates array
   const flatDates = dates.flat();
    //remove duplicates
    const uniqueDates = [...new Set(flatDates)];
    //sort dates
    const sortedDates = uniqueDates.sort((a, b) => {
      return new Date(a).getTime() - new Date(b).getTime();
    });
    return this.allHabitsDates = sortedDates;
  }

  createRangeDates() {
    //create range of dates
    const rangeDates = [];
    const startDate = new Date(this.allHabitsDates[0]);
    const endDate = new Date();
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      rangeDates.push(new Date(date).toISOString().slice(0, 10));
    }
    return this.rangeDates = rangeDates;
  }

  createHistoryTable() {
  const tableSection = document.getElementById('history-habits');
  if(tableSection?.firstChild) tableSection.innerHTML = '';
    // Create table
  const table = document.createElement('table');

  // Create table headers
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

  thead.appendChild(headerRow);
  table.appendChild(thead);

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

  table.appendChild(tbody);

  // Append the table to the body or another container
tableSection?.appendChild(table);
}



  initModal(): void {
    this.openBtn.addEventListener('click', this.openModal.bind(this));
    this.closeBtn.addEventListener('click', this.closeModal.bind(this));
    this.renderHabits();
  }
}
