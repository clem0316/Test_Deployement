import { useState, useEffect } from "react";
import loadIcon from "../assets/loadIcon.svg";
import DisplayUsers from "./DisplayUsers";

export default function Cards() {
  const [myAPI, setMyAPI] = useState({
    loading: false,
    error: false,
    data: undefined,
  });

  // -------- Fetch API -------- //
  useEffect(() => {
    setMyAPI({ ...myAPI, loading: true });
    // Ici, ...myAPI nous permet de dire que les propriétés de myAPI ne changent pas, sauf celles citées (loading:true). On aurait pu écrire setMyAPI({error:false, error:fale, loading:true}) mais pour gagner du temps, on n'a écrit que les propriétés qui changent d'état. ...MyAPI représente donc toutes les autres propriétés inchangées.
    fetch("https://randomuser.me/api/?results=1000")
      .then((res) => {
        if (!res.ok) throw new Error("The request is not correct");
        return res.json();
        // checking error from API
      })
      .then((data) => {
        setMyAPI({ loading: false, error: false, data: data });
      })
      .catch((e) => {
        console.log(e);
        setMyAPI({ loading: false, error: true, data: undefined });
        // checking general error
      });
  }, []);
  // Because of the 2nd arguments, this useEffect will be executed only once.

  //

  // ------- State for my results array ------ //
  let [theUsers, setTheUsers] = useState([]);
  console.log(theUsers);

  let content;

  if (myAPI.loading) {
    content = (
      <img src={loadIcon} alt="Page en chargement, veuillez patienter..." />
      // Display icon during loading
    );
  } else if (myAPI.error) {
    content = <p className="text-red-600">Une erreur est survenue !</p>;
    // Display message in case of error
  } else if (myAPI.data?.length === 0) {
    content = (
      <p className="text-red-600">No data corresponds to your request !</p>
      // Display message in case of no result for this request
    );
  }

  //

  // ------ Call 1O Users (button) ------ //

  function tenUsers() {
    for (let i = 0; i < 10; i++) {
      setTheUsers((theUsers) => [
        ...theUsers,
        myAPI.data.results[
          Math.floor(Math.random() * myAPI.data.results.length)
        ],
      ]);
    }
  }

  //

  // ------ Call 10 Men Users (button) ------ //

  function tenMaleUsers() {
    let maleUsers = myAPI.data.results.filter((user) => user.gender === "male");
    for (let i = 0; i < 10; i++) {
      // theUsers.push(maleUsers[i]);
      setTheUsers((theUsers) => [
        ...theUsers,
        maleUsers[[Math.floor(Math.random() * maleUsers.length)]],
      ]);
    }
    // After sorting myAPI results by gender, I add to my array a random user from the "male users array"
    console.log(theUsers);
  }

  //

  // ------ Call 10 Women Users (button) ------ //

  function tenFemaleUsers() {
    let femaleUsers = myAPI.data.results.filter(
      (user) => user.gender === "female"
    );
    for (let i = 0; i < 10; i++) {
      // theUsers.push(femaleUsers[i]);
      setTheUsers((theUsers) => [
        ...theUsers,
        femaleUsers[[Math.floor(Math.random() * femaleUsers.length)]],
      ]);
    }
  }

  //

  // ------ Clearing Cards (array & Display) ------ //

  function clear() {
    theUsers = setTheUsers(() => []);
    console.log(theUsers);
  }

  // useState for ordering by age
  const [ageOrder, setOrderAge] = useState(true);

  // useState for sorting by gender
  const [gender, setGender] = useState("");

  function deleteItem(id) {
    setTheUsers(theUsers.filter((user) => user.id !== id));
  }

  return (
    <div className="cardsContent">
      {content}

      <div className="pannel">
        {/* Call buttons (10users-10men-10women) */}
        <div className="callButtons flex justify-evenly pt-3">
          <button onClick={tenUsers} className="bg-green-600 px-3">
            +10 users
          </button>
          <button onClick={tenMaleUsers} className="bg-orange-600 px-3">
            +10 men
          </button>
          <button onClick={tenFemaleUsers} className="bg-amber-600 px-3">
            +10 women
          </button>
          <button onClick={clear} className="bg-teal-200 px-3">
            Clear
          </button>
        </div>

        {/* Order buttons */}
        <div className="orderButtons my-4 text-sm flex justify-evenly border-sky-800">
          <button
            onClick={() => setOrderAge(true)}
            className="text-slate-50 bg-sky-800 px-3"
          >
            Sort from younger
          </button>
          <button
            onClick={() => setOrderAge(false)}
            className="text-slate-50 bg-sky-800 px-3"
          >
            Sort from older
          </button>
        </div>

        {/* Sort buttons */}
        <div className="sortDisplay flex justify-evenly my-5">
          <button
            onClick={() => setGender("male")}
            className="px-3 border-stone-500"
          >
            Display : men
          </button>
          <button
            onClick={() => setGender("female")}
            className="px-3 border-stone-500"
          >
            Display : women
          </button>
          <button
            onClick={() => setGender("")}
            className="px-3 border-stone-500"
          >
            Display : everybody
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <p className="text-sky-800 font-semibold">Your search results :</p>
      </div>

      {/* Order buttons */}
      <ul className="my-6">
        {theUsers
          .sort((a, b) => {
            if (ageOrder) {
              return a.dob.date < b.dob.date ? 1 : -1;
            } else {
              return a.dob.date > b.dob.date ? 1 : -1;
            }
            // Order from younger to older & contrary
          })
          .filter((user) => {
            return gender === "" ? user : user.gender === gender;
          })
          .map((item, index) => (
            <DisplayUsers
              key={index}
              email={item.email}
              gender={item.gender}
              name={item.name}
              picture={item.picture.large}
              age={item.dob.age}
              id={item.id}
              deleteItem={deleteItem}
            />
            // Props for DisplayUsers component which will create each card
          ))}
      </ul>
    </div>
  );
}
