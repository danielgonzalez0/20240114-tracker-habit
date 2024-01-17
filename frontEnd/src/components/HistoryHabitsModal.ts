import { getAllHabits } from '../api/habits-api';
import { HistoryTable } from './Historytable';
import { Modal } from './Modal';

export interface Habit {
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
    closeBtn: HTMLButtonElement
  ) {
    super(dialog, openBtn, closeBtn);
    this.habits = [];
    this.allHabitsDates = [];
    this.rangeDates = [];
  }

  async renderHabits() {
    this.habits = await getAllHabits();
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
    return (this.allHabitsDates = sortedDates);
  }

  createRangeDates() {
    //create range of dates
    const rangeDates = [];
    const startDate = new Date(this.allHabitsDates[0]);
    const endDate = new Date();
    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      rangeDates.push(new Date(date).toISOString().slice(0, 10));
    }
    return (this.rangeDates = rangeDates);
  }

  createHistoryTable() {
    const historyTable = new HistoryTable(this.rangeDates, this.habits);
    historyTable.initTable();
  }

  initModal(): void {
    this.openBtn.addEventListener('click', this.openModal.bind(this));
    this.closeBtn.addEventListener('click', this.closeModal.bind(this));
    this.renderHabits();
  }
}
