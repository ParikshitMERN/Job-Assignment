import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [form, setForm] = useState({
    propertyName: "",
    address: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    fetchFavourites();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setUser(res.data.user);
    } catch {
      navigate("/login");
    }
  };

  const fetchFavourites = async () => {
    try {
      const res = await API.get("/favourites/my-favourites");
      setFavourites(res.data.favourites);
    } catch {
      setFavourites([]);
    }
  };

  const handleAdd = async () => {
    try {
      await API.post("/favourites/add", form);
      fetchFavourites();
      setForm({
        propertyName: "",
        address: "",
        price: "",
        bedrooms: "",
        bathrooms: "",
        description: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add");
    }
  };

  const handleRemove = async (id) => {
    try {
      await API.delete(`/favourites/remove/${id}`);
      fetchFavourites();
    } catch {
      alert("Failed to remove");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2>Buyer Dashboard</h2>
          {user && <p style={styles.sub}>Welcome, {user.name} · Role: Buyer</p>}
        </div>
        <button style={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div style={styles.card}>
        <h3>Add Property to Favourites</h3>
        <div style={styles.grid}>
          <input
            style={styles.input}
            placeholder="Property Name"
            value={form.propertyName}
            onChange={(e) => setForm({ ...form, propertyName: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="Bedrooms"
            value={form.bedrooms}
            onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="Bathrooms"
            value={form.bathrooms}
            onChange={(e) => setForm({ ...form, bathrooms: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <button style={styles.button} onClick={handleAdd}>
          Add to Favourites
        </button>
      </div>

      <div style={styles.card}>
        <h3>My Favourites ({favourites.length})</h3>
        {favourites.length === 0 ? (
          <p>No favourites yet.</p>
        ) : (
          favourites.map((fav) => (
            <div key={fav.id} style={styles.favCard}>
              <div>
                <strong>{fav.propertyName}</strong>
                <p style={styles.sub}>{fav.address}</p>
                <p style={styles.sub}>
                  NPR {fav.price} · {fav.bedrooms} bed · {fav.bathrooms} bath
                </p>
                <p style={styles.sub}>{fav.description}</p>
              </div>
              <button
                style={styles.remove}
                onClick={() => handleRemove(fav.id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: "800px", margin: "0 auto", padding: "2rem" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  card: {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    marginBottom: "1.5rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.75rem",
    marginBottom: "1rem",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  button: {
    padding: "10px 20px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  logout: {
    padding: "8px 16px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  remove: {
    padding: "6px 12px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  favCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    border: "1px solid #eee",
    borderRadius: "6px",
    marginBottom: "0.75rem",
  },
  sub: { color: "#666", fontSize: "13px", margin: "2px 0" },
};
