import {API} from "aws-amplify";

export const ApiCalls = {
  getContacts: () => { return API.get("contacts", "/contacts");
  },
  createContact: contact => {
    return API.get("contacts", "/token", {}).then( token => {
      return API.post("contacts", `/contacts?token=${token}`, {
        body: contact
      });
    });
  }
};