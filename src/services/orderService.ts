import { db } from "@/config/firebase";
import {
    addDoc,
    collection,
    doc,
    DocumentData,
    onSnapshot,
    orderBy,
    query,
    QuerySnapshot,
    serverTimestamp,
    Timestamp,
    Unsubscribe,
    updateDoc,
    where,
} from "firebase/firestore";

export type FirestoreOrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  base?: string;
  toppings?: string[];
  extras?: string[];
  specialInstructions?: string;
};

export type OrderStatus = "Pending" | "Preparing" | "On the way" | "Delivered";

export type FirestoreOrder = {
  id: string;
  userId: string;
  items: FirestoreOrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentReference?: string;
  createdAt: string;
};

type NewOrderInput = {
  items: FirestoreOrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentReference?: string;
};

const ordersCollection = collection(db, "orders");

export const createOrder = async (
  userId: string,
  order: NewOrderInput,
): Promise<string> => {
  try {
    const docRef = await addDoc(ordersCollection, {
      ...order,
      userId,
      createdAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

const mapDocToOrder = (
  document: QuerySnapshot<DocumentData>["docs"][number],
): FirestoreOrder => {
  const data = document.data();
  const createdAt = data.createdAt as Timestamp | undefined;

  return {
    id: document.id,
    userId: data.userId,
    items: data.items,
    subtotal: data.subtotal,
    deliveryFee: data.deliveryFee,
    total: data.total,
    status: data.status,
    paymentReference: data.paymentReference,
    createdAt: createdAt
      ? createdAt.toDate().toISOString()
      : new Date().toISOString(),
  };
};

// Subscribes to real-time updates for a user's orders (newest first).
//  Firestore will need a composite index for this query the first time
//  it runs - the error it throws in the console includes a direct link to auto-create it.

export const subscribeToUserOrders = (
  userId: string,
  onChange: (orders: FirestoreOrder[]) => void,
  onError?: (error: Error) => void,
): Unsubscribe => {
  const ordersQuery = query(
    ordersCollection,
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(
    ordersQuery,
    (snapshot) => {
      onChange(snapshot.docs.map(mapDocToOrder));
    },
    (error) => {
      console.error("Error listening to orders:", error);
      onError?.(error);
    },
  );
};

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus,
) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status });
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};
