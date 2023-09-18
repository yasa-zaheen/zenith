import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function getTasks(user: any) {
  // Query object
  const q = query(collection(db, "tasks"), where("userId", "==", user.uid));

  // Getting data
  const querySnapshot = await getDocs(q);

  // Empty map
  const emptyMap: Map<Status, Task[]> = new Map([
    ["To Do", []],
    ["In Progress", []],
    ["On Hold", []],
    ["Done", []],
  ]);

  // Reducing array to a map object
  const mapObject = querySnapshot.docs.reduce((acc, doc) => {
    acc.get(doc.data().status)!.push({
      title: doc.data().title,
      userId: doc.data().userId,
      description: doc.data().description,
      status: doc.data().status,
      id: doc.id,
    });

    return acc;
  }, emptyMap);

  return mapObject;
}
