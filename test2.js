let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let categroy = document.getElementById("categroy");
let create = document.getElementById("create");
let total = document.getElementById("total");
let mood = 'creat'

//التاكد من وجود رقم فى خانه السعر وحساب الضرائب والاعلانات و ظهورها في خانه الاجمالي
function getTotal() {
  if (price.value != "") {
    // let p = parseInt(price.value || 0)
    // let t = parseInt(taxes.value || 0)
    // let a = parseInt(ads.value || 0)
    // let d = parseInt(discount.value || 0)
    // let x =  p + t + a - d;
    let f = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = f;
    total.style.background = "#096628";
  } else {
    total.innerHTML = "";
    total.style.background = "#8a3939";
  }
}
//(create prodtc)عمليه انشاء عنصر

//1-علشان احفظ اي بيانات عندي واخدها من الانبت او من المستخدم احسن وسيله هيه
//arry
//2-(arry) داخل (objcut) ولو البيانات دي متعلقه ببعض يبقي احفظهم في

let createpro = [];
if (localStorage.product != null) {
  createpro = JSON.parse(localStorage.product);
} else {
  let createpro = [];
}
//create any number of procutes wiht one click
create.onclick = function () {
  let newpro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    categroy: categroy.value,
    count: count.value,
  };


  //create any number of procutes wiht one click
  if(mood === 'creat'){
    if (newpro.count > 1) {
      for (let x = 0; x < newpro.count; x++) {
        //put the object insid arry
        createpro.push(newpro);
        
      }
    } else {
      createpro.push(newpro);
    }
  }else{

  }
  



  //when reload the page the arry deleted?!
  //save the prodcut in localstorage

  localStorage.setItem("product", JSON.stringify(createpro));
  readData();
  clearinputs();
};
//عند اعاده تحميل الصفحه البيانات الي في التخزين بتتمسح
//(if)الفاضي نحط داله (arry)الحل في عنصر

//clear the inputs after click create
function clearinputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  categroy.value = "";
  count.value = "";
}

function readData() {
  let table = "";
  for (let i = 0; i < createpro.length; i++) {
    table += `
    <tr>
        <td>${i + 1}</td>
        <td>${createpro[i].title}</td> 
        <td>${createpro[i].price}</td>
        <td>${createpro[i].taxes}</td>
        <td>${createpro[i].ads}</td>
        <td>${createpro[i].discount}</td>
        <td>${createpro[i].categroy}</td>
        <td>${createpro[i].total}</td>
        <td>${createpro[i].count}</td>
        <td><button onclick = "update(${i})" id="updata">updata</button></td>
        <td><button onclick = "deleteProcute(${i})"  id="delete">delete</button></td>
    </tr>
    `;
  }
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = table;
  //create btn (delete all) if find data in (createpro)
  let delall = document.getElementById("deleteAll");
  if (createpro.length > 0) {
    delall.innerHTML = `<button onclick = "deleteAllPro()"  id="deleteAll">delete all</button>`;
  } else {
    delall.innerHTML = "";
  }
}
readData();
//delete  one procute
function deleteProcute(i) {
  createpro.splice(i, 1);
  localStorage.product = JSON.stringify(createpro);
  readData();
}
//delete all procutes
function deleteAllPro() {
  localStorage.clear();
  createpro.splice(0);
  readData();
}
//update the item
function update(i) {
  try{title.value = createpro[i].title;
    price.value = createpro[i].price;
    taxes.value = createpro[i].taxes;
    ads.value = createpro[i].ads;
    discount.value = createpro[i].discount;
    categroy.value = createpro[i].categroy;
    count.style.display = "none";
    // create.innerHTML = 'Update'
    // let updata = document.getElementById("updata");
    // create.setAttribute("id", "updata");
    create.innerHTML = 'Update';
    mood = 'update'
    getTotal();}catch(err){    console.log(err);
  }
  
}
