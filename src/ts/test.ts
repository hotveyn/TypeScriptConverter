const cards = document.querySelector(".cards");

function CurrencyCardDiff(diffAmount:number) {
    // get arrow icon;
    const arrow = diffAmount < 0
        ? `<i class="fa fa-arrow-down" aria-hidden="true"></i>`
        : `<i class="fa fa-arrow-up" aria-hidden="true"></i>`;

    //generate class to display price increment / decrement;
    let className = 'diff-amount';
    diffAmount < 0 ? className += " red" : className += " green";

    // return element to display on page;
    return `<span class="${className}">
        ${arrow} (${diffAmount})
    </span>`
}