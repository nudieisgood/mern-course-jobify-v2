import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "./reducer";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDE_BAR,
  LOG_OUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  JOB_INPUT_CHANGE,
  CLEAR_INPUT_VALUE,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  HANDLE_CHANGE,
  CLEAR_SEARCH_VALUE,
  PAGE_CHANGE,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
} from "./actions";

const initialStates = {
  isLoading: false,
  showAlert: true,
  alertText: "",
  alertType: "",
  user: null,
  userLocation: "",
  showSidebar: false,

  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["pending", "interview", "declined"],
  status: "pending",

  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,

  stats: {},
  monthlyApplications: [],

  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],

  userLoading: true,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialStates);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 2000);
  };

  const setUpUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const res = await axios.post(`/api/v1/auth/${endPoint}`, currentUser);
      const { token, user, location } = res.data;

      if (endPoint === "login") alertText += `! ${user.name}.`;

      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { token, user, location, alertText },
      });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDE_BAR });
  };

  const logout = async () => {
    await authFetch.get("/auth/logout");
    dispatch({ type: LOG_OUT_USER });
  };

  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  // authFetch.interceptors.request.use(
  //   (config) => {
  //     config.headers["Authorization"] = `Bearer ${state.token}`;
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );
  // response interceptor
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  const updateUser = async (currentUser) => {
    try {
      dispatch({ type: UPDATE_USER_BEGIN });
      const { data } = await authFetch.patch("/auth/update-user", currentUser);

      const { user, token, location } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token, location },
      });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const jobInputChange = ({ name, value }) => {
    dispatch({ type: JOB_INPUT_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_INPUT_VALUE });
  };

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;

      await authFetch.post("/jobs", {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });

      dispatch({
        type: CREATE_JOB_SUCCESS,
      });

      // call function instead clearValues()
      dispatch({ type: CLEAR_INPUT_VALUE });
    } catch (error) {
      if (error.response.status === 401) return;

      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getAllJobs = async () => {
    const { page, sort, searchStatus, searchType, search } = state;
    //因為這些都有default value 直接設成default url
    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;

    if (search) url += `search=${search}`;

    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch.get(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: { jobs, totalJobs, numOfPages },
      });
    } catch (error) {
      logout();
    }
    clearAlert();
  };

  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };

  const editJob = async () => {
    //for add-job page when invoke edit job function
    dispatch({ type: EDIT_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;

      await authFetch.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({
        type: EDIT_JOB_SUCCESS,
      });
      dispatch({ type: CLEAR_INPUT_VALUE });
    } catch (error) {
      //當axios攔截器res的401 就會登出 並reject error到此 但由於不要再回到landing page
      //後有 error alert 故當401 error 我們不要dispatch  type: EDIT_JOB_ERROR,
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/jobs/${jobId}`);
      //delete 後還是位於alljobs page 故run getAllJobs re-render updated data
      //取 getAllJobs(); 有完整的isLoading progress 故會把type: DELETE_JOB_BEGIN
      //的isLoading 做取代
      getAllJobs();
    } catch (error) {
      //我們想要在delete 遇到問題都直接做登出
      logout();
    }
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });

    try {
      const { data } = await authFetch.get("/jobs/stats");

      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      logout();
    }
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_SEARCH_VALUE });
  };
  const handleChangeSearchValue = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const handlePageChange = (goToPage) => {
    dispatch({ type: PAGE_CHANGE, payload: { goToPage } });
  };

  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const data = await authFetch.get("/auth/get-currentUser");
      const { user, location } = data.data;

      dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: { user, location } });
    } catch (error) {
      if (error.response.status === 401) return;
      logout();
    }
  };

  useEffect(() => {
    console.log("fsd");
    getCurrentUser();
  }, []);

  const contextValue = {
    ...state,
    displayAlert,
    setUpUser,
    toggleSidebar,
    logout,
    updateUser,
    jobInputChange,
    clearValues,
    createJob,
    getAllJobs,
    setEditJob,
    deleteJob,
    editJob,
    showStats,
    clearFilters,
    handleChangeSearchValue,
    handlePageChange,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);
export { AppProvider, initialStates, useAppContext };

// const registerUser = async (currentUser) => {
//   dispatch({ type: REGISTER_USER_BEGIN });
//   try {
//     const res = await axios.post("/api/v1/auth/register", currentUser);
//     const { token, user, location } = res.data;
//     dispatch({
//       type: REGISTER_USER_SUCCESS,
//       payload: { token, user, location },
//     });
//     addUserToLocalStorage({ user, token, location });
//   } catch (error) {
//     dispatch({
//       type: REGISTER_USER_ERROR,
//       payload: { msg: error.response.data.msg },
//     });
//   }
//   clearAlert();
// };

// const loginUser = async (currentUser) => {
//   dispatch({ type: LOGIN_USER_BEGIN });
//   try {
//     const res = await axios.post("/api/v1/auth/login", currentUser);
//     const { token, user, location } = res.data;
//     dispatch({
//       type: LOGIN_USER_SUCCESS,
//       payload: { token, user, location },
//     });
//     addUserToLocalStorage({ user, token, location });
//   } catch (error) {
//     dispatch({
//       type: LOGIN_USER_ERROR,
//       payload: { msg: error.response.data.msg },
//     });
//   }
//   clearAlert();
// };
