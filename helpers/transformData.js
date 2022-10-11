export const getPriceRange = (pricesArr) => {
    if (!pricesArr) {
      return "--";
    }
    if (pricesArr.length == 1) {
      return `${pricesArr[0].amount} ${pricesArr[0].currency_id}`;
    }

    let minPrice = null;
    let maxPrice = null;

    if (pricesArr[0].amount < pricesArr[1].amount) {
      minPrice = 0;
      maxPrice = 1;
    } else {
      minPrice = 1;
      maxPrice = 0;
    }

    if (pricesArr.length == 2) {
      return `De ${pricesArr[minPrice].amount} ${pricesArr[minPrice].currency_id} a ${pricesArr[maxPrice].amount}${pricesArr[maxPrice].currency_id}`;
    }

    for (let i = 2; i < pricesArr.length; i++) {
      if (pricesArr[i].amount < pricesArr[minPrice].amount) {
        minPrice = i;
      }

      if (pricesArr[i].amount > pricesArr[maxPrice].amount) {
        maxPrice = i;
      }
    }

    return `De ${pricesArr[minPrice].amount} ${pricesArr[minPrice].currency_id} a ${pricesArr[maxPrice].amount}${pricesArr[maxPrice].currency_id}`;

  };

  export const formatAddress = (addressObj) => {
    return (
      (addressObj?.city_name || "") + ", " + (addressObj?.state_name || "")
    );
  };