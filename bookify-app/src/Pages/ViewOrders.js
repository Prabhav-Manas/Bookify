import React, { useEffect, useState } from "react";
import { useFirebase } from "../Context/Firebase";
import BookCard from "../Components/Card";

const OrdersPage = () => {
  const firebase = useFirebase();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (firebase.isLoggedIn) {
      firebase
        .fetchMyBooks(firebase.user.uid)
        .then((books) => setBooks(books.docs));
    }
  }, [firebase]);

  console.log(books);

  if (!firebase.isLoggedIn) {
    return (
      <h1 className="text-success text-center">
        Please Log in to your account
      </h1>
    );
  }

  return (
    <div className="text-dark">
      {books.map((books) => (
        <BookCard
          link={`book/orders/${books.id}`}
          key={books.id}
          id={books.id}
          {...books.data()}
        />
      ))}
    </div>
  );
};

export default OrdersPage;
