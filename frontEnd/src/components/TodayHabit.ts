import { updateHabit } from '../api/habits-api';
import { HabitsList } from '../main';

export class TodayHabit {
  element: HTMLLIElement;
  id: number;
  title: string;
  done: boolean;
  constructor(id: number, title: string, done: boolean) {
    this.id = id;
    this.title = title;
    this.done = done;
    this.element = document.createElement('li');
    this.element.className = 'habit-item';
    this.element.tabIndex = 0;
  }

  initHabit() {
    this.render();
  }

  async udpateHabit() {
    await updateHabit(this.id, this.done)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      })
      .then(() => {
        this.render();
        HabitsList.getInstance().historyHabitsModal.renderHabits();
        
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async toggleDone() {
    this.done = !this.done;
    await this.udpateHabit();
  }

  toggleDoneHandler = () => {
    this.toggleDone();
  };

  render() {
    this.element.textContent = this.title;
    this.element.classList.toggle('done', this.done);
    const habitSpan = document.createElement('span');
    habitSpan.textContent = this.done ? '✅' : '❌';
    this.element.append(habitSpan);
    this.element.removeEventListener('click', this.toggleDoneHandler);
    this.element.addEventListener('click', this.toggleDoneHandler);
  }
}
