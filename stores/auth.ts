import { defineStore, acceptHMRUpdate } from "pinia";
import type { Role, Roles } from "@/types/auth.d";
import _castArray from "lodash/castArray";
import { useMessage } from "naive-ui";

// HERE YOU CAN IMPLEMENT YOUR LOGIN

export const useAuthStore = defineStore("auth", {
  state: () => ({
    logged: false,
    role: "BD-Manager" as Role | null,
    user: {},
    url: import.meta.env.VITE_BASE_URL,
    tokenValue : ""
  }),
  actions: {
    async setLogged(payload?: any) {
      console.log("yeah baby i'm getting triggered", payload);
      const toast = useMessage();
      // this.logged = true
      // this.role = "BD-Manager"
      // this.user = payload
      // console.log(this.user)
      try {
        const response: any = await $fetch(
          `${this.url}/users/bd-manager/login/`,
          {
            method: "POST",

            headers: { "Content-Type": "application/json" },

            body: payload,
          }
        );
        if (response.token) {
          console.log("response====>", response.token);
          this.$state.tokenValue = response.token;
          console.log(
            "this.$state.tokenValue================>",
            this.$state.tokenValue
          );
          const token = useCookie("token", { maxAge: 15552000 }); // useCookie new hook in nuxt 3
          console.log("fuck token===>", response.value);
          response.groups.some((element: any) => {
            console.log("element===>", element.name === "BD-Manager");
            if (["BD-Manager"].includes(element.name)) {
              console.log("asshole");

              this.logged = true;
            }
          });
          token.value = {
            token: response.token,
            groups: response.groups,
            user: response.user.username,
          };
          // this.logged = true; // set authenticated  state value to true
        }
        console.log("this.loggeddfgh===>", this.$state.logged);

        // token.value = { token: data.token, name: data.name, email: data.email }; // set token to cookie
        return response;
      } catch (error: any) {
        const toast = useMessage();
      }
    },
    setLogout() {
      this.logged = false;
      this.role = null;
      this.user = {};
      const token = useCookie("token");
      token.value = null;
    },
  },
  getters: {
    isLogged(state) {
      return state.logged;
    },
    token(state) {
      return state.tokenValue;
    },
    userRole(state) {
      return state.role;
    },
    isRoleGranted(state) {
      return (roles?: Roles) => {
        if (!roles) {
          return true;
        }
        if (!state.role) {
          return false;
        }

        const arrRoles: Role[] = _castArray(roles);

        if (arrRoles.includes("all")) {
          return true;
        }

        return arrRoles.includes(state.role);
      };
    },
  },
  persist: {
    paths: ["logged", "role"],
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
