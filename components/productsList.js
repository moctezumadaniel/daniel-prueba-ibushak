import { useEffect, useState } from "react";
import {
  MercadoLibrePhonesSearch,
  MercadoLibreUserSearch,
} from "../constants/baseApis";
import { formatAddress, getPriceRange } from "../helpers/transformData";
import styles from "../styles/Home.module.css";
export const ProductsList = () => {
  const [results, setResults] = useState([]);
  const [paging, setPaging] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const users = {};

  const searchNicknames = async (itemsArr) => {
    for (let i = 0; i < itemsArr.length; i++) {
      if (users[itemsArr[i].seller.id]) {
        itemsArr[i].nickname = parsedJson.nickname;
      } else {
        try {
          const res = await fetch(
            `${MercadoLibreUserSearch}/${itemsArr[i].seller.id}`
          );
          const parsedJson = await res.json();
          itemsArr[i].nickname = parsedJson.nickname;
        } catch (err) {
          console.error(err);
          itemsArr = [];
        }
      }
    }

    return itemsArr;
  };
  const readNextItems = async () => {
    setIsFetching(true);
    const offset = paging.offset + paging.limit;
    try {
      const res = await fetch(
        `${MercadoLibrePhonesSearch}&sort=price_asc&offset=${offset}&limit=50`
      );
      const parsedJson = await res.json();
      const fetchedResults = parsedJson.results;
      const newResults = [...results];
      const fetchedResultsWithNames = await searchNicknames(fetchedResults);
      newResults.push(...fetchedResultsWithNames);
      setResults(newResults);
      setPaging(parsedJson.paging);
      setIsFetching(false);
    } catch (err) {
      console.error(err);
      setIsFetching(false);
    }
  };

  const readInitialItems = async () => {
    setIsFetching(true);
    try {
      const res = await fetch(
        `${MercadoLibrePhonesSearch}&sort=price_asc&offset=0&limit=50`
      );
      const parsedJson = await res.json();
      const resultsWithName = await searchNicknames(parsedJson.results);
      setResults(resultsWithName);
      setPaging(parsedJson.paging);
      setIsFetching(false);
    } catch (err) {
      console.err(err);
      window.location.reload();
    }
  };

  useEffect(() => {
    readInitialItems();
  }, []);
  return (
    <div className={styles.container}>
      {results.length > 0 && (
        <table>
          <thead className="data-titles">
            <tr>
              <th className="data-content">
                <b>Seller id</b>
              </th>
              <th className="data-content">
                <b>Seller Name</b>
              </th>
              <th className="data-content">
                <b>Envío Gratis</b>
              </th>
              <th className="data-content">
                <b>Tipo de Logística</b>
              </th>
              <th className="data-content">
                <b>Lugar de operación del Seller</b>
              </th>
              <th className="data-content">
                <b>Condición del artículo</b>
              </th>

              <th className="data-content">
                <b>Rango de Precios</b>
              </th>
            </tr>
          </thead>
          <tbody>
            {results && results.length > 0
              ? results.map((item, i) => {
                  return (
                    <tr style={{ padding: "5px" }} key={i}>
                      <td className="data-content">
                        {item.seller?.id || "--"}
                      </td>
                      <td className="data-content">{item.nickname}</td>
                      <td className="data-content">
                        {item.shipping?.free_shipping ? "True" : "False"}
                      </td>
                      <td className="data-content">
                        {item.shipping?.logistic_type || "--"}
                      </td>
                      <td className="data-content">
                        {formatAddress(item?.address) || "--"}
                      </td>
                      <td className="data-content">
                        {item?.condition || "--"}
                      </td>

                      <td className="data-content">
                        {item?.prices?.prices
                          ? getPriceRange(item?.prices.prices)
                          : item?.prices?.price}
                      </td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </table>
      )}
      {paging.offset < 950 && !isFetching && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button onClick={readNextItems}>Ver más</button>
        </div>
      )}

      {isFetching && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
          }}
        >
          Cargando...
        </div>
      )}
    </div>
  );
};
