'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function() {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
    filterSizes.classList.toggle('hidden');
});
// ====================================================================//
// переключение видимости корзины
document.querySelector('.cartIconWrap').addEventListener('click', e => {
    document.querySelector('.basket-contains').classList.toggle('hidden');
})

const basketFilled = {};

document.querySelector('.featuredItems').addEventListener('click', e => {
       const cartEl = e.target.closest('.featuredItem');
       const id = cartEl.dataset.id;
       const name = cartEl.dataset.name;
       const price = cartEl.dataset.price;
       const divEl = document.querySelector('.basket-elements');
       const totalEl = document.querySelector('.total-count');
       let summ = 0;
       let totalCount = 0;
        // объект заполняется значениями из выбранных элементов
       if (!basketFilled[id]) {
            basketFilled[id] = {
                id,
                name,
                price,
                count: 1
            };
       } else {
        basketFilled[id].count++;
       }       
       
       
    //    удалить старые списки перед обновлением
        while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }

        
        // из содержимого объекта создаются элементы списков.
       for (const i in basketFilled) {
            
            const ulEl = document.createElement('ul');
            ulEl.classList.add('goods-list');
         
            ulEl.insertAdjacentHTML('beforeEnd', 
                    `<li>${basketFilled[i].name}</li>`);
            ulEl.insertAdjacentHTML('beforeEnd', 
                    `<li>${basketFilled[i].count}</li>`);
            ulEl.insertAdjacentHTML('beforeEnd', 
                    `<li>$${basketFilled[i].price}</li>`);
            ulEl.insertAdjacentHTML('beforeEnd', 
                    `<li>$${basketFilled[i].count * basketFilled[i].price}</li>`
            );
            summ += basketFilled[i].count * basketFilled[i].price;
            totalCount += basketFilled[i].count;
            divEl.insertAdjacentElement('afterBegin', ulEl)
       }
       document.querySelector('.summ').textContent = `Общая стоимость: $${summ}`;
       if (totalCount) {
        totalEl.textContent = totalCount;
        totalEl.classList.remove('hidden');
       }    
    });





