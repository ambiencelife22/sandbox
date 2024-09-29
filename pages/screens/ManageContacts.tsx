import { useState, useEffect } from "react";
// import styles from "../styles/Home.module.css";
import styles from "../../styles/Home.module.css";
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
  const [isAddingSupplier, setIsAddingSupplier] = useState(false);

  const handleAddNewSupplierClick = () => {
    setIsAddingSupplier(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url =
          selectedTab === "Global"
            ? "https://ambiencelife-api-us.com/v1/api/travel/global/brands"
            : "https://ambiencelife-api-us.com/v1/api/travel/industry/suppliers";

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("API Response:", result); // Log the response to inspect the structure

        if (selectedTab === "Global") {
          // Extract unique parent brands for Global Suppliers
          const suppliers = result.data || [];
          const hotelBrands = Array.from(
            new Set(
              suppliers
                .filter(
                  (supplier) => supplier.industry_type === "Hotel / Resort"
                )
                .map((supplier) => supplier.parent_brand)
            )
          );
          const restaurantBrands = Array.from(
            new Set(
              suppliers
                .filter((supplier) => supplier.industry_type === "Dining")
                .map((supplier) => supplier.parent_brand)
            )
          );

          setBrands({ Hotel: hotelBrands, Restaurant: restaurantBrands });
          setData(suppliers);
        } 
        
        else {
          const suppliers = result.data || [];
          const hotelBrands = Array.from(
            new Set(
              suppliers
                .filter(
                  (supplier) => supplier.industry_type === "Hotel / Resort"
                )
                .map((supplier) => supplier.parent_brand)
            )
          );
          const restaurantBrands = Array.from(
            new Set(
              suppliers
                .filter((supplier) => supplier.industry_type === "Dining")
                .map((supplier) => supplier.parent_brand)
            )
          );

          setBrands({ Hotel: hotelBrands, Restaurant: restaurantBrands });
          setData(suppliers);
        }

        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTab]);

  useEffect(() => {
    const filterDataByBrand = (suppliers, selectedBrand, industryType) => {
      return suppliers.filter(
        (supplier) =>
          supplier.parent_brand === selectedBrand &&
          supplier.industry_type === industryType
      );
    };

    if (selectedSubTab === "Hotel" && selectedBrandHotel) {
      const filtered = filterDataByBrand(
        data,
        selectedBrandHotel,
        "Hotel / Resort"
      );
      setFilteredData(filtered);
    } else if (selectedSubTab === "Restaurant" && selectedBrandRestaurant) {
      const filtered = filterDataByBrand(
        data,
        selectedBrandRestaurant,
        "Dining"
      );
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
                    {item.official_corporate_name || item.supplier_name}
                  </h3>

                  <p>
                    Website:
                    <a
                      className="parent_brand_a"
                      href={item.supplierWebsite || item.supplier_website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.supplierWebsite || item.website}
                    </a>
                  </p>
                  <p>
                    Address: {item.corporate_address || item.supplier_address},{" "}
                    {""}
                    {item.corporate_city || item.supplier_city}
                  </p>
                  <p>Phone: {item.corporate_phone || item.supplier_phone}</p>
                  <p>
                    Email:{" "}
                    {item.corporate_sales_email || item.supplier_main_email}
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
