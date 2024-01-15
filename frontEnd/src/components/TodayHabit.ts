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

  toggleDone() {
    this.done = !this.done;
    this.render();
    console.log(this.done);
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
