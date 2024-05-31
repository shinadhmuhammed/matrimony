import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../Utils/Firebase";
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const db = getFirestore(app);
const auth = getAuth(app);

const fetchUsers = async (loggedInUserGender) => {
  const usersCollection = collection(db, "users");
  const oppositeGender = loggedInUserGender === 'male' ? 'female' : 'male';
  const q = query(usersCollection, where("gender", "==", oppositeGender));
  const usersSnapshot = await getDocs(q);
  const usersList = usersSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return usersList;
};

function Users() {
  const [users, setUsers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUserGender, setLoggedInUserGender] = useState('');


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        const q = query(collection(db, "users"), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const loggedInUser = querySnapshot.docs[0].data();
          setLoggedInUserGender(loggedInUser.gender);
          const usersList = await fetchUsers(loggedInUser.gender);
          setUsers(usersList);
        }
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!isAuthenticated) {
    return <div className="text-center mt-8 text-red-500">Please log in to view the users.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <ul className="space-y-4">
        {users.map(user => (
          <li key={user.id} className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
            <div>
              <p className="text-xl font-semibold">{user.userName}</p>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600 capitalize">{user.gender}</p>
              <p className="text-gray-600 capitalize">{user.religion}</p>
            </div>
            <Link to={`/chat/${user.id}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Chat
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
