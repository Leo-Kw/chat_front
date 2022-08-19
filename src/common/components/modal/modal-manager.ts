class ModalManager {
  private modals: HTMLElement[] = []

  add(modal: HTMLElement) {
    if (this.modals.indexOf(modal) === -1) {
      this.modals.push(modal)
    }
  }

  remove(modal: HTMLElement) {
    const index = this.modals.indexOf(modal)
    if (index !== -1) {
      this.modals.splice(index, 1)
    }
  }

  isTopModal(modal: HTMLElement) {
    return !!this.modals.length && this.modals[this.modals.length - 1] === modal
  }
}

export default ModalManager
