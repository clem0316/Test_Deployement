export default function DisplayUsers({
  id,
  email,
  gender,
  name,
  picture,
  age,
  deleteItem,
}) {
  return (
    <li className="theCards flex-col px-5">
      <span className="theName">
        {name.first} {name.last}
      </span>
      <span>Gender : {gender}</span>
      <span>
        <img className="h-32" src={picture} alt="photo de profil" />
      </span>
      <span>{age} years old</span>
      <span>{email}</span>
      <span>
        <button
          onClick={() => deleteItem(id)}
          className="deleteButton flex justify-center px-5"
        >
          Supprimer
        </button>
      </span>
    </li>
  );
}
