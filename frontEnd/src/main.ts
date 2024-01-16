import { AddHabitModal } from './components/Modal';
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

  element: HTMLUListElement;
  todayHabits: Habit[];
  addHabitModal: AddHabitModal;
  constructor() {
    this.element = document.createElement('ul');
    this.element.className = 'list-container';
    this.todayHabits = [];
    this.addHabitModal = new AddHabitModal(
      HabitsList.ADD_HABIT_DIALOG,
      HabitsList.ADD_HABIT_BTN,
      HabitsList.ADD_HABIT_CLOSE_BTN
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
  }

  async renderHabits() {
    await this.fetchHabits();
    this.createHabits();
    console.log(this.todayHabits);
  }

  async fetchHabits(): Promise<void> {
    const habits = await fetch('http://localhost:3000/habits/today')
      .then((response) => response.json())
      .then((data) => data);
    this.todayHabits = habits;
  }

  clearHabits() {
    this.element.innerHTML = '';
  }

  createHabits() {
    this.clearHabits();
    this.todayHabits.map((habit) => {
      const habitItem = new TodayHabit(habit.id, habit.title, habit.done);
      habitItem.initHabit();
      this.element.append(habitItem.element);
    });
    HabitsList.APP_CONTAINER?.append(this.element);
  }
}

const habitsList = new HabitsList();

const addHabitBtn = document.getElementById(
  'add-habit-btn'
) as HTMLButtonElement;
const addHabitdialog = document.getElementById(
  'modal-create-habit'
) as HTMLDialogElement;
const addHabitCloseBtn = document.getElementById(
  'close-create-habit'
) as HTMLButtonElement;
console.log({ addHabitBtn, addHabitdialog, addHabitCloseBtn });



habitsList.init();

