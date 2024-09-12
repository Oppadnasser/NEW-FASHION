import { users } from "../../users.mjs";

export const findUserIndex = (request, response) => {
  if (!request.user) return response.status(401).send("not registered");
  const Parsed = parseInt(request.user.id);
  if (isNaN(Parsed)) return response.send("this is invalid value of id");
  const userIndex = users.findIndex((user) => user.id === Parsed);
  if (userIndex === -1) return response.status(404).send("user not found");
  return userIndex;
};
