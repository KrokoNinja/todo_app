import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
	apiKey: "AIzaSyCsTMvCkzgK4iiz-ucz2RmSmcK4VPkLUyQ",
	authDomain: "todo-app-9a984.firebaseapp.com",
	projectId: "todo-app-9a984",
	storageBucket: "todo-app-9a984.appspot.com",
	messagingSenderId: "668109652464",
	appId: "1:668109652464:web:7838a9f542f4d006bddd35",
});

const db = getFirestore(firebaseApp);

export default db;
