import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "@/lib/firebase";
import { UserSchema } from "@/types";

interface UserStore {
  currentUser: UserSchema | null;
  isLoading: boolean;
  fetchUserInfo: (uid: string) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid: string) => {
    if (!uid) return set({ currentUser: null, isLoading: false });

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ currentUser: docSnap.data() as UserSchema, isLoading: false });
      } else {
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      console.log(err);
      return set({ currentUser: null, isLoading: false });
    }
  },
}));
