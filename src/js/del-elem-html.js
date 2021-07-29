function delElemHTML(elem) {
  document.addEventListener('click', (event) => {
    const targetEl = event.target;

    console.log(arguments);

    if (targetEl.classList.contains('card-reviewer__btn-hidden') || targetEl.classList.contains('wrap_card-reviewer')) {
      elem.remove();
    }
  });
}

export default delElemHTML;
