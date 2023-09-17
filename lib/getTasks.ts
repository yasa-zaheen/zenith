import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function getTasks(user: any) {
  const q = query(collection(db, "tasks"), where("userId", "==", user.uid)); // Query object

  const querySnapshot = await getDocs(q); // Getting data

  // Reducing array to a map object
  const mapObject = querySnapshot.docs.reduce((acc, doc) => {
    if (!acc.get(doc.data().status)) {
      acc.set(doc.data().status, []);
    } // Creating the keys

    acc.get(doc.data().status)!.push({
      title: doc.data().title,
      userId: doc.data().userId,
      description: doc.data().description,
      status: doc.data().status,
      id: doc.id,
    }); // Adding the values

    return acc;
  }, new Map<Status, Task[]>());

  // Adding values to keys with no items
  const statuses: Status[] = ["To Do", "In Progress", "On Hold", "Done"];

  statuses.forEach((status) => {
    if (!mapObject.get(status)) {
      mapObject.set(status, []);
    }
  });

  return mapObject;
}
