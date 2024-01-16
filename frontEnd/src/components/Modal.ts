export class Modal {
  dialog: HTMLDialogElement;
  openBtn: HTMLButtonElement;
  closeBtn: HTMLButtonElement;
  constructor(
    dialog: HTMLDialogElement,
    openBtn: HTMLButtonElement,
    closeBtn: HTMLButtonElement
  ) {
    this.dialog = dialog;
    this.openBtn = openBtn;
    this.closeBtn = closeBtn;
  }

  openModal() {
    this.dialog.showModal();
  }

  closeModal() {
    this.dialog.close();
  }

  initModal() {
    this.openBtn.addEventListener('click', this.openModal.bind(this));
    this.closeBtn.addEventListener('click', this.closeModal.bind(this));
  }
}

