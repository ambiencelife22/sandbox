import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function AddSupplierForm() {
  const [industryType, setIndustryType] = useState("");
  const [contactType, setContactType] = useState("");
  const [market, setMarket] = useState("");
  const [contactFiles, setContactFiles] = useState("");
  const [contactCreator, setContactCreator] = useState("");
  const [publicKey, setPublicKey] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!industryType) {
      alert("Please select an industry type");
      return;
    }

    const payload = {
      industry_type: industryType,
      contact_type: contactType,
      market: market,
      contact_files: contactFiles,
      contact_creator: contactFiles,
      public_key: contactFiles,
    };

    const response = await fetch(
      "https://ambiencelife-api-us.com/v1/api/travel/industry/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Data added successfully!", data);

      setIndustryType("");
      setContactType("");
      setMarket("");
      setContactFiles("");
      setPublicKey("");
    } else {
      console.error("Failed to add data");
    }
  };

  return (
    <div className={styles.custom_local_supplier_container}>
      <form
        onSubmit={handleSubmit}
        className={styles.custom_local_supplier_form}
      >
        <>
          <label>Industry Type</label>

          <select
            value={industryType}
            onChange={(e) => setIndustryType(e.target.value)}
            style={{
              padding: "10px",
              marginBottom: "15px",
              border: "2px solid pink",
            }}
          >
            <option value="">Select an industry type</option>
            <option value="Hotel">Hotel</option>
            <option value="Dining">Dining</option>
          </select>
        </>

        {industryType && (
          <>
            <label>Contact Type:</label>
            <input
              type="text"
              value={contactType}
              onChange={(e) => setContactType(e.target.value)}
              placeholder="Enter Website"
              style={{
                padding: "10px",
                marginBottom: "15px",
                border: "2px solid pink",
              }}
            />
          </>
        )}

        {contactType && (
          <>
            <label>Market:</label>
            <input
              type="text"
              value={market}
              onChange={(e) => setMarket(e.target.value)}
              placeholder="Enter Website"
              style={{
                padding: "10px",
                marginBottom: "15px",
                border: "2px solid pink",
              }}
            />
          </>
        )}

        {market && (
          <>
            <label>Contact Files</label>
            <input
              type="text"
              value={contactFiles}
              onChange={(e) => setContactFiles(e.target.value)}
              placeholder="Enter Website"
              style={{
                padding: "10px",
                marginBottom: "15px",
                border: "2px solid pink",
              }}
            />
          </>
        )}

        {contactFiles && (
          <>
            <label>Contact Creator</label>
            <input
              type="text"
              value={contactCreator}
              onChange={(e) => setContactCreator(e.target.value)}
              placeholder="Enter Website"
              style={{
                padding: "10px",
                marginBottom: "15px",
                border: "2px solid pink",
              }}
            />
          </>
        )}

        {contactCreator && (
          <>
            <label>Public Key</label>
            <input
              type="text"
              value={publicKey}
              onChange={(e) => setPublicKey(e.target.value)}
              placeholder="Enter Website"
              style={{
                padding: "10px",
                marginBottom: "15px",
                border: "2px solid pink",
              }}
            />
          </>
        )}

        {publicKey && (
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
