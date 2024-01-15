import { TodayHabit } from './components/TodayHabit';
import './style.css';

interface Habit {
  id: number;
  title: string;
  done: boolean;
}
export class HabitsList {
  static APP_CONTAINER = document.getElementById('habits-list');

  element: HTMLUListElement;
  todayHabits: Habit[];
  constructor() {
    this.element = document.createElement('ul');
    this.element.className = 'list-container';
    this.todayHabits = [];
  }

  init() {
    this.renderHabits();
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
