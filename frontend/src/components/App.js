import { useState, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteConfirmPopup from "./DeleteConfirmPopup";
import Login from "./Login";
import Register from "./Register";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import { auth } from "../utils/auth";
import InfoTooltip from "./InfoTooltip";
import imageSuccess from "../images/success.svg";
import imageError from "../images/error.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedForDeletionCard, setSelectedForDeletionCard] = useState(null);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isTooltip, setIsTooltip] = useState({
    isOpen: false,
    isSuccess: false,
    resImage: null,
    resAlt: "",
    resText: "",
  });
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const handleRegister = (email, password) => {
    auth
      .signUp(email, password)
      .then((res) => {
        if (res) {
          setIsTooltip({
            isOpen: true,
            isSuccess: true,
            resImage: imageSuccess,
            resAlt: "Успешно",
            resText: "Вы успешно зарегистрировались!",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsTooltip({
          isOpen: true,
          isSuccess: false,
          resImage: imageError,
          resAlt: "Ошибка",
          resText: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      });
  };

  const handleLogin = (email, password) => {
    auth
      .signIn(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          history.push("/main");
          setUserData({
            email: email,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsTooltip({
          isOpen: true,
          isSuccess: false,
          resImage: imageError,
          resAlt: "Ошибка",
          resText: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      });
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
      if (jwt) {
        auth
          .getContent(jwt)
          .then((res) => {
            if (res) {
              setUserData({
                email: res.email,
              });
              setLoggedIn(true);
              history.push("/main");
            } else {
              localStorage.removeItem("jwt");
              history.push("/sign-in");
            }
          })
          .catch((err) => console.log(err));
      }
  }, [history]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getProfile(), api.getInitialCards()])
        .then(([currentUser, initialCards]) => {
          setCurrentUser(currentUser);
          setCards(initialCards);
        })
        .catch((err) => console.log(err));
    }
  },[loggedIn]);

  // useEffect(() => {
  //   const checkToken = () => {
  //     const jwt = localStorage.getItem("jwt");
  //     if (jwt) {
  //       auth
  //         .getContent(jwt)
  //         .then((res) => {
  //           if (res) {
  //             setUserData({
  //               email: res.email,
  //             });
  //             setLoggedIn(true);
  //             history.push("/main");
  //           } else {
  //             localStorage.removeItem("jwt");
  //             history.push("/sign-in");
  //           }
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   };
  //   checkToken();
  //   if (loggedIn) {
  //     Promise.all([api.getProfile(), api.getInitialCards()])
  //       .then(([currentUser, initialCards]) => {
  //         setCurrentUser(currentUser);
  //         setCards(initialCards);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [history, loggedIn]);

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setUserData({
      email: "",
      password: "",
    });
    setLoggedIn(false);
    history.push("/sign-in");
  };

  const handleCloseTooltip = () => {
    setIsTooltip({
      ...isTooltip,
      isOpen: false,
    });
    if (isTooltip.isSuccess) {
      history.push("/sign-in");
    }
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleDeleteCardClick = (card) => {
    setSelectedForDeletionCard(card);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImageOpen(false);
    setSelectedCard({});
    setSelectedForDeletionCard(null);
  };

  const handleCardClick = (selectedCard) => {
    setIsImageOpen(true);
    setSelectedCard(selectedCard);
  };

  const handleUpdateUser = (data) => {
    api
      .editProfile(data.name, data.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (data) => {
    api
      .editAvatar(data.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleAddPlaceSubmit = (data) => {
    api
      .addCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header logOut={handleSignOut} email={userData.email} />
        <Switch>
          <ProtectedRoute
            path="/main"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
            cards={cards}
          />
          <Route path="/sign-up">
            <Register handleRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImageOpen}
          onClose={closeAllPopups}
        />
        <DeleteConfirmPopup
          isOpen={selectedForDeletionCard !== null}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          card={selectedForDeletionCard}
        />
        <InfoTooltip
          isOpen={isTooltip.isOpen}
          onClose={handleCloseTooltip}
          isSuccess={isTooltip.isSuccess}
          resImage={isTooltip.resImage}
          resAlt={isTooltip.resAlt}
          resText={isTooltip.resText}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
