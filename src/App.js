import "./App.css";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import LoadingPage from "./pages/LoadingPage/LoadingPage";
import EntrancePage from "./pages/EntrancePage/EntrancePage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import MainPage from "./pages/MainPage/MainPage";
import PostDetailsPage from "./pages/PostDetailsPage/PostDetailsPage";
import AdvertiserDetailsPage from "./pages/AdvertiserDetailsPage/AdvertiserDetailsPage";
import AuthorizationPage from "./pages/AuthorizationPage/AuthorizationPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import RecoverPasswordPage from "./pages/RecoverPasswordPage/RecoverPasswordPage";
import RecoveryPage from "./pages/RecoveryPage/RecoveryPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import SearchCategoriesPage from "./pages/SearchCategoriesPage/SearchCategoriesPage";
import SavedPostsPage from "./pages/SavedPostsPage/SavedPostsPage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage/UpdatePasswordPage";
import AccountAdverticerPage from "./pages/AccountAdverticerPage/AccountAdverticerPage";
import SearchEngineResultsPage from "./pages/SearchEngineResultsPage/SearchEngineResultsPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoadingPage />} />

        <Route path="/welcome" element={<WelcomePage />} />

        <Route path="/entrance" element={<EntrancePage />} />

        <Route path="/main" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="savedPosts" element={<SavedPostsPage />} />
          <Route path="search/categories" element={<SearchCategoriesPage />} />
          <Route
            path="search/categories/searchEngineResults"
            element={<SearchEngineResultsPage />}
          />
          <Route path="authorization" element={<AuthorizationPage />}>
            <Route path="registration" element={<RegistrationPage />} />
            <Route index element={<SignInPage />} />
          </Route>
        </Route>

        <Route path="/main/:postId" element={<PostDetailsPage />} />

        <Route path="/:advertiserId" element={<AdvertiserDetailsPage />} />

        <Route path="/recoverPasswordPage" element={<RecoverPasswordPage />} />
        <Route path="/recovery" element={<RecoveryPage />} />
        <Route path="/updatePassword" element={<UpdatePasswordPage />} />

        {/* <Route path="/advertiser" element={<AdvertiserPage />} /> */}
        <Route path="/accountAdverticer" element={<AccountAdverticerPage />} />
      </Routes>
    </div>
  );
}

export default App;
