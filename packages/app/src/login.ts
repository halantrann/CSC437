import { Auth, define } from "@calpoly/mustang";
import { LoginFormElement } from "./components/login-form";

define({
  "mu-auth": Auth.Provider,
  "login-form": LoginFormElement
});