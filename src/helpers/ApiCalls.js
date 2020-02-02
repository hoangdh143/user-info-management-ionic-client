import {API} from "aws-amplify";

export const ApiCalls = {
  getContacts: () => { return API.get("contacts", "/contacts");
  }
};
