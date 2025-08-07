import { defineStore } from "pinia";

interface Message {
  user: string;
  message: string;
  id: string | number;
  socketID: string;
}
export interface Users {
  user: string;
  socketID: string;
}
interface UserState {
  name: string | null;
  messages: Message[];
  users: Users[];
  statusType: string;
}
interface UserActions {
  setName: (newName: string) => void;
  logout: () => void;
  addMessage: (message: Message) => void;
  addUsers: (users: Users[]) => void;
  setStatusType: (statusType: string) => void;
}

// defineStore<
//   "user",         // id стора
//   UserState,      // state
//   {},             // getters (если не используешь — просто {})
//   UserActions     // actions
// >

export const useUserStore = defineStore<"user", UserState, {}, UserActions>(
  "user",
  {
    state: () => {
      return {
        //TODO Pinia сам превращает это в ref
        name: "asad",
        messages: [],
        users: [],
        statusType: "",
      };
    },
    actions: {
      setName(newName: string) {
        this.name = newName;
        localStorage.setItem("user", newName);
      },
      logout() {
        this.name = "";
        localStorage.removeItem("user");
      },
      addMessage(message: Message) {
        this.messages.push(message);
      },
      addUsers(users: Users[]) {
        this.users = users;
      },
      setStatusType(statusType: string) {
        this.statusType = statusType;
      },
    },
  }
);
