import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "../axios";
import Loading from "./Loading";
function ClientsAdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const email = localStorage.getItem("aktualny");
    axios
      .post("/users", { email: email })
      .then(({ data }) => {
        setLoading(false);
        setUsers(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  const handleAdmin = async (e, id) => {
    e.preventDefault();

    try {
      console.log("wchodze");
      console.log(id);
      axios
        .put("/users/setadmin", { id: id })
        .then((response) => {
          const updatedUser = response.data.user;
          const updatedUsers = users.map((user) => {
            if (user._id === updatedUser._id) {
              return updatedUser;
            }
            return user;
          });
          setUsers(updatedUsers);
          console.log(updatedUsers);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loading />;
  if (users?.length == 0)
    return <h2 className="py-2 text-center">Brak klientów</h2>;

  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>ID Klienta</th>
          <th>Nazwa klienta</th>
          <th>Email</th>
          <th>Czy jest adminem?</th>
          <th>Admin</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{String(user.isAdmin)}</td>
            <td>
              <Button
                variant="secondary"
                onClick={(e) => handleAdmin(e, user._id)}
              >
                Zmień
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return <div>ClientsAdminPage</div>;
}

export default ClientsAdminPage;
