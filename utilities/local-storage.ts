export interface UserLogin {
  UserID: number;
  Username: string;
  Email: string;
  DateOfBirth: Date;
  token: string;
}
const localStoreName = "g-troove-user";
export const saveUserDetailsInLocalStorage = (user: UserLogin) => {
  localStorage.setItem(localStoreName, JSON.stringify(user));
};

export const getUserDetailsInLocalStorage = () => {
  try {
    let user = localStorage.getItem(localStoreName);
    if (user) {
      return JSON.parse(user) as UserLogin;
    }
    return false;
  } catch (e) {
    return false;
  }
};

export const getToken = () => {
  let user = getUserDetailsInLocalStorage();
  if (typeof user === "boolean") {
    return "";
  } else return user.token;
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem(localStoreName);
};
