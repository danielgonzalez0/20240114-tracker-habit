import { getTodayHabits } from './api/habits-api';
import { AddHabitModal } from './components/AddHabitModal';
import { HistoryHabitsModal } from './components/HistoryHabitsModal';
import { TodayHabit } from './components/TodayHabit';
import './style.css';

interface Habit {
  id: number;
  title: string;
  done: boolean;
}
export class HabitsList {
  static instance: HabitsList;

  static APP_CONTAINER = document.getElementById(
    'habits-list'
  ) as HTMLDivElement;
  static ADD_HABIT_BTN = document.getElementById(
    'add-habit-btn'
  ) as HTMLButtonElement;
  static ADD_HABIT_DIALOG = document.getElementById(
    'modal-create-habit'
  ) as HTMLDialogElement;
  static ADD_HABIT_CLOSE_BTN = document.getElementById(
    'close-create-habit'
  ) as HTMLButtonElement;
  static HISTORY_DIALOG = document.getElementById(
    'modal-history-habits'
  ) as HTMLDialogElement;
  static HISTORY_OPEN_BTN = document.getElementById(
    'open-history-habits'
  ) as HTMLButtonElement;
  static HISTORY_CLOSE_BTN = document.getElementById(
    'close-history-habits'
  ) as HTMLButtonElement;

  element: HTMLUListElement;
  todayHabits: Habit[];
  addHabitModal: AddHabitModal;
  historyHabitsModal: HistoryHabitsModal;
  constructor() {
    this.element = document.createElement('ul');
    this.element.className = 'list-container';
    this.todayHabits = [];
    this.addHabitModal = new AddHabitModal(
      HabitsList.ADD_HABIT_DIALOG,
      HabitsList.ADD_HABIT_BTN,
      HabitsList.ADD_HABIT_CLOSE_BTN
    );
    this.historyHabitsModal = new HistoryHabitsModal(
      HabitsList.HISTORY_DIALOG,
      HabitsList.HISTORY_OPEN_BTN,
      HabitsList.HISTORY_CLOSE_BTN
    );
  }

  static getInstance(): HabitsList {
    if (!HabitsList.instance) {
      HabitsList.instance = new HabitsList();
    }
    return HabitsList.instance;
  }

  init() {
    this.renderHabits();
    this.addHabitModal.initModal();
    this.historyHabitsModal.initModal();
  }

  async renderHabits() {
    await this.fetchHabits();
    this.createHabits();
  }

  async fetchHabits(): Promise<void> {
    const habits = await getTodayHabits();
    this.todayHabits = habits;
  }

  clearHabits() {
    this.element.innerHTML = '';
  }

  handleEmpltyList() {
      const emptyList = document.createElement('p');
      emptyList.className = 'list-container';
      emptyList.textContent = 'No habits for today';
      HabitsList.APP_CONTAINER?.append(emptyList);
  }

  createHabits() {
    this.clearHabits();
    if (this.todayHabits.length === 0) {
      this.handleEmpltyList();
      return;
    }

    this.todayHabits.map((habit) => {
      const habitItem = new TodayHabit(habit.id, habit.title, habit.done);
      habitItem.initHabit();
      this.element.append(habitItem.element);
    });
    HabitsList.APP_CONTAINER?.append(this.element);
  }
}

const habitsList = new HabitsList();
habitsList.init();
