import { useEffect, useState } from "react";

function AdminUsers() {

  const [users, setUsers] = useState([]);

  const loadUsers = async () => {

    try {

      const res = await fetch(
        "http://localhost:5001/api/auth/users"
      );

      const data = await res.json();

      setUsers(data);

    } catch (err) {

      console.error("Error loading users:", err);

    }

  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (

    <div style={{ padding: "20px" }}>

      <h2>👥 Registered Users</h2>

      <table
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse"
        }}
      >

        <thead>

          <tr style={{ background: "#16a34a", color: "white" }}>
            <th style={cell}>Name</th>
            <th style={cell}>Email</th>
            <th style={cell}>Role</th>
          </tr>

        </thead>

        <tbody>

          {users.map((user, i) => (

            <tr key={i}>

              <td style={cell}>{user.name}</td>
              <td style={cell}>{user.email}</td>
              <td style={cell}>{user.role}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

const cell = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "center"
};

export default AdminUsers;