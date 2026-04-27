let title = document.getElementById(`title`);
let price = document.getElementById(`price`);
let ads = document.getElementById(`ads`);
let taxes = document.getElementById(`taxes`);
let discount = document.getElementById(`discount`);
let total = document.getElementById(`total`);
let count = document.getElementById(`count`);
let category = document.getElementById(`category`);
let submit = document.getElementById(`submit`);
let mood = `create`;
let tmp;
function getTotal() {
  if (price.value != ``) {
    let result = +price.value + +ads.value + +taxes.value - +discount.value;
    total.innerHTML = `total: ${result}`;
    total.style.backgroundColor = `green`;
  } else {
    total.style.backgroundColor = `#ff7675`;
  }
}

// create
let dataPro = localStorage.products
  ? JSON.parse(localStorage.getItem(`products`))
  : [];
submit.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (
    title.value != `` &&
    price.value != `` &&
    category.value != `` &&
    newPro.count < 100
  ) {
    if (mood === `create`) {
      if (newPro.count > 1) {
        for (let i = 0; i < count.value; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      mood = `create`;
      submit.textContent = `Create`;
      count.style.display = `block`;
      total.style.backgroundColor = `red`;
    }
    localStorage.setItem(`products`, JSON.stringify(dataPro));
    clearData();
    showData();
  } else {
    alert(`title price and category are necessary else count must be < 100`);
  }
};
// read
function showData() {
  let table = ``;
  if (dataPro.length > 0) {
    for (let i = 0; i < dataPro.length; i++) {
      table += `<tr>
              <td>${i + 1}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button class = "update" onclick = "updateData(${i})"><span class="material-symbols-outlined">edit</span></button></td>
              <td><button class="delete"onclick = "deleteData(${i})"><span class="material-symbols-outlined">delete</span></button></td>
            </tr>
    `;
    }
  }
  document.getElementById(`tbody`).innerHTML = table;
  let btndelAll = document.getElementById(`deleteAll`);
  if (dataPro.length > 0) {
    btndelAll.style.display = `block`;
    btndelAll.textContent = `Delete All (${dataPro.length}) `;
  } else {
    btndelAll.style.display = `none`;
  }
}
showData();

// clearData
function clearData() {
  title.value = ``;
  price.value = ``;
  taxes.value = ``;
  ads.value = ``;
  discount.value = ``;
  total.innerHTML = `total :`;
  total.style.backgroundColor = "#ff7675";
  count.value = ``;
  category.value = ``;
}
function updateData(i) {
  title.value = dataPro[i].title.toLowerCase();
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.value = dataPro[i].count;
  category.value = dataPro[i].category.toLowerCase();
  mood = `update`;
  tmp = i;
  submit.textContent = `Update`;
  count.style.display = `none`;
  scroll({
    top: 0,
    behavior: `smooth`,
  });
}
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.setItem(`products`, JSON.stringify(dataPro));
  showData();
}

function deleteAll() {
  dataPro.splice(0);
  localStorage.removeItem(`products`);
  showData();
}
// count
// search
let search = document.getElementById(`search`);
let moodSearch = `title`;
function getSearchMood(id) {
  if (id === `searchTitle`) {
    moodSearch = `title`;
  } else {
    moodSearch = `category`;
  }
  search.focus();
  search.placeholder = `Search by ${moodSearch}`;
  search.value = ``;
  showData();
}

function searchData(value) {
  let table = ``;
  for (let i = 0; i < dataPro.length; i++) {
    if (moodSearch === `title`) {
      if (dataPro[i].title.includes(value)) {
        table += createRow(i);
      }
    } else {
      if (dataPro[i].category.includes(value)) {
        table += createRow(i);
      }
    }
  }
  document.getElementById(`tbody`).innerHTML = table;
}
function createRow(i) {
  return `<tr>
              <td>${i + 1}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button onclick = "updateData(${i})">Update</button></td>
              <td><button onclick = "deleteData(${i})">Delete</button></td>
            </tr>
    `;
}
