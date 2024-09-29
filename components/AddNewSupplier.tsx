import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function AddSupplierForm() {
  const [subcontinents, setSubcontinents] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [selectedSubcontinent, setSelectedSubcontinent] = useState("");
  const [filteredCities, setFilteredCities] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    fetch("https://ambiencelife-api-us.com/v1/api/travel/destinations/filter")
      .then((response) => response.json())
      .then((data) => {
        const fetchedData = data.data;
        const uniqueSubcontinents = Array.from(
          new Set(
            fetchedData.map((item: any) => item.subcontinent.subcontinent_name)
          )
        ).map((name) => {
          return fetchedData.find(
            (item: any) => item.subcontinent.subcontinent_name === name
          )?.subcontinent;
        });
        setSubcontinents(uniqueSubcontinents);
        setCities(fetchedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSubcontinentChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedKey = e.target.value;
    setSelectedSubcontinent(selectedKey);
    setSelectedCity("");
    const filtered = cities.filter(
      (city: any) => city.subcontinent.subcontinent_key === selectedKey
    );
    setFilteredCities(filtered);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const supplierData = {
      subcontinent: selectedSubcontinent,
      city: selectedCity,
      name: name,
      phone: phoneNumber,
      website: website,
    };
    console.log("Added Supplier:", supplierData);
  };

  return (
    <div className={styles.custom_local_supplier_container}>
      <form
        onSubmit={handleFormSubmit}
        className={styles.custom_local_supplier_form}
      >
        <label>Subcontinent</label>
        <select
          value={selectedSubcontinent}
          onChange={handleSubcontinentChange}
          style={{
            padding: "10px",
            marginBottom: "15px",
            border: "2px solid pink",
          }}
        >
          <option value="">Select Subcontinent</option>
          {subcontinents.map((subcontinent: any) => (
            <option
              key={subcontinent.subcontinent_key}
              value={subcontinent.subcontinent_key}
            >
              {subcontinent.subcontinent_name}
            </option>
          ))}
        </select>

        {selectedSubcontinent && (
          <>
            <label>Cities</label>
            {filteredCities.length > 0 ? (
              <select
                value={selectedCity}
                onChange={handleCityChange}
                style={{
                  padding: "10px",
                  marginBottom: "15px",
                  border: "2px solid pink",
                }}
              >
                <option value="">Select City</option>
                {filteredCities.map((city: any) => (
                  <option
                    key={city.destination_key}
                    value={city.destination_key}
                  >
                    {city.destinations_destination}
                  </option>
                ))}
              </select>
            ) : (
              <p>No cities found</p>
            )}
          </>
        )}

        {selectedCity && (
          <>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              style={{
                padding: "10px",
                marginBottom: "15px",
                border: "2px solid pink",
              }}
            />
          </>
        )}

        {name && (
          <>
            <label>Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => {
                const input = e.target.value;
                if (/^\d*$/.test(input)) {
                  setPhoneNumber(input);
                }
              }}
              placeholder="Enter Phone Number"
              style={{
                padding: "10px",
                marginBottom: "15px",
                border: "2px solid pink",
              }}
            />
          </>
        )}

        {phoneNumber && (
          <>
            <label>Website</label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Enter Website"
              style={{
                padding: "10px",
                marginBottom: "15px",
                border: "2px solid pink",
              }}
            />
          </>
        )}

        {website && (
          <>
            <button type="submit" className={styles.addNewButton}>
              Add Supplier
            </button>
          </>
        )}
      </form>
    </div>
  );
}
