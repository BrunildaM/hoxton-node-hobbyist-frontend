import { useEffect, useState } from "react";
import "./App.css";

type User = {
  id: number;
  fullName: string;
  photoUrl: string;
  email: string;
  hobbies: Hobby[];
};

type Hobby = {
  id: number;
  name: string;
  imageUrl: string;
  active: Boolean;
  userId: number;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [hobbies, setHobbies] = useState<Hobby[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then((res) => res.json())
      .then((usersFromTheDb) => setUsers(usersFromTheDb));
  });

  useEffect(() => {
    fetch("http://localhost:4000/hobbies")
      .then((res) => res.json())
      .then((hobbiesFromTheDb) => setHobbies(hobbiesFromTheDb));
  });

  return (
    <div className="App">
      <h1>Welcome to our users page!</h1>
      <ul>
        {users.map((user) => (
          <div>
            <p>This is the user list</p>
            <ul>
              <li>Name: {user.fullName}</li>
              <li>Email: {user.email}</li>
              <img src={user.photoUrl} alt={user.fullName} width={50} />
            </ul>
            <div>
              {user.hobbies
                ? user.hobbies.map((hobby) => (
                    <div>
                      <li>{hobby.name}</li>
                      <img src={hobby.imageUrl} alt={hobby.name} width={50} />
                      <li>{hobby.active ? "Active" : "Passive"}</li>
                    </div>
                  ))
                : "This user does not have any hobby!"}
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
