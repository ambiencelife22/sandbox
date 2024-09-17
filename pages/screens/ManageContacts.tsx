import { useState, useEffect } from "react";
// import styles from "../styles/Home.module.css";
import styles from "../../styles/Home.module.css"
import AddSupplierForm from "../../components/AddNewSupplier";

const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState<"Global" | "Local">("Global");
  const [selectedSubTab, setSelectedSubTab] = useState<"Hotel" | "Restaurant">(
    "Hotel"
  );
  const [selectedBrandHotel, setSelectedBrandHotel] = useState<string>("");
  const [selectedBrandRestaurant, setSelectedBrandRestaurant] =
    useState<string>("");
  const [brands, setBrands] = useState<{
    Hotel: string[];
    Restaurant: string[];
  }>({ Hotel: [], Restaurant: [] });
  const [data, setData] = useState<any>({});
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isAddingSupplier, setIsAddingSupplier] = useState(false); // State for showing AddNewSupplier

  const handleAddNewSupplierClick = () => {
    setIsAddingSupplier(true); // Set to true when the button is clicked
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url =
          selectedTab === "Global"
            ? "https://ambiencelife-api-us.com/v1/api/view/all/globalbrands"
            : "https://ambiencelife-api-us.com/v1/api/view/all/industrysuppliers";

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("API Response:", result); // Log the response to inspect the structure

        if (selectedTab === "Global") {
          // Extract brands for Global Suppliers
          const suppliers = result.globalSuppliers.supplierType || {};
          const hotelBrands = Object.keys(suppliers["Hotel / Resort"] || {});
          const restaurantBrands = Object.keys(suppliers["Dining"] || {});
          setBrands({ Hotel: hotelBrands, Restaurant: restaurantBrands });
          setData(suppliers);
        } else {
          // Extract brands for Local Suppliers
          const suppliers = result.industrySuppliers?.supplierType || {};
          const hotelBrands = Object.keys(suppliers["Hotel / Resort"] || {});
          const restaurantBrands = Object.keys(suppliers["Dining"] || {});
          setBrands({ Hotel: hotelBrands, Restaurant: restaurantBrands });
          setData(suppliers);
        }

        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error); // Log the error for debugging
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTab]);

  // Filtering data based on selected sub-tab and brand
  useEffect(() => {
    const filterData = (
      supplierDetails: any,
      industryType: string,
      selectedBrand: string
    ) => {
      return (supplierDetails[industryType]?.[selectedBrand] || []) as any[];
    };

    if (selectedSubTab === "Hotel" && selectedBrandHotel) {
      const filtered = filterData(data, "Hotel / Resort", selectedBrandHotel);
      setFilteredData(filtered);
    } else if (selectedSubTab === "Restaurant" && selectedBrandRestaurant) {
      const filtered = filterData(data, "Dining", selectedBrandRestaurant);
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [selectedSubTab, selectedBrandHotel, selectedBrandRestaurant, data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <nav className={styles.nav}>
        <button
          className={selectedTab === "Global" ? styles.active : ""}
          onClick={() => {
            setSelectedTab("Global");

            setIsAddingSupplier(false);
          }}
        >
          Global Suppliers
        </button>
        <button
          className={selectedTab === "Local" ? styles.active : ""}
          onClick={() => setSelectedTab("Local")}
        >
          Local Suppliers
        </button>
      </nav>
      {isAddingSupplier ? (
        <AddSupplierForm />
      ) : (
        <>
          <div className="localSuppliers_tabs">
            <nav className={styles.subNav}>
              <button
                className={selectedSubTab === "Hotel" ? styles.active : ""}
                onClick={() => setSelectedSubTab("Hotel")}
              >
                Hotels
              </button>
              <button
                className={selectedSubTab === "Restaurant" ? styles.active : ""}
                onClick={() => setSelectedSubTab("Restaurant")}
              >
                Restaurants
              </button>
            </nav>

            {selectedTab === "Local" && (
              <div className={styles.subNav}>
                <button
                  className={styles.addNewButton}
                  onClick={handleAddNewSupplierClick} // Show AddNewSupplier on click
                >
                  + Add New Supplier
                </button>
              </div>
            )}
          </div>
          <div style={{ marginTop: "20px" }}>
            <select
              value={
                selectedSubTab === "Hotel"
                  ? selectedBrandHotel
                  : selectedBrandRestaurant
              }
              onChange={(e) =>
                selectedSubTab === "Hotel"
                  ? setSelectedBrandHotel(e.target.value)
                  : setSelectedBrandRestaurant(e.target.value)
              }
            >
              <option value="">
                {selectedSubTab === "Hotel"
                  ? "Select a hotel"
                  : "Select a restaurant"}
              </option>
              {(selectedSubTab === "Hotel"
                ? brands.Hotel
                : brands.Restaurant
              ).map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginTop: "20px" }}>
            {Array.isArray(filteredData) &&
              filteredData.length === 0 &&
              (selectedBrandHotel || selectedBrandRestaurant) && (
                <p>
                  No {selectedSubTab.toLowerCase()}s found for the selected
                  brand.
                </p>
              )}
            {Array.isArray(filteredData) &&
              filteredData.map((item, index) => (
                <div key={index}>
                  <h3 className="parent_brand_name">
                    {item.supplierName || item.officialCorporateName}
                  </h3>

                  <p>
                    Website:
                    <a
                      className="parent_brand_a"
                      href={item.supplierWebsite || item.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.supplierWebsite || item.website}
                    </a>
                  </p>
                  <p>
                    Address: {item.supplierAddress || item.corporateAddr},{" "}
                    {item.supplierCity || item.corporateCity}
                  </p>
                  <p>Phone: {item.supplierPhone || item.corporatePhone}</p>
                  <p>
                    Email: {item.supplierMainEmail || item.corporateMainEmail}
                  </p>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
