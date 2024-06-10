import { db } from "@/lib/firebase";
import { UserSchema, userSchema } from "@/types";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";

const useGetUsers = () => {
  const [users, setUsers] = useState<UserSchema[]>([]);

  const getUsers = async () => {
    const userRef = collection(db, "users");
    const q = query(userRef);
    const querySnapShot = await getDocs(q);

    const usersList: UserSchema[] = [];

    querySnapShot.forEach((doc) => {
      const data = { id: doc.id, ...doc.data() };

      // Validate against userSchema
      try {
        const validatedData = userSchema.parse(data);
        usersList.push(validatedData);
      } catch (e) {
        console.error("Invalid user data:", e);
      }
    });

    setUsers(usersList);
  };

  const getUserById = (userId: string) => {
    return users.filter((user) => user.id === userId)[0];
  };

  useEffect(() => {
    getUsers();
  }, []);

  return { users, getUserById };
};

export default useGetUsers;
