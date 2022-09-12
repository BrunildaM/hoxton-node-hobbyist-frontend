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
      <ul className="datas">
        {users.map((user) => (
          <div className="wrapper">
            <ul className="user-data">
              <li className="user-data-li">Name: {user.fullName}</li>
              <li className="user-data-li">Email: {user.email}</li>
              <img className="profile-pic" src={user.photoUrl} alt={user.fullName} />
            </ul>
            <div className="hobbies">
              {user.hobbies
                ? user.hobbies.map((hobby) => (
                    <div className="hobbies-wrapper">
                      <li className="hobbies-wrapper-li">{hobby.name}</li>
                      <img className="icon" src={hobby.imageUrl} alt={hobby.name}  />
                      <li className="hobbies-wrapper-li">{hobby.active ? "Active" : "Passive"}</li>
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
