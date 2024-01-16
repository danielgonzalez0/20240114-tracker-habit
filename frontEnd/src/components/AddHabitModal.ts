import { createHabit } from "../api/habits-api";
import { HabitsList } from "../main";
import { Modal } from "./Modal";


export class AddHabitModal extends Modal {
  form: HTMLFormElement;
  span: HTMLSpanElement;
  constructor(
    dialog: HTMLDialogElement,
    openBtn: HTMLButtonElement,
    closeBtn: HTMLButtonElement
  ) {
    super(dialog, openBtn, closeBtn);
    this.form = document.getElementById('form-create-habit') as HTMLFormElement;
    this.span = document.createElement('span');
    this.span.className = 'error-message hidden';
    this.form.append(this.span);
  }
  initModal() {
    this.form.removeEventListener('submit', this.handleSubmit.bind(this));
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    this.openBtn.addEventListener('click', this.openModal.bind(this));
    this.closeBtn.addEventListener('click', this.closeModal.bind(this));
    const input = document.getElementById('title') as HTMLInputElement;
    input.addEventListener('focus', this.removeErrorMessage.bind(this));
  }

  closeModal() {
    this.dialog.close();
    this.removeErrorMessage();
    this.form.reset();
  }

  async handleSubmit(event: Event) {
    event.preventDefault();
    const formData = new FormData(this.form);
    const title = formData.get('title') as string;
    await this.addHabit(title);
  }

  handleErrorMessage(message: string) {
    this.span.textContent = message;
    this.span.classList.remove('hidden');
  }

  removeErrorMessage() {
    this.span.classList.add('hidden');
    this.span.textContent = '';
  }

  async addHabit(title: string) {
    if (!title) {
      this.handleErrorMessage('Title cannot be empty');
      return;
    }

    try {
      const response = await createHabit(title);

      if (!response.ok) {
        const text = await response.text();
        try {
          const data = JSON.parse(text);
          this.handleErrorMessage(data.error);
        } catch {
          this.handleErrorMessage(text);
        }
        return;
      }
      HabitsList.APP_CONTAINER.innerHTML = '';
      HabitsList.getInstance().renderHabits();
      HabitsList.getInstance().historyHabitsModal.renderHabits();
      this.closeModal();
    } catch (error) {
      this.handleErrorMessage((error as Error).message);
    }
  }
}
