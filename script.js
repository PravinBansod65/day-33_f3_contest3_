document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const sortMarketCapButton = document.getElementById("sortMarketCap");
  const sortPercentageChangeButton = document.getElementById(
    "sortPercentageChange"
  );
  const cryptoTableBody = document.getElementById("cryptoTableBody");
  let cryptoData = [];

  // Fetching  data from API
  function fetchData() {
    const apiUrl =
      // "https://mocki.io/v1/e0463527-125a-4ece-8460-cd2b28141541";
      // "https://mocki.io/v1/b0be3ffd-0631-4815-b5be-55a05ee1e04b";
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
    // https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false

    return fetch(apiUrl).then((response) => response.json());
  }

  // Render crypto table

  function renderCryptoTable(data) {
    cryptoTableBody.innerHTML = "";
    data.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td><img src="${item.image}">${item.name}</td>
          <td>${item.symbol}</td>
          <td>$${item.current_price}</td>
          <td>$${item.total_volume}</td>
          
          <td class="${item.price_change_percentage_24h < 0 ? "dec" : "inc"}">${
        item.price_change_percentage_24h}%</td>
          <td>Mkt Cap:$${item.market_cap}</td>
        `;
      cryptoTableBody.appendChild(row);
    });
  }

  // Event listener for search button
  searchButton.addEventListener("click", function () {
    const searchValue = searchInput.value.toLowerCase();
    const filteredData = cryptoData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchValue) ||
        item.symbol.toLowerCase().includes(searchValue)
    );
    renderCryptoTable(filteredData);
  });

  // Event listener for sort by market cap button
  sortMarketCapButton.addEventListener("click", function () {
    const sortedData = [...cryptoData].sort(
      (a, b) => b.market_cap - a.market_cap
    );
    renderCryptoTable(sortedData);
  });

  // Event listener for sort by percentage change button
  sortPercentageChangeButton.addEventListener("click", function () {
    const sortedData = [...cryptoData].sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    );
    renderCryptoTable(sortedData);
  });

  // Fetchig data and render table
  fetchData()
    .then((data) => {
      cryptoData = data;
      renderCryptoTable(cryptoData);
    })
    .catch((error) => console.error("Error fetching data:", error));
});
console.log("23b");

// const input=document.querySelector("input");
// let timeout;
// searchInput.addEventListener('input',(e)=>{
//    debouncing(searchInput.value.toLowerCase());
// });

// function debouncing(tar)
// {
//     clearTimeout(timeout);
//    timeout = setTimeout(()=>{
//        let dataToShow= cryptoData.filter(ele=>{
//         let eleName=ele.name.toLowerCase();
//         let symbol=ele.symbol.toLowerCase();
//         if(eleName.indexOf(tar)!=-1 || symbol.indexOf(tar)!=-1)return true;
//         return false;
//        });

//        renderCryptoTable(dataToShow);
//     },500);
// }
